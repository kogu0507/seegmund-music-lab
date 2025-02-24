
# dictToneモジュール ドキュメント

## 概要
- Tone.js を利用して、Web上で楽譜データに基づいた音源再生を実現します。  
- Web聴音アプリとして、登録された楽譜を切り替えて再生し、対面聴音の課題演奏をアプリ化します。  
- 複数のサンプラーを同時に動かし、単声部から複声部まで対応。  
- UI操作はイベント駆動型で、各操作をカスタムイベントに変換し、各モジュール間の疎結合を実現しています。

---

## ディレクトリ候補

### 開発用ディレクトリ

```
dev/
  dict-tone/
    index.html
    script.js
    data.js              # 楽譜データ（1曲分）
    dictToneModules/     # 開発中のモジュール（本番では static/js/ に移動）
      dictToneConstants.js
      dictToneCore.js
      dictToneElements.js
      dictToneEventListeners.js
      dictToneInstruments.js
      dictToneUi.js

```

### 開発用ディレクトリ

```
ja/music-apps/dict-tone/
    index.html
    script.js
    data.js              # 楽譜データ（1曲分）
static/
    js/
        dictToneModules/  # ロジック系のモジュール
            dictToneConstants.js
            dictToneCore.js
            dictToneElements.js
            dictToneEventListeners.js
            dictToneInstruments.js
            dictToneUi.js
```

---

## 今後追加予定のモジュール候補

### 1. dictToneScoreEditor.js  
**説明**: 楽譜データの編集機能を提供するモジュール。  
```JavaScript
// dictToneScoreEditor.js
// 将来的に楽譜の編集（ノートの追加、削除、移調、コピー＆ペーストなど）を実現するためのモジュール

/**
 * アップデート候補
 * - editNote(noteId, newProperties): 指定したノートのプロパティ（ピッチ、長さなど）を編集
 * - addNote(partId, noteData): 指定したパートに新しいノートを追加
 * - deleteNote(noteId): 指定したノートを削除
 * - validateScore(scoreData): 楽譜データの整合性を検証する
 * - saveScore(scoreData): 編集後の楽譜を保存する（サーバーやローカルストレージへ）
 */
```

### 2. dictToneMixer.js  
**説明**: 各パートごとの音量、エフェクト、BPM、移調などの再生パラメータを管理するモジュール。  
```JavaScript
// dictToneMixer.js
// 将来的に各パートの音量調整、エフェクト適用、BPM変更、移調などを行うためのミキサー的なモジュール

/**
 * アップデート候補
 * - setVolume(partId, volume): 各パートの音量を設定する
 * - setBPM(newBPM): 全体のBPMを変更する
 * - setTranspose(partId, interval): 指定パートの全ノートを移調する
 * - applyEffect(partId, effectOptions): 指定パートにエフェクトを適用する
 */
```

---

## 各モジュールの詳細

### １．index.html

- 音再生コードが整ったらBootstrapを使用する予定
- サイト用テンプレートあり。後で流し込み。


```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Web聴音アプリ</title>
  <!-- 必要に応じてスタイルシートやTone.jsのスクリプトを読み込み -->
</head>
<body>
  <section id="score-selection">
    <h2>楽譜選択</h2>
    <label for="score-select">楽譜:</label>
    <select id="score-select" aria-label="楽譜選択">
      <option value="score1">試験用</option>
      <option value="score2">前半4小節</option>
      <option value="score3">後半4小節</option>
    </select>
  </section>

  <section id="playback-controls">
    <h2>再生コントロール</h2>
    <!-- ボタンに type="button" を追加 -->
    <button id="start-button" type="button" aria-label="再生開始">
      <span class="visually-hidden">再生</span>
    </button>
    <button id="stop-button" type="button" aria-label="再生停止">
      <span class="visually-hidden">停止</span>
    </button>
  </section>

  <section id="answer-display">
    <h2>解答</h2>
    <button id="answer-button" type="button" aria-label="解答表示">解答を表示</button>
    <div id="answer-text" aria-live="polite"></div>
  </section>

  <div id="status-bar">
    <span id="status-text"></span>
  </div>

  <!-- メインのスクリプト -->
  <script src="data.js"></script> 
  <script type="module" src="script.js"></script>
</body>
</html>
```

### １．index.html(テスト用)

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Web聴音アプリ テスト</title>
  <!-- Tone.js を CDN から読み込み（例） -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.39/Tone.min.js"></script>
  <!-- 必要に応じてその他のスタイルシートなど -->
