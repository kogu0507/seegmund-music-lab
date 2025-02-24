// script.js
import * as constants from './dictToneModules/dictToneConstants.js';
import elements from './dictToneModules/dictToneElements.js';
import eventListeners from './dictToneModules/dictToneEventListeners.js';
import { setup, setInstrument, setScore, play, stop } from './dictToneModules/dictToneCore.js';
import * as ui from './dictToneModules/dictToneUi.js';

// DOMContentLoaded イベント内で各モジュールをテスト
document.addEventListener('DOMContentLoaded', async () => {
  console.log("TEST: DOMContentLoaded イベント発火");

  // 取得したい DOM 要素をキャッシュ
  elements.getElementByIds(
    "score-select",
    "start-button",
    "stop-button",
    "answer-button",
    "answer-text",
    "status-text"
  );
  console.log("TEST: キャッシュされた要素:", elements);

  // イベントリスナーの初期化
  eventListeners.initialize();
  console.log("TEST: イベントリスナーを初期化しました");

  // UI の初期ステータス更新テスト
  ui.updateStatusUi(constants.STATUS_PREPARING);
  console.log("TEST: UI ステータスを '準備中...' に更新");

  // Tone.js のセットアップと楽器の初期化のテスト
  try {
    await setup();
    console.log("TEST: Tone.js セットアップと楽器の初期化成功");
    ui.updateStatusUi(constants.STATUS_READY);
  } catch (error) {
    console.error("TEST: セットアップ失敗:", error);
    ui.updateStatusUi(constants.STATUS_ERROR);
  }

  // コアモジュールの関数テスト
  // ここでは、setInstrument と setScore を呼び出し、その結果を console.log で確認
  setInstrument({ name: "TestInstrument" });
  console.log("TEST: setInstrument を呼び出しました");

  setScore("score1");
  console.log("TEST: setScore を呼び出しました");

  // 再生テスト
  console.log("TEST: 再生前の状態を確認（楽器と楽譜が設定されているか）");
  play();
  console.log("TEST: play() を呼び出しました → 再生中の状態になっているはず");

  // 再生停止テスト
  setTimeout(() => {
    stop();
    console.log("TEST: stop() を呼び出しました → 再生停止すべき");
  }, 3000); // 3秒後に停止

  // ※ その他、カスタムイベントのテストも可能です
  // 例えば、直接 PLAY_EVENT をディスパッチしてみる：
  const testPlayEvent = new CustomEvent(constants.PLAY_EVENT);
  document.dispatchEvent(testPlayEvent);
  console.log("TEST: カスタムイベント PLAY_EVENT をディスパッチしました");
});
