// script.js
import localStorageManager from './LocalStorageManager.mjs';
import settingsManager from './SettingsManager.mjs';
import {getElementsByIds, getElementsBySelectors, toggleElementVisibility } from './utils.mjs';

// LocalStorageManager.mjsの例
/*
// データの保存
const myData = { name: 'テスト', value: 123 };
localStorageManager.save('myData', myData);

// データの読み込み
const loadedData = localStorageManager.load('myData');
console.log('読み込まれたデータ:', loadedData);

// データの削除
// localStorageManager.remove('myData');

// localStorageのクリア
// localStorageManager.clear();
*/

// SettingsManager.mjsの例
/*
settingsManager.apply(); // 初期設定を適用

// 設定の取得
console.log('テーマ:', settingsManager.get('theme'));

// 設定の更新
settingsManager.update('theme', 'dark');

// 設定のリセット
// settingsManager.reset();
*/

// 変数
let score = 0; // スコア
let timeLimit = 60; // 制限時間（秒）
let currentQuestionIndex = 0; // 現在の問題のインデックス
let correctCount = 0; // 正解数
let incorrectCount = 0; // 不正解数
let gameMode = "game-mode1"; // ゲームモード（音名、譜読み、聴音）
let noteNameType = "japanese"; // 音名タイプ（日本、英語、ドイツ）
let isGameActive = false; // ゲームがアクティブかどうか
let startTime; // ゲーム開始時間
let endTime; // ゲーム終了時間
let timer; // タイマー
let audioContext; // AudioContext

let gameSettings = {
    gameMode: "game-mode1",
    noteNameType: "japanese",
};
/*
TODO:保留。 ローカルストレージは一通り完成してから最後にチェック
let highScore = localStorage.getItem("highScore") || 0; // 最高得点
let gameSettings = JSON.parse(localStorage.getItem("gameSettings")) || {
  gameMode: "game-mode1",
  noteNameType: "japanese",
}; // ゲーム設定
*/


// DOM要素
const elements = {
    ...getElementsByIds([
        // sections
        "opening-section",
        "game-section",
        "ending-section",

        "note-name-select",
        "start-button",
        "status",
        "score",
        "time-limit",
        "question-displays",
        "game-mode1-display",

        "score-value",
        "time-value",
        "replay-button",
    ]),
    ...getElementsBySelectors({
        ".note-name-questions-spans": ".note-name-questions-spans",
        ".key": ".key",
        ".result-symbol": ".result-symbol", // 結果記号の要素を追加
    }),
};

function handleStartButtonClick() {
    // 開始ボタンのクリックを処理する
    gameSettings.gameMode = document.querySelector(
        'input[name="question-type"]:checked'
    ).value;
    gameSettings.noteNameType = elements["note-name-select"].value;
    //localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    toggleElementVisibility(
        elements["game-section"],
        ["opening-section", "ending-section"]
    );

    startGame();
}

function startGame() {
    // ゲームを開始する
    isGameActive = true;
    score = 0;
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    startTime = Date.now();
    // updateScore();
    // updateTimeLimit();
    displayNoteNames();
    // startTimer();
    audioContext = new (window.AudioContext || window.webkitAudioContext)(); // AudioContextを初期化

    highlightCurrentNote();//最初の音にハイライトをつける
    resetResultSymbols(); // 結果記号をリセットする

}

function displayNoteNames() {
    // 音名を表示する
    const noteNames = generateNoteNames(gameSettings.noteNameType);
    elements[".note-name-questions-spans"].forEach((span, index) => {
        span.textContent = noteNames[index].noteName;
        span.dataset.note = noteNames[index].midiNumber; // data-note属性にMIDIノートナンバーを追加
        resetNoteHighlight(index); // ハイライトをリセット
    });
    resetResultSymbols(); // 結果記号をリセットする
}

function generateNoteNames(noteNameType) {
    // 音名を生成する
    const noteNames = [];
    const japaneseNoteNames = [
        { noteName: "ハ", midiNumber: 60 }, // C4
        { noteName: "ニ", midiNumber: 62 }, // D4
        { noteName: "ホ", midiNumber: 64 }, // E4
        { noteName: "ヘ", midiNumber: 65 }, // F4
        { noteName: "ト", midiNumber: 67 }, // G4
        { noteName: "イ", midiNumber: 69 }, // A4
        { noteName: "ロ", midiNumber: 71 }, // B4
    ];
    const englishNoteNames = [
        { noteName: "C", midiNumber: 60 }, // C4
        { noteName: "D", midiNumber: 62 }, // D4
        { noteName: "E", midiNumber: 64 }, // E4
        { noteName: "F", midiNumber: 65 }, // F4
        { noteName: "G", midiNumber: 67 }, // G4
        { noteName: "A", midiNumber: 69 }, // A4
        { noteName: "B", midiNumber: 71 }, // B4
    ];
    const germanNoteNames = [
        { noteName: "C", midiNumber: 60 }, // C4
        { noteName: "D", midiNumber: 62 }, // D4
        { noteName: "E", midiNumber: 64 }, // E4
        { noteName: "F", midiNumber: 65 }, // F4
        { noteName: "G", midiNumber: 67 }, // G4
        { noteName: "A", midiNumber: 69 }, // A4
        { noteName: "H", midiNumber: 71 }, // B4
    ];
    const noteNameMap = {
        japanese: japaneseNoteNames,
        english: englishNoteNames,
        german: germanNoteNames,
    };

    const selectedNoteNames = noteNameMap[noteNameType];
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * selectedNoteNames.length);
        noteNames.push(selectedNoteNames[randomIndex]);
    }
    return noteNames;
}

