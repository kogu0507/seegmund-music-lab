// event-listener-1.js
// イベントリスナーの設定（調号一覧／調号クイズ，調号一覧で使用するもの）

import constants from './constants.js';
import createElements from './elements.js';
import state from './state.js';
import functions from './functions.js';


const eventListener1 = {
    initialize: function (elements) { // 初期化処理を関数にまとめる

        //調号一覧 ラジオボタン
        elements.chartRadio.addEventListener('change', function () {
            // 調号一覧を開く
            functions.toggleElements(
                elements.mainContents,
                [elements.signatureChartSection]
            );
            functions.changeLanguage(state.currentLanguage);  // 言語：日本語
            functions.toggleTable(state.isVerticalTable);     // 表：縦長の表
        });

        // 調号クイズ ラジオボタン
        elements.quizRadio.addEventListener('change', function () {
            functions.toggleElements(
                elements.mainContents,
                [elements.signatureQuizSection]
            );
            functions.handleQuizTypeChange(constants.QUIZ_TYPE_A);  // クイズタイプ：A
        });

        // 日本語 ラジオボタン
        elements.japaneseRadio.addEventListener('change', function () {
            functions.handleLanguageChange(constants.LANGUAGE_JAPAN);
        });

        // 英語 ラジオボタン
        elements.englishRadio.addEventListener('change', function () {
            functions.handleLanguageChange(constants.LANGUAGE_ENGLISH);
        });

        // ドイツ語 ラジオボタン
        elements.germanRadio.addEventListener('change', function () {
            functions.handleLanguageChange(constants.LANGUAGE_GERMAN);
        });

        // 縦長の表 ラジオボタン
        elements.verticalTableRadio.addEventListener('change', function () {
            state.isVerticalTable = true;
            functions.toggleTable(state.isVerticalTable);
        });

        // 横長の表 ラジオボタン
        elements.horizontalTableRadio.addEventListener('change', function () {
            state.isVerticalTable = false;
            functions.toggleTable(state.isVerticalTable);
        });

        // ポイントを表示 ラジオボタン
        elements.showPointsRadio.addEventListener('change', () => {
            state.isPoints = true;
            functions.togglePoints(state.isPoints);
        });

        // ポイントを非表示 ラジオボタン
        elements.hidePointsRadio.addEventListener('change', () => {
            state.isPoints = false;
            functions.togglePoints(state.isPoints);
        });

        
        
        
        // 調号クイズ
        elements.aQuizTypeSelectRadio.addEventListener('change', function () {
            functions.handleQuizTypeChange(constants.QUIZ_TYPE_A);
        });
        elements.bQuizTypeSelectRadio.addEventListener('change', function () {
            functions.handleQuizTypeChange(constants.QUIZ_TYPE_B);
        });

    }
};

export default eventListener1; 