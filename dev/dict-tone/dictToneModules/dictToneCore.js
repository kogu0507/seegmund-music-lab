// dictToneCore.js
// Tone.js を利用した音源再生や各種操作の共通関数をまとめたモジュール

// 必要に応じて Tone.js をインポート（モジュール環境の場合）
// import * as Tone from 'tone';

import * as constants from './dictToneConstants.js';
import * as instrumentsModule from './dictToneInstruments.js';
// ※ 今後 dictToneScores.js から楽譜データをインポートする設計も検討

// 内部状態（必要に応じてオブジェクト化すると管理しやすくなります）
let currentScore = null;        // 現在選択されている楽譜
let currentInstrument = null;   // 現在設定されている楽器
let isPlaying = false;          // 再生状態

/**
 * 初期化処理：Tone.js のスタートと楽器のロードを行います。
 */
export async function setup() {
  try {
    // Tone.js のスタート
    await Tone.start();
    console.log("Tone.js started successfully.");

    // 楽器のセットアップ（非同期処理）
    await instrumentsModule.setupInstruments();
    console.log("Instruments loaded successfully.");

    // その他初期化処理があればここに追加
    // 【アップデート候補】
    // - dispatchEvent('SetupComplete') など、UIへ完了通知する仕組み

  } catch (error) {
    console.error("Error during setup:", error);
    throw error;
  }
}

/**
 * 楽器の設定を行います。
 *
 * @param {Object} instrument - 設定する楽器オブジェクト
 */
export function setInstrument(instrument) {
  currentInstrument = instrument;
  // 楽器切り替えのロジックをここに実装
  console.log("Instrument set to:", instrument);
  // 【アップデート候補】  
  // - 各パートごとに楽器を変更できる機能
}

/**
 * 楽譜の設定を行います。
 *
 * @param {string|number} score - 選択された楽譜情報
 */
export function setScore(score) {
  currentScore = score;
  // 楽譜切り替えのロジックをここに実装
  console.log("Score set to:", score);
  // 【アップデート候補】
  // - dictToneScores.js からスコアデータを読み込む処理の実装
}

/**
 * 再生処理を実行します。
 */
export function play() {
  if (!currentInstrument || !currentScore) {
    console.error("再生前に楽器と楽譜が設定されていません。");
    return;
  }
  isPlaying = true;
  // Tone.js を利用した再生ロジックをここに実装
  console.log("Playback started.");
  // 【アップデート候補】
  // - 各パートのノートをTone.Transport.scheduleで登録
  // - 演奏終了時刻の自動停止処理と、終了カスタムイベントの発行
}

/**
 * 再生停止処理を実行します。
 */
export function stop() {
  if (!isPlaying) {
    console.warn("再生中ではありません。");
    return;
  }
  isPlaying = false;
  // 再生停止のロジックをここに実装
  console.log("Playback stopped.");
  // 【アップデート候補】
  // - 再生停止後、UIへの通知用のカスタムイベントを発行
}