// dictToneEventListeners.js
// ユーザー操作（例：ボタンのクリックやセレクト変更）をカスタムイベントに変換する

import * as constants from './dictToneConstants.js';
import elements from './dictToneElements.js';

/**
 * ヘルパー関数：指定のイベント名でカスタムイベントを発行します。
 *
 * @param {string} eventName - 発行するカスタムイベントの名前
 * @param {Object} [detail={}] - イベントに付加する詳細情報
 */
const dispatchCustomEvent = (eventName, detail = {}) => {
  const event = new CustomEvent(eventName, { detail });
  document.dispatchEvent(event);
};

const eventListeners = {
  initialize: () => {
    // 楽譜選択（セレクト）の変更イベント
    if (elements.scoreSelect) {
      elements.scoreSelect.addEventListener('change', () => {
        const selectedScore = elements.scoreSelect.value;
        dispatchCustomEvent(constants.CHANGE_SCORE_EVENT, { score: selectedScore });
      });
    } else {
      console.error('scoreSelect element is not available.');
    }

    // 再生開始ボタンのクリックイベント
    if (elements.startButton) {
      elements.startButton.addEventListener('click', () => {
        dispatchCustomEvent(constants.PLAY_EVENT);
      });
    } else {
      console.error('startButton element is not available.');
    }

    // 再生停止ボタンのクリックイベント
    if (elements.stopButton) {
      elements.stopButton.addEventListener('click', () => {
        dispatchCustomEvent(constants.STOP_EVENT);
      });
    } else {
      console.error('stopButton element is not available.');
    }

    // 解答表示ボタンのクリックイベント（ここでは単純にテキストを表示）
    if (elements.answerButton && elements.answerText) {
      elements.answerButton.addEventListener('click', () => {
        elements.answerText.textContent = "ここに解答を表示";
      });
    } else {
      console.error('answerButton or answerText element is not available.');
    }
  },
};

export default eventListeners;