// script.js

/* 
    TODO:
    モジュール化
    
    その次
    ・UI系モジュール
    ・bellをインポート
    ・playChord をインポート

    順次読み込みテスト中
    import bell from './bell.js';
    import playChord from './playChord.js';


    */
/*  */
// script.js
import { EVENTS } from './constants.js'; // イベント定義をインポート
import toneDictUi from './toneDictUi.js';  // UI変更モジュール 
import toneDictPlayer from './toneDictPlayer.js';  // 再生モジュール
import { dispatchEventIfDefined } from './toneDictUtils.js'; // イベント発行ユーティリティをインポート

console.log("script.js: スクリプト開始");

document.addEventListener('DOMContentLoaded', function () {
    console.log("script.js: DOMContentLoadedイベント発生");
    const startDictationButton = document.getElementById('start-dictation-button');
    const dictationContent = document.getElementById('dictation-content');
    const startDictationDiv = document.getElementById('start-dictation-div');
    
    // Tone.jsを遅延ロード
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/tone@14.8.49/Tone.min.js";
    script.type = "module";
    console.log("script.js: Tone.jsスクリプトをロード開始");
    script.onload = function () {
        console.log("script.js: Tone.jsスクリプトのロード完了");
        setupEventListeners(startDictationButton, dictationContent, startDictationDiv);
    };
});



// イベントリスナー設定
function setupEventListeners(startDictationButton, dictationContent, startDictationDiv) {
    console.log("script.js: setupEventListeners関数実行");
    // 'stop-button' クラスを持つすべてのボタンを取得
    const stopButtons = document.querySelectorAll('.stop-button');

    // 取得したすべてのボタンにイベントリスナーを追加
    stopButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log("script.js: STOPイベントを発行");
            dispatchEventIfDefined(EVENTS.STOP);
        });
    });

    // startDictationButton のイベントリスナーを追加
    startDictationButton.addEventListener('click', function () {
        console.log("script.js: startDictationButtonクリック");

        // Tone.start() をボタンクリック後に呼び出す
        Tone.start().then(() => {
            console.log("script.js: Tone.jsが開始");

            // モジュールの初期化を並列に処理
            Promise.all([
                toneDictPlayer.initializePlayer(),
                toneDictUi.initializeUi(),
                initializeRadioButtons()
            ]).then(() => {
                console.log("script.js: 初期化が正常に完了");
            }).catch((error) => {
                console.error("script.js: 初期化に失敗:", error);
            });

            // dictationの開始
            startDictation(dictationContent, startDictationDiv);
        }).catch(error => {
            console.error("script.js: Tone.jsの初期化に失敗:", error);
        });
    });
}

// ラジオボタンの初期化
// TODO: 試験再生の時は別の処理だったわ！
// initializeRadioButtons.js
function initializeRadioButtons() {
    console.log("script.js: initializeRadioButtons関数実行");
    const buttons = document.querySelectorAll('input[type="radio"][name="section"]');
    buttons.forEach(button => {
        button.addEventListener('change', function () {
            const startBar = parseInt(this.getAttribute('data-start-bar'), 10);
            const endBar = parseInt(this.getAttribute('data-end-bar'), 10);

            // イベント名を小文字でハイフン区切りにして生成 (EVENTSに合わせる)
            const eventName = `PLAY_${startBar}_${endBar}`;

            // EVENTS に存在するイベントか確認して発行
            if (EVENTS[eventName]) {
                console.log("script.js: イベントを発行", eventName);
                dispatchEventIfDefined(EVENTS[eventName], { startBar, endBar });
                console.log("eventName: ", EVENTS[eventName]);
            } else {
                console.error(`script.js: イベント ${eventName} は constants.js で定義されていません`);
            }
        });
    });
}



function startDictation(dictationContent, startDictationDiv) {
    console.log("script.js: startDictation関数実行");
    dictationContent.classList.remove('d-none');
    startDictationDiv.classList.add('d-none');
}