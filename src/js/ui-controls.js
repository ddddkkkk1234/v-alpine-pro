import { state, elements, t, updatePremiumModalUI } from './state.js';

/**
 * ui-controls.js
 * 다국어 처리, 페이지 전환, 모달 등 일반 UI 조작 로직을 담당합니다.
 */

export function renderLocalizedSections(language) {
    const content = window.sectionContent[language] || window.sectionContent.en;
    Object.entries(content).forEach(([sectionId, html]) => {
        const section = document.getElementById(sectionId);
        if (section && html) section.innerHTML = html;
    });
}

export function setElementsText(selector, text) {
    document.querySelectorAll(selector).forEach(element => {
        element.textContent = text;
    });
}

export function escapeHtml(string) {
    if (!string) return '';
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function applyLanguage(language) {
    state.currentLanguage = window.translations[language] ? language : 'en';
    const pack = window.translations[state.currentLanguage];
    localStorage.setItem(state.languageStorageKey, state.currentLanguage);
    document.documentElement.lang = pack.lang;
    document.title = pack.title;
    renderLocalizedSections(state.currentLanguage);

    Object.entries(pack.text).forEach(([selector, text]) => setElementsText(selector, text));
    Object.entries(pack.placeholder).forEach(([selector, text]) => {
        document.querySelectorAll(selector).forEach(element => {
            element.placeholder = text;
        });
    });

    if (elements.turnSessionTag) {
        [...elements.turnSessionTag.options].forEach((option, index) => {
            option.textContent = pack.tags[index] || option.textContent;
            option.value = pack.tags[index] || option.value;
        });
    }

    elements.languageMenu.querySelectorAll('[data-language]').forEach(button => {
        button.classList.toggle('active', button.dataset.language === state.currentLanguage);
    });
    elements.languageButton.setAttribute('aria-label', `Language settings: ${state.currentLanguage}`);
    
    updateNavAccountState();
    // 이 함수들은 각 모듈에서 나중에 가져와서 호출하거나 app.js에서 관리합니다.
}

export function showPage(sectionId, shouldUpdateHash = true) {
    const nextSection = state.validSections.has(sectionId) ? sectionId : 'home';
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.toggle('active-section', section.id === nextSection);
    });
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${nextSection}`);
    });
    if (shouldUpdateHash) {
        history.pushState(null, '', `#${nextSection}`);
    }
    window.scrollTo(0, 0);
    if (nextSection === 'tool') {
        // resizeCanvas는 메인 app.js나 공통 유틸로 관리
        setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
    }
}

export function setDashboardTab(tabName) {
    elements.dashboard.dataset.activeTab = tabName;
    document.querySelectorAll('[data-tab-target]').forEach(button => {
        button.classList.toggle('active', button.dataset.tabTarget === tabName);
    });
}

export function updateNavAccountState() {
    elements.navPremium.classList.toggle('active-premium', state.isPremium);
    elements.navPremium.textContent = state.isPremium ? t('premiumActive') : 'Premium';
    
    const isLoggedIn = !!localStorage.getItem('userEmail');
    elements.navLogin.textContent = isLoggedIn ? t('logout') : t('login');
    
    updatePremiumModalUI();
}

export function updateTrackingQuality(quality) {
    elements.trackingQuality.textContent = quality.label;
    elements.trackingQuality.className = `value quality-${quality.level}`;
    elements.trackingHint.textContent = quality.hint;
}

export function updateRiskUI(risk) {
    elements.riskLevel.textContent = risk.label;
    elements.riskLevel.className = `value risk-${risk.level}`;
}

export function resetAngleBuffers() {
    state.angleBuffers = { leftKnee: [], rightKnee: [], leftShoulder: [], rightShoulder: [] };
}

export function markTrackingLost(message = '사람 자세를 안정적으로 찾지 못했습니다.') {
    updateTrackingQuality({ score: 0, usable: false, level: 'low', label: '불안정', hint: message });
}

export function resizeCanvas() {
    const container = document.querySelector('.video-box');
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    elements.canvas.width = w;
    elements.canvas.height = h;
    if (state.fabricCanvas) {
        state.fabricCanvas.setWidth(w);
        state.fabricCanvas.setHeight(h);
        state.fabricCanvas.renderAll();
    }
}

export function setViewMode(nextMode) {
    state.viewMode = nextMode;
    elements.originalViewButton.classList.toggle('active', state.viewMode === 'original');
    elements.aiViewButton.classList.toggle('active', state.viewMode === 'ai');
    resetAngleBuffers();

    if (state.viewMode === 'original') {
        drawCurrentVideoFrame();
        updateTrackingQuality({ score: 0, usable: false, level: 'low', label: t('originalView'), hint: t('originalHint') });
    } else {
        updateTrackingQuality({ score: 0, usable: false, level: 'low', label: t('aiWaiting'), hint: t('aiHint') });
        if (elements.video.paused && elements.video.readyState >= 2 && state.pose) {
            state.pose.send({ image: elements.video });
        }
    }
}

export function drawCurrentVideoFrame() {
    if (elements.video.readyState < 2) return;
    elements.canvasCtx.save();
    elements.canvasCtx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    elements.canvasCtx.drawImage(elements.video, 0, 0, elements.canvas.width, elements.canvas.height);
    elements.canvasCtx.restore();
}

export function refreshCurrentFrameForMode() {
    if (state.viewMode === 'ai' && state.pose && elements.video.readyState >= 2) {
        state.pose.send({ image: elements.video });
    } else {
        drawCurrentVideoFrame();
    }
}

export function resetCompareIdle() {
    if (!elements.compareResult) return;
    elements.compareResult.innerHTML = `
        <div class="compare-card">
            <strong>${t('compareIdleTitle')}</strong>
            <span>${t('compareIdleBody')}</span>
        </div>
    `;
}
