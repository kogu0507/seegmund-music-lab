// toneDictUtils.js

import { EVENTS } from './constants.js';

/**
 * イベント名が EVENTS オブジェクトの値として定義されているか確認する関数
 * @param {string} eventName - 発行されるイベント名（例: 'play1-8'）
 * @returns {boolean} - イベントが定義されていれば true を返す
 */
export function isEventDefined(eventName) {
    // EVENTS のすべての値（例: 'play1-8', 'play1-4', ...）の中に eventName が含まれているかチェック
    return Object.values(EVENTS).includes(eventName);
}

/**
 * 定義されたイベントがあればカスタムイベントを発行する関数
 * @param {string} eventName - 発行するイベント名（例: 'play1-8'）
 * @param {Object} [detail={}] - イベントに付随する詳細データ
 */
export function dispatchEventIfDefined(eventName, detail = {}) {
    if (isEventDefined(eventName)) {
        // カスタムイベントを生成して発行
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    } else {
        console.error(`Event ${eventName} is not defined.`);
    }
}

/**
 * カスタムイベントを発行するシンプルな関数
 * @param {string} eventName - 発行するイベント名
 */
export function dispatchEvent(eventName) {
    const event = new CustomEvent(eventName);
    document.dispatchEvent(event);
}
