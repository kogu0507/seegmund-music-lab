// toneDictPlayer.js

import { EVENTS } from './constants.js'; // 定数をインポート
import scoreData from './scoreData.js';
import { PIANO_SAMPLER } from "./instruments.js";
import { dispatchEventIfDefined } from './toneDictUtils.js'; // イベント発行ユーティリティをインポート

const pianoSampler = new Tone.Sampler(PIANO_SAMPLER.samples, {
    baseUrl: PIANO_SAMPLER.baseUrl,
    onload: () => { // サンプラーのロード完了時に呼ばれるコールバック
        console.log("pianoSampler loaded.");
        const event = new CustomEvent(EVENTS.PIANO_SAMPLER_LOADED);
        document.dispatchEvent(event);
        // テスト用pianoSampler.triggerAttackRelease("C4", "4n");
    }
}).toDestination();

// ==============================
// initialize(script.jsで呼ぶ)
// ==============================
function initializePlayer() {


    console.log("Tone.js initialized");

    // Tone.js 初期化設定
    Tone.Transport.bpm.value = scoreData.bpm;
    Tone.Transport.timeSignature = scoreData.timeSignature;
    console.log("Tone.Transport.bpm.value: ", Tone.Transport.bpm.value);
    console.log("Tone.Transport.timeSignature: ", Tone.Transport.timeSignature);

    // イベントリスナーの初期化
    initializeEventListener();



}

// ==============================
// イベントリスナー
// ==============================
function handlePlayEvent(event) {
    console.log(`Playing from bar ${event.detail.startBar} to bar ${event.detail.endBar}`);
    const { startBar, endBar } = event.detail;
    playPart(startBar, endBar);
}

function handleStopEvent(event) {
    Tone.Transport.stop(); // Tone.js の Transport を停止
}

function handlePlayTrialEvent(event) {
    const { startBar, endBar } = event.detail;
    // TODO: playTrial();
}

function initializeEventListener() {
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

// 音符を再生する関数
function playPart(startBar, endBar) {
    const selectedNotes = scoreData.notes.part1[`bar${startBar}to${endBar}`];
    const now = Tone.now();
    let startTime = now;

    const endTime = calculateEndTime(selectedNotes, startTime);
    playNotes(selectedNotes, startTime);

    Tone.Transport.scheduleOnce((time) => {
        Tone.Transport.stop(time); 
        dispatchEventIfDefined(EVENTS.STOP);
        console.log("自動停止しました");
    }, endTime);

    Tone.Transport.start(); // 再生を開始
}

function playNotes(notes, startTime) {
    notes.forEach(note => {
        if (note.note) {
            pianoSampler.triggerAttackRelease(note.note, note.duration, startTime, note.velocity);
        }
        startTime += Tone.Time(note.duration).toSeconds();
    });
}


// 再生範囲の終了時刻を計算する関数（calculateEndTimeも別途エクスポートする場合）
export function calculateEndTime(notes, startTime) {
    let endTime = startTime; // 開始時刻を設定

    notes.forEach(note => {
        startTime += Tone.Time(note.duration).toSeconds();
        endTime = Math.max(endTime, startTime); // 最後の音符の終了時刻を更新
    });

    return endTime;
}



const toneDictPlayer = {
    initializePlayer,
    pianoSampler
}
export default toneDictPlayer;
