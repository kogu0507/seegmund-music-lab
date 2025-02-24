// dictToneUi.js
// UIの更新処理と、カスタムイベントに基づくUIおよびアクションの連携を担当

import { play, stop, setScore, setInstrument } from './dictToneCore.js';
import elements from './dictToneElements.js';
import * as constants from './dictToneConstants.js';

/**
 * パートに応じたUIの更新を行います（必要に応じて実装）。
 *
 * @param {number} part - 対象のパート番号
 * @param {string} status - 更新する状態の文字列
 */
export function updatePartUi(part, status) {
  console.log(`Part ${part} updated with status: ${status}`);
  // 【アップデート候補】
  // - 各パートの進行状況やボタン状態を更新する機能
}

/**
 * 楽譜選択時のUI更新処理
 *
 * @param {string|number} scoreNumber - 選択された楽譜番号
 */
export function updateScoreUi(scoreNumber) {
  console.log("UI updated for score:", scoreNumber);
  // 【アップデート候補】
  // - 選択中の楽譜タイトルや作曲者情報の表示
}

/**
 * 楽器選択時のUI更新処理
 *
 * @param {Object} instrument - 選択された楽器オブジェクト
 */
export function updateInstrumentUi(instrument) {
  console.log("UI updated for instrument:", instrument);
  // 【アップデート候補】
  // - 各楽器のアイコンや名前を表示する
}

/**
 * ステータスバーの更新を行います。
 *
 * @param {string} status - 表示するステータスメッセージ
 */
export function updateStatusUi(status) {
  if (elements.statusText) {
    elements.statusText.textContent = status;
  } else {
    console.error("Status text element is not available.");
  }
}

// カスタムイベントに基づく処理の登録

document.addEventListener(constants.PLAY_EVENT, () => {
  updateStatusUi(constants.STATUS_PLAYING);
  play();
});

document.addEventListener(constants.STOP_EVENT, () => {
  updateStatusUi(constants.STATUS_STOPPED);
  stop();
});

document.addEventListener(constants.CHANGE_SCORE_EVENT, (event) => {
  const { score } = event.detail;
  setScore(score);
  updateScoreUi(score);
});

document.addEventListener(constants.CHANGE_INSTRUMENT_EVENT, (event) => {
  const { instrument } = event.detail;
  setInstrument(instrument);
  updateInstrumentUi(instrument);
});

// ※ DOMContentLoaded での初期状態設定は script.js で実施済み