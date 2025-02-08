/* 
TODO:
DictationUIControllerクラスをつくる
*/
import {
    scoreMeta,
    scoreParts01,
    scoreParts02,
    scorePartsExam
} from '/dev/simpleDictation/data.js'; // または '/dev/simpleDictation/data.js' でもOK

import {
    DataStore,
    DictationMetaDataStore,
    DictationScoreDataStore,
    InstrumentDataStore,
    ToneJsPlayer,
    SingleDictationPlayer,
    MultiDictationPlayer,
    DictationUIController,
    defaultSampler
} from '/dev/simpleDictation/simpleDictation.js';

document.addEventListener('DOMContentLoaded', function () {
    // ==================================================
    // 初期設定とTODOリスト
    // ==================================================
    /*
     
    */


    // ==================================================
    // 関数
    // ==================================================
    /* 
    function camelCaseToHyphen(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    function hyphenToCamelCase(str) {
        return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    }

    function getElementsByIds(ids, useCamelCase = false) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        const elements = {};

        ids.forEach(id => {
            const targetId = useCamelCase ? camelCaseToHyphen(id) : id; // キャメルケースをハイフン区切りに変換
            const element = document.getElementById(targetId);

            if (element) {
                elements[id] = element; // 元のキャメルケースのIDをキーとして格納
            } else {
                console.error(`Element with ID '${targetId}' not found.`);
            }
        });

        return ids.length === 1 ? elements[ids[0]] : elements;
    } */
    /*    
    // 使用例
    const elements = getElementsByIds(['myElementId', 'anotherElementId'], true); // キャメルケースのIDを指定
    console.log(elements.myElementId); // 対応する要素を取得
    console.log(elements.anotherElementId); // 対応する要素を取得

    const singleElement = getElementsByIds('myElementId', true); // 単一の要素を取得
    console.log(singleElement); // 対応する要素を取得

    const hyphenElements = getElementsByIds(['my-element-id', 'another-element-id']); // ハイフン区切りのIDを指定
    console.log(hyphenElements['my-element-id']); // 対応する要素を取得
    console.log(hyphenElements['another-element-id']); // 対応する要素を取得
    */




    // ステータスバーのテキストを更新する
    function updateStatus(message, message2 = "") { // message2は省略可能
        statusText.textContent = message + message2;
    }
    // 例：テンポを変更した場合
    // const currentBpm = 120;
    // updateStatus(statusMessages.BPM_CHANGING, currentBpm);
    // 例：楽器を変更した場合（追加情報なし）
    // updateStatus(statusMessages.INSTRUMENT_CHANGING);

    // スタートボタンと停止ボタンの不活性トグル
    function togglePlayButtons(isStartButton) {
        startBtn.classList.toggle("disabled", !isStartButton);
        stopBtn.classList.toggle("disabled", isStartButton);
    }

    // 準備完了したか確認
    async function checkMultiPlayerReady() {
        try {
            await multiPlayer.isReady();
            console.log("checkMultiPlayerReady true");
            updateStatus(statusMessages.READY);
        } catch (error) {
            console.log("checkMultiPlayerReady false");
            updateStatus(statusMessages.PREPARING);
            setTimeout(checkMultiPlayerReady, 1000);
        }
    }

    function setScore(score) {
        if (score) {
            multiPlayer.setScore(score);
            console.log(" スコアを更新しました:", scoreSelect.value);
            togglePlayButtons(true); // スコアが正常に設定されたら、ボタンを活性化
        } else {
            console.error("⚠️ スコアデータが不完全です:", score);
            togglePlayButtons(false); // スコア設定に失敗したら、ボタンを不活性化（必要に応じて）
            updateStatus(constants.statusMessages.ERROR + " スコアデータの読み込みに失敗しました。"); // エラーメッセージをステータスバーに表示
        }
    }

    // ==================================================
    // 定数とUI要素の取得
    // ==================================================


    // ==================================================
    // インスタンス
    const dataStore = new DataStore();
    const metaDataStore = new DictationMetaDataStore();
    // const toneJsPlayer = new ToneJsPlayer();
    const dictationScoreDataStore = new DictationScoreDataStore();
    const singleDictationPlayer = new SingleDictationPlayer();

    const uIController = new DictationUIController();

    // ==================================================
    // 楽器データストア（InstrumentDataStore）の生成とサンプラーの登録
    const instrumentStore = new InstrumentDataStore();
    instrumentStore.add("piano", defaultSampler);

    // 楽譜メタデータ・楽譜データの登録
    const scoreMetaStore = new DictationMetaDataStore();
    const scoreStore = new DictationScoreDataStore();
    scoreMetaStore.add("scoreMeta", scoreMeta);
    scoreStore.add("bar-range-1-8", {
        "meta": scoreMetaStore.get("scoreMeta"),
        "parts": scoreParts01.parts
    });
    scoreStore.add("bar-range-1-4", {
        "meta": scoreMetaStore.get("scoreMeta"),
        "parts": scoreParts02.parts
    });
    scoreStore.add("exam", {
        "meta": scoreMetaStore.get("scoreMeta"),
        "parts": scorePartsExam.parts
    });

    // MultiDictationPlayer の生成とプレイヤーの追加
    const multiPlayer = new MultiDictationPlayer();
    const sopranoPlayer = new SingleDictationPlayer();  // 例：ソプラノ用プレイヤー
    const bassPlayer = new SingleDictationPlayer();      // 例：バス用プレイヤー

    // プレイヤーの追加（addPlayer メソッドは MultiDictationPlayer に実装してください）
    multiPlayer.addPlayer(sopranoPlayer);
    multiPlayer.addPlayer(bassPlayer);

    // 楽譜を初期化
    const initialScore = scoreStore.getScore(scoreSelect.value);
    setScore(initialScore);

    // 準備完了したか確認
    checkMultiPlayerReady();


    // DictationUIController の生成と連携
    const ids = [
        'score-select',
        'start-btn',
        'stop-btn',
        'status-text'
    ];
    const uiController = new DictationUIController(multiPlayer, scoreStore, ids, true); // useCamelCase を true に設定

});