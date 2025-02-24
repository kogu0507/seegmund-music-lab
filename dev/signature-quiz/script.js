// script.js


import constants from './constants.js';
import createElements from './elements.js';
import state from './state.js';
import functions from './functions.js';
import eventListener1 from './event-listener-1.js';
import eventListener2 from './event-listener-2.js';

document.addEventListener('DOMContentLoaded', function () {
  /* 
  window.scrollTo(0, 0);
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth' // スムーズスクロール
  }); */
  const elements = createElements();
  console.log(elements);
  eventListener1.initialize(elements);
  eventListener2.initialize(elements);

  // テンプレートから問題を作成
  functions.initializeKeySignatureQuestions();

  // 表示／非表示の初期化
  // TODO: 調号一覧を表示／クイズを非表示
  // 調号一覧を開く
  /* 
    functions.toggleElements(
      elements.mainContents,
      [elements.signatureChartSection]
    );
    functions.changeLanguage(state.currentLanguage);  // 言語：日本語
    functions.toggleTable(state.isVerticalTable);     // 表：縦長の表
  
   */







  // TODO:初期化の方法を指針版に。初期化関数？不要か。
  // 初期表示の設定 (日本語の縦長テーブル)
  elements.chartRadio.checked = true; // 初期状態で「調号一覧」ラジオボタンを選択
  elements.japaneseRadio.checked = true; // 初期状態で「日本語」ラジオボタンを選択
  elements.verticalTableRadio.checked = true; // 初期状態で「縦長の表」ラジオボタンを選択
  functions.toggleElements(elements.signatureChartSection, [elements.japaneseSignatureChartSection]);
  functions.toggleElements(elements.japaneseSignatureChartSection, [elements.japaneseVerticalTable]);
});
