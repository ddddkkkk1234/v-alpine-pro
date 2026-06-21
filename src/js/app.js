import { state, elements, t, requirePremium, closePremiumModal, openPremiumModal, initElements } from './state.js';
import * as ui from './ui-controls.js';
import * as video from './video-player.js';
import * as sessions from './session-manager.js';
import * as ai from './ai-engine.js';

// Google Cloud Console에서 생성한 실제 클라이언트 ID를 기재해 주세요.
const GOOGLE_CLIENT_ID = '109287389240-abcdefgh123456.apps.googleusercontent.com';

/**
 * app.js (Main Entry Point)
 * 모든 모듈을 조립하고 앱의 라이프사이클을 관리합니다.
 */

// --- Initialization ---

function init() {
    // 1. DOM 엘리먼트 참조 초기화
    initElements();
    
    // 2. 외부 라이브러리 및 엔진 초기화
    initFabric();
    ai.initPose(onPoseResults);
    
    // UI Events
    elements.languageButton.addEventListener('click', toggleLanguageMenu);
    elements.languageMenu.querySelectorAll('[data-language]').forEach(btn => {
        btn.addEventListener('click', () => {
            ui.applyLanguage(btn.dataset.language);
            refreshUI();
            elements.languageMenu.hidden = true;
        });
    });
    
    elements.navPremium.addEventListener('click', () => openPremiumModal('Premium'));
    elements.navLogin.addEventListener('click', () => {
        if (state.isPremium) {
            if (confirm(t('logoutConfirm'))) {
                state.isPremium = false;
                localStorage.removeItem('isPremium');
                ui.updateNavAccountState();
                alert(t('loggedOutMsg'));
                resetPremiumSummary();
            }
        } else {
            openPremiumModal('로그인');
        }
    });
    
    if (elements.premiumLoginForm) {
        elements.premiumLoginForm.addEventListener('submit', e => e.preventDefault());
    }
    
    if (elements.premiumLogin) {
        elements.premiumLogin.addEventListener('click', handleGoogleLogin);
    }
    
    elements.premiumClose.addEventListener('click', closePremiumModal);
    
    // Video Events
    elements.video.addEventListener('loadedmetadata', () => {
        ui.resizeCanvas();
        video.updateVideoControls();
    });
    elements.video.addEventListener('loadeddata', () => {
        ui.refreshCurrentFrameForMode();
        video.updateVideoControls();
    });
    elements.video.addEventListener('timeupdate', video.updateVideoControls);
    elements.video.addEventListener('seeked', () => {
        ui.refreshCurrentFrameForMode();
        video.updateVideoControls();
    });
    elements.video.addEventListener('play', () => {
        video.updateVideoControls();
        processFrame();
    });
    elements.video.addEventListener('pause', video.updateVideoControls);
    elements.video.addEventListener('ended', video.updateVideoControls);
    
    elements.videoUpload.addEventListener('change', handleVideoUpload);
    document.querySelectorAll('.upload-trigger').forEach(btn => {
        btn.addEventListener('click', () => elements.videoUpload.click());
    });
    elements.playPauseButton.addEventListener('click', video.togglePlayback);
    document.getElementById('btn_seek_back_big').addEventListener('click', () => video.seekVideoBy(-1));
    document.getElementById('btn_seek_back_small').addEventListener('click', () => video.seekVideoBy(-0.1));
    document.getElementById('btn_seek_forward_small').addEventListener('click', () => video.seekVideoBy(0.1));
    document.getElementById('btn_seek_forward_big').addEventListener('click', () => video.seekVideoBy(1));
    elements.playbackSpeed.addEventListener('change', video.updatePlaybackSpeed);
    
    if (elements.videoSeekBar) {
        elements.videoSeekBar.addEventListener('input', e => {
            if (!Number.isFinite(elements.video.duration)) return;
            elements.video.currentTime = (e.target.value / 100) * elements.video.duration;
            video.updateVideoControls();
        });
    }

    elements.originalViewButton.addEventListener('click', () => ui.setViewMode('original'));
    elements.aiViewButton.addEventListener('click', () => ui.setViewMode('ai'));

    // Session Events
    document.getElementById('btn_set_session_start').addEventListener('click', () => setSessionBoundary('start'));
    document.getElementById('btn_set_session_end').addEventListener('click', () => setSessionBoundary('end'));
    document.getElementById('btn_save_session').addEventListener('click', saveTurnSession);
    document.getElementById('btn_update_session_memo').addEventListener('click', updateSelectedSessionMemo);
    document.getElementById('btn_clear_session').addEventListener('click', clearSelectedSession);
    document.getElementById('btn_risk_timeline').addEventListener('click', () => {
        if (!requirePremium('스키 턴 흔들림 타임라인')) return;
        renderRiskTimeline();
    });
    
    // Annotation Events
    document.getElementById('btn_draw').addEventListener('click', toggleDrawingMode);
    document.getElementById('btn_clear').addEventListener('click', () => state.fabricCanvas.clear());
    document.getElementById('btn_pen_color').addEventListener('click', togglePenColor);
    document.getElementById('btn_pen_width').addEventListener('click', togglePenWidth);
    document.getElementById('btn_text_note').addEventListener('click', addTextNote);
    document.querySelectorAll('.btn-cyber[id^="btn_shape_"]').forEach(btn => {
        const type = btn.id.replace('btn_shape_', '');
        btn.addEventListener('click', () => addShapeAnnotation(type));
    });
    document.getElementById('btn_protractor').addEventListener('click', () => addShapeAnnotation('protractor'));
    document.getElementById('btn_save_frame_capture').addEventListener('click', saveCurrentFrameCapture);

    // Export Events
    document.getElementById('btn_report_png').addEventListener('click', savePngReport);
    document.getElementById('btn_export_csv').addEventListener('click', sessions.exportCsv);
    document.getElementById('btn_export_video').addEventListener('click', () => video.exportVideo(ui.setViewMode));
    document.getElementById('btn_compare_sessions').addEventListener('click', sessions.renderSessionCompare);
    document.getElementById('btn_generate_ai_draft').addEventListener('click', generateAiCoachingDraft);
    document.getElementById('btn_copy_ai_draft').addEventListener('click', copyAiCoachingDraft);

    // Navigation
    document.querySelectorAll('[data-tab-target]').forEach(btn => {
        btn.addEventListener('click', () => ui.setDashboardTab(btn.dataset.tabTarget));
    });
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const sectionId = link.getAttribute('href').slice(1);
            if (state.validSections.has(sectionId)) {
                e.preventDefault();
                ui.showPage(sectionId);
            }
        });
    });

    window.addEventListener('popstate', () => ui.showPage(location.hash.slice(1), false));
    window.addEventListener('resize', ui.resizeCanvas);
    
    // Final UI Sync
    ui.applyLanguage(state.currentLanguage);
    resetPremiumSummary();
    ui.updateNavAccountState();
    ui.showPage(location.hash.slice(1), false);
}