</head>
<body>
  <section id="score-selection">
    <h2>楽譜選択</h2>
    <label for="score-select">楽譜:</label>
    <select id="score-select" aria-label="楽譜選択">
      <option value="score1">試験用</option>
      <option value="score2">前半4小節</option>
      <option value="score3">後半4小節</option>
    </select>
  </section>

  <section id="playback-controls">
    <h2>再生コントロール</h2>
    <button id="start-button" type="button" aria-label="再生開始">
      <span class="visually-hidden">再生</span>
    </button>
    <button id="stop-button" type="button" aria-label="再生停止">
      <span class="visually-hidden">停止</span>
    </button>
  </section>

  <section id="answer-display">
    <h2>解答</h2>
    <button id="answer-button" type="button" aria-label="解答表示">解答を表示</button>
    <div id="answer-text" aria-live="polite"></div>
  </section>

  <div id="status-bar">
    <span id="status-text"></span>
  </div>

  <!-- 楽譜データ -->
  <script src="data.js"></script>
  <!-- メインのテスト用スクリプト -->
  <script type="module" src="script.js"></script>
</body>
</html>

```

---

### ２a．script.js

```javascript
// script.js
import * as constants from './dictToneModules/dictToneConstants.js';
import elements from './dictToneModules/dictToneElements.js';
import eventListeners from './dictToneModules/dictToneEventListeners.js';
import { setup } from './dictToneModules/dictToneCore.js';
import * as ui from './dictToneModules/dictToneUi.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 取得したいDOM要素のIDを一括取得
  elements.getElementByIds(
    "score-select",
    "start-button",
    "stop-button",
    "answer-button",
    "answer-text",
    "status-text"
  );

  // イベントリスナを初期化
  eventListeners.initialize();

  // 初期ステータスをUIに反映
  ui.updateStatusUi(constants.STATUS_PREPARING);

  try {
    // Tone.js の初期化や楽器のセットアップなどの非同期処理
    await setup();
    ui.updateStatusUi(constants.STATUS_READY);
  } catch (error) {
    console.error("Setup failed:", error);
    ui.updateStatusUi(constants.STATUS_ERROR);
  }
});
```
### ２a．script.js（テスト用）

```javascript
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

```




### ２b．data.js

```javascript
// data.js
// 楽譜データを定義するファイル
// JSON形式で楽譜のメタ情報と各パートのノートデータを保持します

const SCORES = {
  score1: {
    meta: {
      id: 1,
      title: "聴音課題サンプル",
      composer: "H. K.",
      bpm: 80,
      timeSignature: [4, 4],
      baseKey: "C",
      hearingType: "複旋律",
      level: 1,
      tags: ["聴音", "複旋律", "ソプラノ", "バス"]
    },
    parts: [
      {
        part: 1,
        partName: "ソプラノ",
        notes: [
          { absoluteBeat: 0.000, barNumber: 1, pitch: "C4", duration: 480, velocity: 0.80 },
          { absoluteBeat: 1.000, barNumber: 1, pitch: "E4", duration: 160, velocity: 0.80 },
          { absoluteBeat: 1.333, barNumber: 1, pitch: "E4", duration: 160, velocity: 0.80 },
          { absoluteBeat: 1.667, barNumber: 1, pitch: "E4", duration: 160, velocity: 0.80 },
          { absoluteBeat: 2.000, barNumber: 1, pitch: "C4", duration: 480, velocity: 0.80 },
          { absoluteBeat: 3.000, barNumber: 1, pitch: "C4", duration: 320, velocity: 0.80 },
          { absoluteBeat: 3.667, barNumber: 1, pitch: "C4", duration: 160, velocity: 0.80 }
        ]
      },
      {
        part: 2,
        partName: "バス",
        notes: [
          { absoluteBeat: 0.000, barNumber: 1, pitch: "E3", duration: 1920, velocity: 0.80 },
          { absoluteBeat: 1.000, barNumber: 1, pitch: "C3", duration: 1920, velocity: 0.80 }
        ]
      }
    ]
  }
  // 他のスコアデータもここに追加可能
};
```


---

### ３．dictToneConstants.js

```javascript
// dictToneConstants.js
// Web聴音アプリで使用する定数

// ■ カスタムイベント名
export const PLAY_EVENT = "PlayEvent";
export const STOP_EVENT = "StopEvent";
export const CHANGE_SCORE_EVENT = "ChangeScoreEvent";
export const CHANGE_INSTRUMENT_EVENT = "ChangeInstrumentEvent";

// ■ 楽器・パート、スコアなどの定義
export const PART1 = 1;
export const PART2 = 2;
export const PART3 = 3;

