import { state, elements, t, requirePremium } from './state.js';
import { updateTrackingQuality, resetAngleBuffers, markTrackingLost } from './ui-controls.js';

/**
 * ai-engine.js
 * MediaPipe Pose 엔진 초기화, 각도 계산, 튜닝 로직을 담당합니다.
 */

export function initPose(onResultsCallback) {
    state.pose = new window.Pose({ locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
    state.pose.setOptions({
        modelComplexity: 1, // 0, 1, 2 중 선택하여 정확도 조절
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    state.pose.onResults(onResultsCallback);
}

export function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180 / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return Math.round(angle);
}

export function getTrackingQuality(landmarks) {
    const visibilities = state.qualityLandmarkIndexes.map(index => landmarks[index]?.visibility ?? 0);
    const averageVisibility = visibilities.reduce((sum, value) => sum + value, 0) / visibilities.length;
    const lowVisibilityCount = visibilities.filter(value => value < state.minUsableVisibility).length;
    const score = Math.round(averageVisibility * 100);

    if (lowVisibilityCount >= 3 || averageVisibility < state.minUsableVisibility) {
        return {
            score, usable: false, level: 'low', label: `${score}%`,
            hint: '관절 일부가 가려졌거나 전신 인식이 불안정합니다.'
        };
    }

    if (averageVisibility < 0.75 || lowVisibilityCount > 0) {
        return {
            score, usable: true, level: 'mid', label: `${score}%`,
            hint: '분석 가능하지만 조명, 카메라 각도, 가림 여부를 확인하세요.'
        };
    }

    return { score, usable: true, level: 'good', label: `${score}%`, hint: '추적 양호' };
}

export function smoothAngle(key, value) {
    const buffer = state.angleBuffers[key];
    buffer.push(value);
    if (buffer.length > state.angleSmoothingWindow) buffer.shift();
    return Math.round(buffer.reduce((sum, item) => sum + item, 0) / buffer.length);
}

export function smoothAngles(rawAngles) {
    return {
        leftKnee: smoothAngle('leftKnee', rawAngles.leftKnee),
        rightKnee: smoothAngle('rightKnee', rawAngles.rightKnee),
        leftShoulder: smoothAngle('leftShoulder', rawAngles.leftShoulder),
        rightShoulder: smoothAngle('rightShoulder', rawAngles.rightShoulder)
    };
}

export function setRisk(leftKneeAngle, rightKneeAngle) {
    const minAngle = Math.min(leftKneeAngle, rightKneeAngle);
    if (minAngle < 100) {
        return { label: t('highRisk'), level: 'high' };
    } else if (minAngle < 120) {
        return { label: t('watchRisk'), level: 'mid' };
    } else {
        return { label: t('stableRisk'), level: 'low' };
    }
}
