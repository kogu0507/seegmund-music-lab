// script.js

import ToneDictation from './ToneDictation.mjs';

const scoreDataUrl = './scoreData.js'; // scoreData.js の URL 
const elements = {
    playRadios: document.querySelectorAll('.play-radio'),
    stopButtons: document.querySelectorAll('.stop-button'),
    // 他の HTML 要素...
};

//console.log(`playRadios: `, elements.playRadios);
//console.log(`stopButtons: `, elements.stopButtons);

const player = new ToneDictation.Player(scoreDataUrl);
const ui = new ToneDictation.Ui(elements);

//console.log(ToneDictation.EVENTS.AUDIO_CONTEXT.INITIALIZE);

// ============================================================
// イベントリスナー
// ============================================================
// ユーザーの最初のクリックがあったら初期化
const startDictation = document.getElementById('start-dictation-button');
startDictation.addEventListener('click', () => {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
        console.log(`Tone.context.resume();`);
    }
    const startDiv = document.getElementById('start-dictation-div');
    const contentDiv = document.getElementById('dictation-content');
    if (startDiv && contentDiv) {
        startDiv.classList.add('d-none');
        contentDiv.classList.remove('d-none');
        document.dispatchEvent(new CustomEvent(ToneDictation.EVENTS.AUDIO_CONTEXT.INITIALIZE));
        console.log(`dispatchEvent: `, ToneDictation.EVENTS.AUDIO_CONTEXT.INITIALIZE, `\n AudioContextを初期化します`);
    } else {
        console.error('start-dictation-div/dictation-contentが見つかりませんでした。');
    }
});
// ------------------------------------------------------------
// ラジオボタンが押されたら再生
elements.playRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        const playSection = event.target.value;
        console.log(`playRadios event.target.value: `, event.target.value);
        if (ToneDictation.EVENTS && ToneDictation.EVENTS.PLAYBACK && ToneDictation.EVENTS.PLAYBACK.START) {
            const customEvent = new CustomEvent(ToneDictation.EVENTS.PLAYBACK.START, {
                detail: { section: playSection }
            });
            document.dispatchEvent(customEvent);
            console.log(`dispatchEvent: `, ToneDictation.EVENTS.PLAYBACK.START, customEvent.detail,  `\n プレイバックを開始します`);
        } else {
            console.error('ToneDictation.EVENTS.PLAYBACK.START が定義されていません。');
        }
    });
});
// ------------------------------------------------------------
// ストップボタンが押されたらストップ
elements.stopButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        console.log(`stopButtons`, event.target); // クリックされたボタンを出力
        const customEvent = new CustomEvent(ToneDictation.EVENTS.PLAYBACK.STOP);
        document.dispatchEvent(customEvent);
    });
});
// ------------------------------------------------------------
// ヒントボタンが押された
document.getElementById(`show-hint-button`).addEventListener('click', () => {
    document.getElementById(`hint-display`).classList.remove('d-none');
});

// ------------------------------------------------------------
// 解答ボタンが押された
document.getElementById(`show-answer-button`).addEventListener('click', () => {
    document.getElementById(`answer-display`).classList.remove('d-none');
});