export const SCORE_NUMBER_1 = 1;
export const SCORE_NUMBER_2 = 2;

// ■ ステータス表示メッセージ
export const STATUS_PREPARING = "準備中...";
export const STATUS_READY      = "準備完了";
export const STATUS_PLAYING    = "再生中";
export const STATUS_STOPPED    = "停止";
export const STATUS_ERROR      = "エラー";

// その他必要な定数をここに追加
```

---

### ４．dictToneElements.js

```javascript
// dictToneElements.js
// DOM要素を一括取得し、キャッシュとして保持するモジュール

// 要素キャッシュ用オブジェクト
const elements = {
  /**
   * 指定されたIDリストのDOM要素を取得してキャッシュします。
   * 取得した要素は、ケバブケースのIDをキャメルケースに変換したキーで格納されます。
   *
   * @param  {...string} ids - 取得するDOM要素のIDリスト
   */
  getElementByIds: (...ids) => {
    ids.forEach(kebabCaseId => {
      // ケバブケース（例: score-select）をキャメルケース（例: scoreSelect）に変換
      const camelCaseId = kebabCaseId.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      const element = document.getElementById(kebabCaseId);
      if (!element) {
        console.error(`Element with id "${kebabCaseId}" not found.`);
      }
      elements[camelCaseId] = element;
    });
  }
};

export default elements;
```

---

### ５．dictToneEventListeners.js

```javascript
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
```

---

### ６．dictToneCore.js
**概要**:  
Tone.js を使った再生処理、各パートのスケジューリング、演奏終了検知、及び各種パラメータ（楽器、楽譜）の設定を担当するモジュール。  
将来的なアップデートとして、声部ごとの楽器変更、移調、BPM変更、音量調整機能なども検討しています。

```javascript
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
```

---

### ７．dictToneInstruments.js

```javascript
// dictToneInstruments.js
// 楽器データとセットアップ処理を担当

// サンプラーの設定例（必要に応じて設定項目を追加）
export const PIANO_SAMPLER_1 = {  
  name: "PianoSampler1",
  url: "path/to/piano1.mp3",
  // 他のTone.jsの設定オプションをここに追加
};

export const PIANO_SAMPLER_2 = {  
  name: "PianoSampler2",
  url: "path/to/piano2.mp3",
  // 他のTone.jsの設定オプションをここに追加
};

/**
 * 楽器データのロードと Tone.js を使った初期化処理を行います。
 */
export async function setupInstruments() {
  try {
    // 例：Tone.Sampler を使ってサンプラーを作成
    // ※ 実際のアプリケーションでは、複数のサンプラーを管理する仕組みにすることが望ましい
    const sampler1 = new Tone.Sampler({
      urls: { C4: PIANO_SAMPLER_1.url },
      // オプションなど
    }).toDestination();

    const sampler2 = new Tone.Sampler({
      urls: { C4: PIANO_SAMPLER_2.url },
      // オプションなど
    }).toDestination();

    console.log("Samplers have been initialized.");
    // 【アップデート候補】
    // - サンプラーごとにエフェクトの適用や音量調整を追加

  } catch (error) {
    console.error("Error during instrument setup:", error);
    throw error;
  }
}
```

---

### ８．dictToneUi.js

```javascript
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
```

---



# 今後追加予定のモジュール候補（まとめ）

## dictToneScoreEditor.js  
**説明**: 楽譜データの編集機能を実現するためのモジュール  
```JavaScript
// dictToneScoreEditor.js
// ※ 将来的に楽譜の編集（ノート追加・削除、移調、コピー＆ペーストなど）を実装する
/**
 * アップデート候補
 * - editNote(noteId, newProperties): 指定ノートの編集
 * - addNote(partId, noteData): 新しいノートの追加
 * - deleteNote(noteId): ノートの削除
 * - validateScore(scoreData): 楽譜データの検証
 * - saveScore(scoreData): 楽譜データの保存処理
 */
```

## dictToneMixer.js  
**説明**: 各パートの音量、BPM、移調、エフェクトなどのパラメータ管理を行うミキサー的モジュール  
```JavaScript
// dictToneMixer.js
// ※ 各パートごとの再生パラメータ（音量、BPM、移調、エフェクトなど）の管理と制御を実装する
/**
 * アップデート候補
 * - setVolume(partId, volume): 指定パートの音量設定
 * - setBPM(newBPM): 全体のBPM変更
 * - setTranspose(partId, interval): 指定パートの移調
 * - applyEffect(partId, effectOptions): エフェクト適用
 */
```

---
