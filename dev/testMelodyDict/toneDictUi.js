// toneDictUi.js
/* 
TODO: ストップボタンがきかない

    
 */

import { EVENTS } from './constants.js'; // 定数をインポート

let playRadios;
let stopButtons;
// ==============================
// initialize(script.jsで呼ぶ)
// ==============================
function initializeUi() {
    playRadios = document.querySelectorAll('.play-radio');
    stopButtons = document.querySelectorAll('.stop-button');

    // イベントリスナーの初期化
    initializeEventListener();

}

// ==============================
// イベントリスナー
// ==============================
// TODO: function 準備完了
function handlePlayEvent(event) {
    console.log("handlePlayEvent");
    const { startBar, endBar } = event.detail;
    // 再生中はストップボタンを活性化
    stopButtons.forEach(button => {
        enableButton(button);
    });

    // TODO: 今後のアップデートで演奏中の小節をハイライトなど
}

function handleStopEvent(event) {
    console.log("handleStopEvent");
    // 停止中はストップボタンを不活性化
    stopButtons.forEach(button => {
        disableButton(button);
    });

    // ラジオボタンの選択を解除
    if (playRadios && playRadios.length > 0) {
        playRadios.forEach(radio => {
            radio.checked = false;
        });
    }

}

function handlePlayTrialEvent(event) {
    const { startBar, endBar } = event.detail;
    //playTrial();
}
function initializeEventListener() {
    // TODO: 準備完了
    document.addEventListener(EVENTS.PLAY_1_8, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_1_4, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_5_8, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_1_2, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_3_4, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_5_6, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_7_8, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_1_1, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_2_2, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_3_3, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_4_4, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_5_5, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_6_6, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_7_7, handlePlayEvent);
    document.addEventListener(EVENTS.PLAY_8_8, handlePlayEvent);
    document.addEventListener(EVENTS.STOP, handleStopEvent);
    //document.addEventListener(EVENTS.TRIAL,    handlePlayEvent);

}


// ==============================
// モジュール内の関数
// ==============================

// UIの変更を行う処理（例えば、再生中のボタンをハイライトするなど）
function updateUIForPlayback(startBar, endBar) {
    const button = document.querySelector(`input[data-start-bar="${startBar}"][data-end-bar="${endBar}"]`);
    if (button) {
        button.checked = true;  // ボタンをチェック状態にする
        // 他のUI更新処理（例えば、ボタンをハイライトなど）
    }
}

function disableButton(button) {
    button.disabled = true;
    button.classList.add('disabled');
}

function enableButton(button) {
    button.disabled = false;
    button.classList.remove('disabled');
}

const toneDictUi = {
    initializeUi
}
export default toneDictUi;
