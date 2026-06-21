/**
 * state.js
 * 프로젝트 전반에서 공유되는 상태 값과 DOM 엘리먼트 참조를 관리합니다.
 */

export const elements = {};

export function initElements() {
    try {
        elements.video = document.getElementById('input_video');
        elements.canvas = document.getElementById('output_canvas');
        if (elements.canvas) {
            elements.canvasCtx = elements.canvas.getContext('2d');
        }
        elements.emptyState = document.getElementById('empty_state');
        elements.premiumModal = document.getElementById('premiumModal');
        elements.premiumModalTitle = document.getElementById('premiumModalTitle');
        elements.premiumModalCopy = document.getElementById('premiumModalCopy');
        elements.premiumClose = document.getElementById('premiumClose');
        elements.premiumLogin = document.getElementById('premiumLogin');
        elements.premiumLoginForm = document.getElementById('premiumLoginForm');
        elements.loginEmail = document.getElementById('loginEmail');
        elements.navPremium = document.getElementById('navPremium');
        elements.navLogin = document.getElementById('navLogin');
        elements.languageButton = document.getElementById('languageButton');
        elements.languageMenu = document.getElementById('languageMenu');
        elements.dashboard = document.querySelector('.dashboard');
        elements.videoControls = document.getElementById('videoControls');
        elements.videoSeekBar = document.getElementById('videoSeekBar');
        elements.videoCurrentTime = document.getElementById('videoCurrentTime');
        elements.videoDuration = document.getElementById('videoDuration');
        elements.playPauseButton = document.getElementById('btn_play_pause');
        elements.playbackSpeed = document.getElementById('playbackSpeed');
        elements.originalViewButton = document.getElementById('btn_view_original');
        elements.aiViewButton = document.getElementById('btn_view_ai');
        elements.drawingCanvas = document.getElementById('drawing_canvas');
        elements.videoUpload = document.getElementById('video_upload');
        elements.turnSessionTag = document.getElementById('turnSessionTag');
        elements.turnSessionName = document.getElementById('turnSessionName');
        elements.turnSessionMemo = document.getElementById('turnSessionMemo');
        elements.sessionStartLabel = document.getElementById('sessionStartLabel');
        elements.sessionEndLabel = document.getElementById('sessionEndLabel');
        elements.aiCoachingDraft = document.getElementById('aiCoachingDraft');
        elements.riskLevel = document.getElementById('riskLevel');
        elements.premiumMinKnee = document.getElementById('premiumMinKnee');
        elements.premiumKneeGap = document.getElementById('premiumKneeGap');
        elements.trackingQuality = document.getElementById('trackingQuality');
        elements.trackingHint = document.getElementById('trackingHint');
        elements.riskTimelineList = document.getElementById('riskTimelineList');
        elements.riskEventCount = document.getElementById('riskEventCount');
        elements.captureList = document.getElementById('captureList');
        elements.turnSessionList = document.getElementById('turnSessionList');
        elements.compareSessionA = document.getElementById('compareSessionA');
        elements.compareSessionB = document.getElementById('compareSessionB');
        elements.compareResult = document.getElementById('compareResult');
        elements.reportStudentName = document.getElementById('reportStudentName');
        elements.reportCoachName = document.getElementById('reportCoachName');
        elements.reportDate = document.getElementById('reportDate');
        console.log("DOM Elements initialized successfully.");
    } catch (e) {
        console.error("Failed to initialize DOM elements:", e);
    }
}

// --- App State ---
export const state = {
    isPremium: new URLSearchParams(location.search).get('premium') === '1' || localStorage.getItem('isPremium') === 'true',
    languageStorageKey: 'kinecti-language-v2',
    currentLanguage: localStorage.getItem('kinecti-language-v2') || 'en',
    freeSessionLimit: 2,
    fabricCanvas: null,
    pose: null,
    viewMode: 'original',
    premiumPenColor: '#fbbf24',
    premiumPenWidth: 8,
    
    analysisStats: { minKnee: null, maxKneeGap: 0, frames: 0 },
    analysisRows: [],
    turnSessions: [],
    frameCaptures: [],
    
    selectedSessionId: null,
    pendingSessionStart: null,
    pendingSessionEnd: null,
    
    qualityLandmarkIndexes: [11, 12, 13, 14, 23, 24, 25, 26, 27, 28],
    minUsableVisibility: 0.55,
    angleSmoothingWindow: 5,
    angleBuffers: { leftKnee: [], rightKnee: [], leftShoulder: [], rightShoulder: [] },
    validSections: new Set(['home', 'tool', 'guide', 'resources', 'about', 'privacy', 'contact']),
    lastFeatureRequested: 'Premium'
};

// --- Helper Functions ---
export function t(key) {
    if (!window.translations || !window.translations[state.currentLanguage]) return key;
    return window.translations[state.currentLanguage][key] ?? window.translations.en[key];
}

export function requirePremium(featureName) {
    if (state.isPremium) return true;
    openPremiumModal(featureName);
    return false;
}

export function openPremiumModal(featureName = '스키 턴 Premium 기능') {
    state.lastFeatureRequested = featureName;
    updatePremiumModalUI();
    if (elements.premiumModal) {
        elements.premiumModal.hidden = false;
        elements.premiumModal.classList.add('is-open');
    }
    if (elements.loginEmail) {
        elements.loginEmail.focus();
    }
}

export function updatePremiumModalUI() {
    const isLoggedIn = !!localStorage.getItem('userEmail');
    const featureName = state.lastFeatureRequested || 'Premium';
    
    if (elements.premiumModalTitle) {
        elements.premiumModalTitle.textContent = isLoggedIn ? t('premiumTitleAccessRequired') : t('premiumTitleLoginRequired');
    }
    if (elements.premiumModalCopy) {
        elements.premiumModalCopy.textContent = isLoggedIn ? t('premiumCopyAccessRequired')(featureName) : t('premiumCopyLoginRequired')(featureName);
    }
    if (elements.premiumLogin) {
        elements.premiumLogin.style.display = isLoggedIn ? 'none' : 'flex';
    }
}

export function closePremiumModal() {
    if (elements.premiumModal) {
        elements.premiumModal.classList.remove('is-open');
        elements.premiumModal.hidden = true;
    }
}
