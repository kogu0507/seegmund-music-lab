// script.js

// ==================================================
// インポート
// ==================================================
import {
    getElement,
    getElements,
    getElementValue,
    getElementData,
    getCheckedRadioValue,
    toggleElementVisibility,
    getElementsByIds,
    getElementsBySelectors
} from './utils.mjs';
import { RadioTab } from './RadioTab.mjs';
import {
    GAME_EVENTS,
    StorageManager,
    GameSettingsManager,
    GameTimeLimitTimer,
    GameManager
} from './GameCore.mjs';
import { GameDomManager } from './GameDomManager.mjs'; // GameDomManager をインポート
import { EventBus, GAME_EVENTS } from './EventBus.mjs'; // EventBus と GAME_EVENTS をインポート



// ==================================================
// メインスクリプト
// ==================================================
// DOMの読み込みが完了した後に初期化を実行
document.addEventListener('DOMContentLoaded', function () {
    // --------------------------------------------------
    // 要素取得・定数・変数など
    // --------------------------------------------------
    const elementsByIds = getElementsByIds([
        "opening-section",            // ゲーム開始前のオープニングセクション
        "game-mode-selecter",         // ゲームモード選択用のフィールドセット
        "game-mode-selecter-1",       // 音名モード選択ラジオボタン
        "game-mode-selecter-2",       // 譜読みモード選択ラジオボタン
        "game-mode-selecter-3",       // 聴音モード選択ラジオボタン
        "game-mode-details",          // ゲームモード詳細設定の親要素
        "game-mode-details-1",        // 音名モードの詳細設定セクション
        "langage-select-japanese-1",  // 音名モードの日本語設定ラジオボタン
        "langage-select-english-1",   // 音名モードの英語設定ラジオボタン
        "langage-select-german-1",    // 音名モードのドイツ語設定ラジオボタン
        "game-mode-details-2",        // 譜読みモードの詳細設定セクション
        "game-mode-details-3",        // 聴音モードの詳細設定セクション
        "game-section",               // ゲームプレイ中のセクション
        "game-status-section",        // ゲームステータス表示セクション
        "game-score-value",           // 現在のスコア表示要素
        "game-time-limit-bar",       // ゲームの残り時間を表示する要素
        "game-combo-value",           // 現在のコンボ数表示要素
        "game-question-displays",     // 問題表示の親要素
        "game-mode-1-question-display", // 音名モードの問題表示セクション
        "game-mode-2-question-display", // 譜読みモードの問題表示セクション
        "game-mode-3-question-display", // 聴音モードの問題表示セクション
        "ending-section",             // ゲーム終了後のエンディングセクション
        "ending-score-value",         // 最終スコア表示要素
        "ending-time-value",          // クリアタイム表示要素
        "ending-high-score",          // ハイスコア表示要素
        "replay-button",              // リプレイボタン
    ]);
    const elementsBySelectors = getElementsBySelectors({
        "startButton": ".start-button",
        "noteNameQuestionsSpans": ".note-name-questions-spans",
        "key": ".key",
        "resultSymbol": ".result-symbol", // 結果記号の要素を追加
    });
    // --------------------------------------------------
    // インスタンス（ユーティリティ）
    // --------------------------------------------------
    const eventBus = new EventBus();

    // --------------------------------------------------
    // インスタンス（オープニング関係）
    // --------------------------------------------------
    // ラジオボタンの要素を取得
    const radioElements = getElements('input[name="game-mode"]');
    // 詳細表示用の要素を取得
    const detailElements = getElements('[data-detail-name]');
    // チェックされているラジオボタンを取得。なければ最初のラジオボタンを初期選択とする
    const initialSelectedRadio = getElement('input[name="game-mode"]:checked') || radioElements[0];

    // RadioTabクラスのインスタンスを生成し、初期化を実行
    const radioTab = new RadioTab({
        radioElements: radioElements,
        detailElements: detailElements,
        initialSelectedRadio: initialSelectedRadio,
        detailAttribute: 'detail-target', // 詳細要素を関連付けるための属性名
        hiddenClassName: 'd-none', // 隠しクラス名
        event: 'change', // イベント名
    });


    // --------------------------------------------------
    // インスタンス（ゲーム関係）
    // --------------------------------------------------
    const storageManager = new StorageManager();
    const gameDomManager = new GameDomManager({ domElements: { ...elementsByIds, ...elementsBySelectors }, eventBus: eventBus }); // EventBus を渡す
    const gameTimeLimitTimer = new GameTimeLimitTimer({ gameDomManager: gameDomManager, eventBus: eventBus }); // EventBus を渡す
    const gameManager = new GameManager({
        gameDomManager: gameDomManager,
        storageManager: storageManager,
        gameTimeLimitTimer: gameTimeLimitTimer,
        eventBus: eventBus // EventBus を渡す
    });

    // --------------------------------------------------
    // イベントリスナー
    // --------------------------------------------------
    // radioTabChanged イベントを購読
    radioTab.addEventListener('radioTabChanged', (event) => {
        console.log("script.js: radioTabChanged event received", event.detail);
        // 選択されたラジオボタンの値に応じて、他の処理を実行する
        // 例：
        // if (event.detail.selectedValue === 'game-mode-1') {
        //     // ゲームモード1の処理
        // }
        // TODO: 選択されたゲームモードを GameSettingsManager に通知する処理を追加する。
        // TODO: GameManager にゲームモードが変更されたことを通知し、ゲームを再初期化する処理を追加する。
    });

    // スタートボタンが押された時
    const startButton = getElement(".start-button");
    startButton.addEventListener('click', () => {
        console.log("start button clicked");
        // スタートボタンクリックイベントを発行
        eventBus.publish(GAME_EVENTS.START_BUTTON_CLICKED); // EventBus を使ってイベントを発行
    });

    // 鍵盤に入力があった時
    const keys = getElements(".key");
    keys.forEach(key => {
        key.addEventListener('click', () => {
            console.log("key clicked", key.dataset.note);
            // 鍵盤クリックイベントを発行
            eventBus.publish(GAME_EVENTS.KEY_CLICKED, { note: key.dataset.note }); // EventBus を使ってイベントを発行
        });
    });

    // リプレイボタンが押された
    const replayButton = getElement("#replay-button");
    replayButton.addEventListener('click', () => {
        console.log("replay button clicked");
        // リプレイボタンクリックイベントを発行
        eventBus.publish(GAME_EVENTS.REPLAY_BUTTON_CLICKED); // EventBus を使ってイベントを発行
    });

    // 初期化完了イベントを発行
    eventBus.publish(GAME_EVENTS.GAME_INITIALIZED); // EventBus を使ってイベントを発行

    // TODO: GAME_EVENTS に定義されているイベント名を使用するように統一する。
    // TODO: GameManager がこれらのインスタンスを直接操作する必要があるのか、それともイベントを通じて間接的に操作する方が良いのか、検討する。
    // TODO: GameDomManager のイベントを購読して、処理を実行する必要があるのか、検討する。
    // TODO: エラー処理を追加する。
    // TODO: デバッグ機能を追加する。
    // TODO: テストコードを追加する。
});