// --- Google Sign-In Integration ---
function handleGoogleLogin() {
    try {
        if (typeof google === 'undefined' || !google.accounts) {
            alert('구글 로그인 라이브러리를 로드하는 중입니다. 잠시 후 다시 시도해 주세요.');
            return;
        }
        
        const client = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'email profile openid',
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
                        .then(res => {
                            if (!res.ok) throw new Error('UserInfo response not ok');
                            return res.json();
                        })
                        .then(userInfo => {
                            state.isPremium = true;
                            localStorage.setItem('isPremium', 'true');
                            localStorage.setItem('userEmail', userInfo.email || '');
                            localStorage.setItem('userName', userInfo.name || '');
                            localStorage.setItem('userPicture', userInfo.picture || '');
                            
                            ui.updateNavAccountState();
                            closePremiumModal();
                            const successMsg = state.currentLanguage === 'ko' ? `Google 계정(${userInfo.email})으로 성공적으로 로그인되었습니다.` : (state.currentLanguage === 'ja' ? `Googleアカウント(${userInfo.email})でログインしました。` : `Successfully logged in with Google (${userInfo.email}).`);
                            alert(successMsg);
                            resetPremiumSummary();
                        })
                        .catch(err => {
                            console.error('Error fetching user info:', err);
                            state.isPremium = true;
                            localStorage.setItem('isPremium', 'true');
                            ui.updateNavAccountState();
                            closePremiumModal();
                            alert('Google 로그인에 성공했으나 사용자 정보를 불러오지 못했습니다.');
                            resetPremiumSummary();
                        });
                }
            },
            error_callback: (err) => {
                console.error('Google Sign-in Error:', err);
                alert('구글 로그인 도중 오류가 발생했습니다. 클라이언트 ID 설정을 확인해 주세요.');
            }
        });
        client.requestAccessToken();
    } catch (error) {
        console.error('Failed to trigger Google Sign-In:', error);
        alert('구글 로그인 초기화에 실패했습니다. 올바른 클라이언트 ID인지 확인해 주세요.');
    }
}