function checkAnswer(userAnswer) {
    //回答チェック
    const correctNote = parseInt(elements[".note-name-questions-spans"][currentQuestionIndex].dataset.note); // ユーザーの回答と正解を比較

    console.log(' userAnswer: ', userAnswer, '\n', 'correctNote: ', correctNote)

    // ユーザーの回答と正解を比較
    if (userAnswer === correctNote) {
        // 正解
        score += 10; // 例：10点加算
        correctCount++;
        highlightCorrectNote();
        showResultSymbol(currentQuestionIndex, "〇"); // 正解記号を表示
    } else {
        // 不正解
        incorrectCount++;
        highlightIncorrectNote();
        showResultSymbol(currentQuestionIndex, "✖"); // 不正解記号を表示
    }
    nextQuestion(); //次の問題を出す
}

function nextQuestion() {
    // 次の問題へ
    currentQuestionIndex++;

    // すべての問題が終了したか確認
    if (currentQuestionIndex < elements[".note-name-questions-spans"].length) {
        highlightCurrentNote();//次の音にハイライトをつける
    } else {
        console.log('all over')
    }
}

function showResultSymbol(index, symbol) {
    // 結果記号を表示する
    elements[".result-symbol"][index].textContent = symbol;
    elements[".result-symbol"][index].style.color = symbol === "〇" ? "green" : "red"; // 色を付ける
}

function resetResultSymbols() {
    // 結果記号をリセットする
    elements[".result-symbol"].forEach((symbolElement) => {
        symbolElement.textContent = "";
    });
}





function replayGame() {
    // ゲームをリプレイする
    toggleElementVisibility(
        elements["game-section"],
        ["opening-section", "ending-section"]
    );
    startGame();
}




// ==============================
// 出題のハイライト
// ==============================
function highlightCorrectNote() {
    // 正解した音名をハイライトする
    elements[".note-name-questions-spans"][currentQuestionIndex].style.color = "gray";
}

function highlightIncorrectNote() {
    // 不正解の音名をハイライトする
    elements[".note-name-questions-spans"][currentQuestionIndex].style.color = "red";
}

function highlightCurrentNote() {
    // 入力中の音名をハイライトする
    elements[".note-name-questions-spans"][currentQuestionIndex].style.color = "orange"; // 入力中はオレンジ色
    elements[".note-name-questions-spans"][currentQuestionIndex].style.fontWeight = "bold";// 太字にする
}

function resetNoteHighlight(index) {
    // 音名のハイライトをリセットする
    elements[".note-name-questions-spans"][index].style.color = "black"; // 元の色に戻す
    elements[".note-name-questions-spans"][index].style.fontWeight = "normal";// 太字をもとに戻す
}


// ==============================
// イベントハンドラ
// ==============================

function handleReplayButtonClick() {
    // リプレイボタンのクリックを処理する
    replayGame();
}


function handleNoteNameSelectChange() {
    // 音名タイプの選択変更を処理する
    noteNameType = elements["note-name-select"].value;
    displayNoteNames();
}

function handleKeyboardClick(event) {
    // 鍵盤のクリックを処理する
    const midiNoteNumber = parseInt(event.target.dataset.note); // データ属性は文字列なので数値に変換
    console.log('midiNoteNumber: ', midiNoteNumber)
    //playNote(midiNoteNumber);
    //const userAnswer = getMidiNoteNumber(midiNoteNumber);
    checkAnswer(midiNoteNumber);
}


// イベントリスナー
elements["start-button"].addEventListener("click", handleStartButtonClick);
elements["replay-button"].addEventListener("click", handleReplayButtonClick);
elements["note-name-select"].addEventListener("change", handleNoteNameSelectChange);
elements[".key"].forEach((key) => {
    key.addEventListener("click", handleKeyboardClick);
});


// ============================================================
// イニシャライズ
// ============================================================
function initialize() {
    // 初期化処理
    toggleElementVisibility(
        elements["opening-section"],
        ["game-section", "ending-section"]
    );
    // その他の初期化
}
initialize();

// ============================================================
// 設定とローカルストレージ関数（のちにモジュール化）
// ============================================================
class LocalStorageManager{} // メモはモジュールに
class SettingsManager{} // メモはモジュールに


// ============================================================
// class PianoTypingGameManager （のちにモジュール化）
// ============================================================
class PianoTypingGameManager{}


