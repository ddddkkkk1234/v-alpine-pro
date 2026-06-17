import { state, elements, t, requirePremium } from './state.js';
import { formatTime } from './video-player.js';

/**
 * session-manager.js
 * 턴 세션 저장, 비교, CSV 내보내기, 리포트 생성 로직을 담당합니다.
 */

export function updateSessionDraftLabels() {
    elements.sessionStartLabel.textContent = formatTime(state.pendingSessionStart);
    elements.sessionEndLabel.textContent = formatTime(state.pendingSessionEnd);
}

export function getSelectedSession() {
    return state.turnSessions.find(session => session.id === state.selectedSessionId) || null;
}

export function getSessionRowCount(session) {
    return state.analysisRows.filter(row => row.time >= session.start && row.time <= session.end).length;
}

export function renderTurnSessions(selectTurnSessionCallback) {
    if (!elements.turnSessionList) return;

    if (!state.turnSessions.length) {
        elements.turnSessionList.innerHTML = `
            <div class="session-item">
                <strong>${t('noSessionsTitle')}</strong>
                <span>${t('noSessionsBody')}</span>
            </div>
        `;
        updateCompareOptions();
        return;
    }

    elements.turnSessionList.innerHTML = state.turnSessions.map(session => `
        <button class="session-item ${session.id === state.selectedSessionId ? 'active' : ''}" type="button" data-session-id="${session.id}">
            <strong>${session.name}</strong>
            <span>${session.tag} · ${formatTime(session.start)}-${formatTime(session.end)} · ${getSessionRowCount(session)}프레임</span>
        </button>
    `).join('');

    elements.turnSessionList.querySelectorAll('[data-session-id]').forEach(button => {
        button.addEventListener('click', () => selectTurnSessionCallback(button.dataset.sessionId));
    });
    updateCompareOptions();
}

export function updateCompareOptions() {
    const selects = [elements.compareSessionA, elements.compareSessionB];
    selects.forEach((select, index) => {
        if (!select) return;
        const currentValue = select.value;
        select.innerHTML = state.turnSessions.length
            ? state.turnSessions.map(session => `<option value="${session.id}">${session.name}</option>`).join('')
            : `<option value="">${t('noSessionOption')}</option>`;
        if (state.turnSessions.some(session => session.id === currentValue)) {
            select.value = currentValue;
        } else if (state.turnSessions[index]) {
            select.value = state.turnSessions[index].id;
        }
    });
}

export function getSessionMetrics(session) {
    const rows = state.analysisRows.filter(row => row.time >= session.start && row.time <= session.end);
    if (!rows.length) {
        return { frames: 0, minKnee: '-', maxGap: '-', avgQuality: '-' };
    }

    return {
        frames: rows.length,
        minKnee: Math.min(...rows.map(row => Math.min(row.leftKnee, row.rightKnee))),
        maxGap: Math.max(...rows.map(row => row.kneeGap)),
        avgQuality: Math.round(rows.reduce((sum, row) => sum + row.trackingQuality, 0) / rows.length)
    };
}

export function renderSessionCompare() {
    if (!requirePremium('좋은 턴 / 나쁜 턴 비교')) return;
    if (!elements.compareResult || !elements.compareSessionA || !elements.compareSessionB) return;
    
    const sessionA = state.turnSessions.find(session => session.id === elements.compareSessionA.value);
    const sessionB = state.turnSessions.find(session => session.id === elements.compareSessionB.value);
    
    if (!sessionA || !sessionB || sessionA.id === sessionB.id) {
        alert('비교할 턴 세션 2개를 서로 다르게 선택해주세요.');
        return;
    }

    elements.compareResult.innerHTML = [sessionA, sessionB].map(session => {
        const metrics = getSessionMetrics(session);
        const memo = session.memo || '저장된 코칭 메모 없음';
        return `
            <div class="compare-card">
                <strong>${session.name} · ${session.tag}</strong>
                <span>${formatTime(session.start)}-${formatTime(session.end)} · ${metrics.frames}프레임 · 최저 무릎 ${metrics.minKnee}도 · 좌우 차이 ${metrics.maxGap}도 · 품질 ${metrics.avgQuality}%</span>
                <span>${memo}</span>
            </div>
        `;
    }).join('');
}

export function exportCsv() {
    if (!requirePremium('CSV 데이터 내보내기')) return;
    
    const selectedSession = getSelectedSession();
    const scopedRows = selectedSession 
        ? state.analysisRows.filter(row => row.time >= selectedSession.start && row.time <= selectedSession.end)
        : state.analysisRows;

    if (!scopedRows.length) {
        alert('선택한 세션에 분석 데이터가 없습니다. 먼저 해당 구간을 재생해 분석해주세요.');
        return;
    }
    
    const headers = ['time_seconds', 'left_knee', 'right_knee', 'left_shoulder', 'right_shoulder', 'knee_gap', 'risk', 'tracking_quality'];
    const escapeCsv = value => `"${String(value).replaceAll('"', '""')}"`;
    const rows = scopedRows.map(row => [
        row.time, row.leftKnee, row.rightKnee, row.leftShoulder, row.rightShoulder, row.kneeGap, row.risk, row.trackingQuality
    ].map(escapeCsv).join(','));
    
    const filePrefix = selectedSession ? selectedSession.name.replace(/[\\/:*?"<>|]/g, '-').toLowerCase() : 'full-video';
    const content = `\uFEFF${headers.join(',')}\n${rows.join('\n')}`;
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kinecti-${filePrefix}-analysis.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