// --- AI & Logic ---

function onPoseResults(results) {
    elements.canvasCtx.save();
    elements.canvasCtx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    elements.canvasCtx.drawImage(results.image, 0, 0, elements.canvas.width, elements.canvas.height);

    if (results.poseLandmarks) {
        window.drawConnectors(elements.canvasCtx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#59f0b7', lineWidth: 3 });
        window.drawLandmarks(elements.canvasCtx, results.poseLandmarks, { color: '#35d6ff', lineWidth: 1, radius: 3 });

        const lm = results.poseLandmarks;
        const quality = ai.getTrackingQuality(lm);
        ui.updateTrackingQuality(quality);

        if (!quality.usable || !isInsideSelectedSession(Number(elements.video.currentTime.toFixed(3)))) {
            if (!quality.usable) ui.resetAngleBuffers();
            elements.canvasCtx.restore();
            return;
        }

        const smoothed = ai.smoothAngles({
            leftKnee: ai.calculateAngle(lm[23], lm[25], lm[27]),
            rightKnee: ai.calculateAngle(lm[24], lm[26], lm[28]),
            leftShoulder: ai.calculateAngle(lm[23], lm[11], lm[13]),
            rightShoulder: ai.calculateAngle(lm[24], lm[12], lm[14])
        });

        document.getElementById('leftKneeAngle').textContent = `${smoothed.leftKnee}도`;
        document.getElementById('rightKneeAngle').textContent = `${smoothed.rightKnee}도`;
        document.getElementById('leftShoulderAngle').textContent = `${smoothed.leftShoulder}도`;
        document.getElementById('rightShoulderAngle').textContent = `${smoothed.rightShoulder}도`;

        const risk = ai.setRisk(smoothed.leftKnee, smoothed.rightKnee);
        ui.updateRiskUI(risk);
        updatePremiumSummary(smoothed.leftKnee, smoothed.rightKnee);
        saveAnalysisRow(smoothed, risk, quality);
        renderRiskTimeline();
    } else {
        ui.resetAngleBuffers();
        ui.markTrackingLost();
    }
    elements.canvasCtx.restore();
}

async function processFrame() {
    if (!elements.video.paused && !elements.video.ended) {
        if (!enforceSelectedSessionPlayback()) return;
        if (state.viewMode === 'ai') {
            await state.pose.send({ image: elements.video });
        } else {
            ui.drawCurrentVideoFrame();
        }
        if (enforceSelectedSessionPlayback()) {
            requestAnimationFrame(processFrame);
        }
    }
}

// --- Internal Helper Utils ---

function isInsideSelectedSession(time) {
    const session = sessions.getSelectedSession();
    return !session || (time >= session.start && time <= session.end);
}

function enforceSelectedSessionPlayback() {
    const session = sessions.getSelectedSession();
    if (!session) return true;
    if (elements.video.currentTime < session.start) elements.video.currentTime = session.start;
    if (elements.video.currentTime > session.end) {
        elements.video.pause();
        elements.video.currentTime = session.end;
        return false;
    }
    return true;
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 이전 URL 메모리 해제
    if (elements.video.src) {
        URL.revokeObjectURL(elements.video.src);
    }
    
    resetPremiumSummary();
    ui.setViewMode('original');
    
    elements.emptyState.style.display = 'none';
    elements.videoControls.hidden = false;
    
    const url = URL.createObjectURL(file);
    elements.video.src = url;
    elements.playbackSpeed.value = '1';
    video.updatePlaybackSpeed();
    
    elements.video.load();
    
    // 영상이 로드되면 캔버스 크기를 맞추고 첫 프레임을 그립니다.
    elements.video.onloadeddata = () => {
        ui.resizeCanvas();
        ui.drawCurrentVideoFrame();
        video.updateVideoControls();
    };
}

function refreshUI() {
    sessions.renderTurnSessions(selectTurnSession);
    renderFrameCaptures();
    renderRiskTimeline();
}

// --- Annotation & Fabric.js ---

function initFabric() {
    state.fabricCanvas = new window.fabric.Canvas('drawing_canvas', { isDrawingMode: false });
    state.fabricCanvas.freeDrawingBrush = new window.fabric.PencilBrush(state.fabricCanvas);
    state.fabricCanvas.freeDrawingBrush.color = '#35d6ff';
    state.fabricCanvas.freeDrawingBrush.width = 4;
    ui.resizeCanvas();
}

function toggleDrawingMode() {
    pauseForFrameAnnotation();
    state.fabricCanvas.isDrawingMode = !state.fabricCanvas.isDrawingMode;
    document.getElementById('btn_draw').textContent = state.fabricCanvas.isDrawingMode ? '주석 중지' : '주석 그리기';
}

function togglePenColor() {
    state.premiumPenColor = state.premiumPenColor === '#fbbf24' ? '#fb7185' : '#fbbf24';
    setPremiumPenStyle();
}

function togglePenWidth() {
    state.premiumPenWidth = state.premiumPenWidth === 8 ? 14 : 8;
    setPremiumPenStyle();
}

function setPremiumPenStyle() {
    if (!requirePremium('스키 턴 고급 주석 도구')) return;
    pauseForFrameAnnotation();
    state.fabricCanvas.freeDrawingBrush.color = state.premiumPenColor;
    state.fabricCanvas.freeDrawingBrush.width = state.premiumPenWidth;
    state.fabricCanvas.isDrawingMode = true;
    document.getElementById('btn_draw').textContent = '주석 중지';
}

function pauseForFrameAnnotation() {
    if (!elements.video.paused) {
        elements.video.pause();
        video.updateVideoControls();
    }
    ui.refreshCurrentFrameForMode();
}

function addTextNote() {
    if (!requirePremium('스키 턴 텍스트 메모')) return;
    pauseForFrameAnnotation();
    const noteText = prompt('스키 영상 위에 표시할 코칭 메모를 입력하세요.');
    if (!noteText) return;
    const text = new window.fabric.Textbox(noteText, {
        left: 32, top: 32, width: 260, fill: '#fbbf24', fontSize: 24, fontWeight: 700,
        fontFamily: 'Noto Sans KR, Arial, sans-serif', backgroundColor: 'rgba(7, 17, 31, 0.72)', padding: 8
    });
    state.fabricCanvas.add(text);
    state.fabricCanvas.setActiveObject(text);
    state.fabricCanvas.renderAll();
}

function addShapeAnnotation(type) {
    if (!requirePremium('스키 턴 고급 도형 주석')) return;
    pauseForFrameAnnotation();
    state.fabricCanvas.isDrawingMode = false;
    const color = state.premiumPenColor;
    const width = state.premiumPenWidth;
    const left = state.fabricCanvas.getWidth() * 0.28;
    const top = state.fabricCanvas.getHeight() * 0.34;
    let shape;

    if (type === 'line') shape = new window.fabric.Line([left, top, left + 220, top + 70], { stroke: color, strokeWidth: width, strokeLineCap: 'round' });
    if (type === 'arrow') {
        const l = new window.fabric.Line([0, 0, 220, 70], { stroke: color, strokeWidth: width, strokeLineCap: 'round' });
        const h = new window.fabric.Triangle({ left: 220, top: 70, width: 28, height: 34, fill: color, angle: 108, originX: 'center', originY: 'center' });
        shape = new window.fabric.Group([l, h], { left, top });
    }
    if (type === 'circle') shape = new window.fabric.Circle({ left, top, radius: 70, fill: 'rgba(0, 0, 0, 0)', stroke: color, strokeWidth: width });
    if (type === 'angle') {
        const f = new window.fabric.Line([0, 120, 110, 0], { stroke: color, strokeWidth: width, strokeLineCap: 'round' });
        const s = new window.fabric.Line([110, 0, 220, 120], { stroke: color, strokeWidth: width, strokeLineCap: 'round' });
        const lb = new window.fabric.Textbox('각도', { left: 78, top: 34, width: 90, fill: color, fontSize: 22, fontWeight: 800, fontFamily: 'Noto Sans KR, Arial, sans-serif' });
        shape = new window.fabric.Group([f, s, lb], { left, top });
    }
    if (type === 'protractor') {
        alert('각도기 기능 준비 중입니다.');
    }

    if (shape) {
        state.fabricCanvas.add(shape);
        state.fabricCanvas.setActiveObject(shape);
        state.fabricCanvas.renderAll();
    }
}

// --- Session Logic ---

function setSessionBoundary(type) {
    if (!Number.isFinite(elements.video.duration)) return alert('먼저 스키 영상을 선택해주세요.');
    const curr = Number(elements.video.currentTime.toFixed(3));
    if (type === 'start') {
        state.pendingSessionStart = curr;
        if (state.pendingSessionEnd <= state.pendingSessionStart) state.pendingSessionEnd = null;
    } else {
        state.pendingSessionEnd = curr;
        if (state.pendingSessionStart >= state.pendingSessionEnd) {
            alert('끝 시간은 시작 시간보다 뒤에 있어야 합니다.');
            state.pendingSessionEnd = null;
        }
    }
    sessions.updateSessionDraftLabels();
}

function saveTurnSession() {
    if (state.pendingSessionStart === null || state.pendingSessionEnd === null) return alert('세션 시작과 끝을 먼저 지정해주세요.');
    if (!state.isPremium && state.turnSessions.length >= state.freeSessionLimit) return openPremiumModal('턴 세션 무제한 저장');

    const tag = elements.turnSessionTag.value;
    const memo = elements.turnSessionMemo.value.trim();
    if (memo && !requirePremium('세션별 코칭 메모 저장')) return;

    const session = {
        id: `session-${Date.now()}`,
        name: elements.turnSessionName.value.trim() || `${tag} ${state.turnSessions.length + 1}`,
        tag, start: state.pendingSessionStart, end: state.pendingSessionEnd,
        rows: sessions.getSessionRowCount({start: state.pendingSessionStart, end: state.pendingSessionEnd}),
        memo, aiDraft: ''
    };

    state.turnSessions.push(session);
    state.selectedSessionId = session.id;
    state.pendingSessionStart = null;
    state.pendingSessionEnd = null;
    elements.turnSessionName.value = '';
    elements.turnSessionMemo.value = '';
    sessions.updateSessionDraftLabels();
    sessions.renderTurnSessions(selectTurnSession);
    renderRiskTimeline();
    ui.resetCompareIdle();
}

function selectTurnSession(sessionId) {
    const session = state.turnSessions.find(s => s.id === sessionId);
    if (!session) return;
    state.selectedSessionId = session.id;
    elements.video.currentTime = session.start;
    elements.video.pause();
    elements.turnSessionMemo.value = session.memo || '';
    elements.aiCoachingDraft.value = session.aiDraft || '';
    video.updateVideoControls();
    sessions.renderTurnSessions(selectTurnSession);
    renderRiskTimeline();
}

function clearSelectedSession() {
    state.selectedSessionId = null;
    elements.turnSessionMemo.value = '';
    elements.aiCoachingDraft.value = '';
    sessions.renderTurnSessions(selectTurnSession);
    renderRiskTimeline();
}

function updateSelectedSessionMemo() {
    if (!requirePremium('세션별 코칭 메모 저장')) return;
    const session = sessions.getSelectedSession();
    if (!session) return alert('메모를 수정할 턴 세션을 먼저 선택해주세요.');
    session.memo = elements.turnSessionMemo.value.trim();
    sessions.renderTurnSessions(selectTurnSession);
}

// --- Analysis UI ---

function resetPremiumSummary() {
    state.analysisStats = { minKnee: null, maxKneeGap: 0, frames: 0 };
    state.analysisRows = [];
    state.turnSessions = [];
    state.frameCaptures = [];
    state.selectedSessionId = null;
    state.pendingSessionStart = null;
    state.pendingSessionEnd = null;
    elements.aiCoachingDraft.value = '';
    ui.resetAngleBuffers();
    elements.premiumMinKnee.textContent = t('analysisWaiting');
    elements.premiumKneeGap.textContent = t('analysisWaiting');
    ui.markTrackingLost(t('selectVideoNeeded'));
    sessions.updateSessionDraftLabels();
    sessions.renderTurnSessions(selectTurnSession);
    renderFrameCaptures();
    renderRiskTimeline();
}

function updatePremiumSummary(left, right) {
    const min = Math.min(left, right);
    const gap = Math.abs(left - right);
    state.analysisStats.minKnee = state.analysisStats.minKnee === null ? min : Math.min(state.analysisStats.minKnee, min);
    state.analysisStats.maxKneeGap = Math.max(state.analysisStats.maxKneeGap, gap);
    state.analysisStats.frames += 1;
    elements.premiumMinKnee.textContent = `${state.analysisStats.minKnee}도`;
    elements.premiumKneeGap.textContent = `${state.analysisStats.maxKneeGap}도`;
}

function saveAnalysisRow(angles, risk, quality) {
    const time = Number(elements.video.currentTime.toFixed(3));
    if (!isInsideSelectedSession(time)) return;
    state.analysisRows.push({
        time, ...angles, kneeGap: Math.abs(angles.leftKnee - angles.rightKnee),
        risk: risk.label, riskLevel: risk.level, trackingQuality: quality.score
    });
}

function renderRiskTimeline() {
    const riskyRows = state.analysisRows.filter(row => row.riskLevel !== 'low');
    elements.riskEventCount.textContent = `${riskyRows.length}개 감지 중`;
}

// --- Captures & Reports ---

function saveCurrentFrameCapture() {
    if (!requirePremium('코칭 프레임 저장')) return;
    pauseForFrameAnnotation();
    const session = sessions.getSelectedSession();
    const capture = {
        id: `cap-${Date.now()}`, time: Number(elements.video.currentTime.toFixed(3)),
        image: captureCanvasImage(), sessionId: session?.id || null, sessionName: session?.name || '',
        note: session?.memo || elements.turnSessionMemo.value.trim()
    };
    state.frameCaptures.push(capture);
    renderFrameCaptures();
}

function captureCanvasImage() {
    const temp = document.createElement('canvas');
    temp.width = elements.canvas.width; temp.height = elements.canvas.height;
    const ctx = temp.getContext('2d');
    ctx.drawImage(elements.canvas, 0, 0);
    if (state.fabricCanvas) {
        state.fabricCanvas.renderAll();
        ctx.drawImage(state.fabricCanvas.lowerCanvasEl, 0, 0, temp.width, temp.height);
    }
    return temp.toDataURL('image/png');
}

function renderFrameCaptures() {
    if (!state.frameCaptures.length) {
        elements.captureList.innerHTML = `<div class="capture-item"><strong>${t('noCapturesTitle')}</strong><span>${t('noCapturesBody')}</span></div>`;
        return;
    }
    elements.captureList.innerHTML = state.frameCaptures.map((c, i) => `
        <div class="capture-item"><strong>${t('capturePrefix')} ${i+1} · ${video.formatTime(c.time)}</strong>
        <span>${ui.escapeHtml(c.sessionName) || 'Full'} · ${ui.escapeHtml(c.note) || ''}</span><img src="${c.image}"></div>
    `).join('');
}

async function savePngReport() {
    if (!requirePremium('스키 턴 리포트 저장')) return;
    alert('리포트 생성 기능이 준비 중입니다.');
}

function generateAiCoachingDraft() {
    if (!requirePremium('AI 코칭 메모 초안')) return;
    elements.aiCoachingDraft.value = "AI 초안 생성 로직 준비 중";
}

async function copyAiCoachingDraft() {
    if (!requirePremium('AI 코칭 메모 초안 복사')) return;
    elements.aiCoachingDraft.select();
    document.execCommand('copy');
}

function toggleLanguageMenu() {
    const isVisible = !elements.languageMenu.hidden;
    elements.languageMenu.hidden = isVisible;
    elements.languageButton.setAttribute('aria-expanded', String(!isVisible));
}

// --- Kickoff ---
init();
