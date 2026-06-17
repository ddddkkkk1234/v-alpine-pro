import { state, elements, t, requirePremium } from './state.js';

/**
 * video-player.js
 * 비디오 재생, 시크 바, 재생 속도 및 영상 녹화/내보내기 로직을 담당합니다.
 */

export function formatTime(seconds) {
    if (seconds === null || Number.isNaN(seconds)) return t('unset');
    const minutes = Math.floor(seconds / 60);
    const remain = (seconds % 60).toFixed(1).padStart(4, '0');
    return `${minutes}:${remain}`;
}

export function updateVideoControls() {
    if (!elements.videoCurrentTime || !elements.videoDuration || !elements.playPauseButton) return;
    const current = elements.video.currentTime || 0;
    const duration = Number.isFinite(elements.video.duration) ? elements.video.duration : 0;
    
    elements.videoCurrentTime.textContent = formatTime(current);
    elements.videoDuration.textContent = duration > 0 ? formatTime(duration) : '0:00.0';
    elements.playPauseButton.textContent = elements.video.paused
        ? window.translations[state.currentLanguage].text['#btn_play_pause']
        : (state.currentLanguage === 'ja' ? '停止' : state.currentLanguage === 'ko' ? '정지' : 'Pause');
        
    if (elements.videoSeekBar && duration > 0) {
        const progress = (current / duration) * 100;
        elements.videoSeekBar.value = progress;
        elements.videoSeekBar.style.background = `linear-gradient(to right, var(--cyan) ${progress}%, rgba(255, 255, 255, 0.2) ${progress}%)`;
    }
}

export async function togglePlayback() {
    if (!Number.isFinite(elements.video.duration)) {
        alert('먼저 스키 영상을 선택해주세요.');
        return;
    }

    if (elements.video.paused) {
        const selectedSession = state.turnSessions.find(s => s.id === state.selectedSessionId);
        if (selectedSession && (elements.video.currentTime < selectedSession.start || elements.video.currentTime >= selectedSession.end)) {
            elements.video.currentTime = selectedSession.start;
        }
        await elements.video.play();
    } else {
        elements.video.pause();
    }
    updateVideoControls();
}

export function seekVideoBy(delta) {
    if (!Number.isFinite(elements.video.duration)) {
        alert('먼저 스키 영상을 선택해주세요.');
        return;
    }

    const selectedSession = state.turnSessions.find(s => s.id === state.selectedSessionId);
    const minTime = selectedSession ? selectedSession.start : 0;
    const maxTime = selectedSession ? selectedSession.end : elements.video.duration;
    elements.video.pause();
    elements.video.currentTime = Math.min(maxTime, Math.max(minTime, elements.video.currentTime + delta));
    updateVideoControls();
}

export function updatePlaybackSpeed() {
    elements.video.playbackRate = Number(elements.playbackSpeed.value);
}

export async function exportVideo(setViewMode) {
    if (!requirePremium('AI 구간 영상 저장')) return;
    
    if (!Number.isFinite(elements.video.duration)) {
        alert('먼저 스키 영상을 선택해주세요.');
        return;
    }

    const selectedSession = state.turnSessions.find(s => s.id === state.selectedSessionId);
    const startTime = selectedSession ? selectedSession.start : 0;
    const endTime = selectedSession ? selectedSession.end : elements.video.duration;
    const duration = endTime - startTime;

    if (duration > 60) {
        if (!confirm('1분 이상의 긴 영상입니다. 브라우저 녹화 방식이므로 재생되는 시간만큼 그대로 기다려야 합니다. 진행하시겠습니까?')) return;
    } else {
        alert(`선택된 구간(${duration.toFixed(1)}초) 녹화를 시작합니다. 녹화가 끝날 때까지 탭을 유지해주세요.`);
    }

    const exportBtn = document.getElementById('btn_export_video');
    const originalText = exportBtn.textContent;
    exportBtn.textContent = '녹화 중...';
    exportBtn.disabled = true;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = elements.canvas.width;
    exportCanvas.height = elements.canvas.height;
    const ctx = exportCanvas.getContext('2d');

    const stream = exportCanvas.captureStream(30);
    let options = { mimeType: 'video/webm; codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' };
    }
    const mediaRecorder = new MediaRecorder(stream, options);
    const chunks = [];

    mediaRecorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data);

    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: options.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        const filePrefix = selectedSession ? selectedSession.name.replace(/[\\/:*?"<>|]/g, '-').toLowerCase() : 'full-video';
        a.download = `kinecti-${filePrefix}-ai.webm`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
        alert('녹화가 완료되었습니다.');
    };

    let isRecording = true;
    function renderLoop() {
        if (!isRecording) return;
        ctx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
        ctx.drawImage(elements.video, 0, 0, exportCanvas.width, exportCanvas.height);
        ctx.drawImage(elements.canvas, 0, 0, exportCanvas.width, exportCanvas.height);
        if (state.fabricCanvas) {
            state.fabricCanvas.renderAll();
            ctx.drawImage(state.fabricCanvas.lowerCanvasEl, 0, 0, exportCanvas.width, exportCanvas.height);
        }
        requestAnimationFrame(renderLoop);
    }

    setViewMode('ai');
    elements.video.currentTime = startTime;
    await elements.video.play();
    
    mediaRecorder.start();
    renderLoop();

    const checkEnd = setInterval(() => {
        if (elements.video.currentTime >= endTime || elements.video.paused || elements.video.ended) {
            clearInterval(checkEnd);
            elements.video.pause();
            isRecording = false;
            mediaRecorder.stop();
        }
    }, 100);
}
