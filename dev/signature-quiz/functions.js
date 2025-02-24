// functions.js
import constants from './constants.js';
import state from './state.js';
import createElements from './elements.js';
const elements = createElements();

function toggleDisplay(element, isVisible) {
  if (isVisible) {
    element.classList.add('d-block');
    element.classList.remove('d-none');
  } else {
    element.classList.add('d-none');
    element.classList.remove('d-block');
  }
}

function toggleElements(parentElement, elementsToShow) {
  const targetElements = parentElement.querySelectorAll('.toggle-element');

  targetElements.forEach(element => {
    toggleDisplay(element, elementsToShow.includes(element));
  });
}

function changeLanguage(changeLanguage) {
  switch (changeLanguage) {
    case constants.LANGUAGE_JAPAN:
      toggleElements(
        elements.signatureChartSection,
        [elements.japaneseSignatureChartSection]
      );

      break;
    case constants.LANGUAGE_ENGLISH:
      toggleElements(
        elements.signatureChartSection,
        [elements.englishSignatureChartSection]
      );
      break;
    case constants.LANGUAGE_GERMAN:
      toggleElements(
        elements.signatureChartSection,
        [elements.germanSignatureChartSection]
      );
      break;
    default:
      console.log("言語が不明です。");
  }
  state.currentLanguage = changeLanguage;
}

// ラジオボタンの変更処理をまとめる関数
function handleLanguageChange(language) {
  changeLanguage(language);
  toggleTable(state.isVerticalTable);
  togglePoints(state.isPoints);
}

function toggleTable(isVerticalTable) {
  if (isVerticalTable) {
    toggleElements(elements.japaneseSignatureChartSection, [elements.japaneseVerticalTable]);
    toggleElements(elements.englishSignatureChartSection, [elements.englishVerticalTable]);
    toggleElements(elements.germanSignatureChartSection, [elements.germanVerticalTable]);
  } else {
    toggleElements(elements.japaneseSignatureChartSection, [elements.japaneseHorizontalTable]);
    toggleElements(elements.englishSignatureChartSection, [elements.englishHorizontalTable]);
    toggleElements(elements.germanSignatureChartSection, [elements.germanHorizontalTable]);
  }
}

function togglePoints(isPoints) {
  const pointsElements = document.querySelectorAll('.point-element');
  const displayValue = isPoints ? 'block' : 'none'; // 表示状態に応じて値を決定
  pointsElements.forEach(element => {
    element.style.display = displayValue;
  });
}

function handleQuizTypeChange(quizType) {
  switch (quizType) {
    case constants.QUIZ_TYPE_A:
      toggleElements( elements.signatureQuizSection, [elements.aQuizTypeSection] );
      toggleElements( elements.cloneSection,[elements.aTypeQuestClone] );
      break;
    case constants.QUIZ_TYPE_B:
      toggleElements( elements.signatureQuizSection, [elements.bQuizTypeSection] );
      toggleElements( elements.cloneSection,[elements.bTypeQuestClone]
      );
      break;
    default:
      console.log("クイズタイプが不明です。");
  }
  console.log("-----quizType: ",quizType);
  console.log("elements.aQuizTypeSection.classList: ",elements.aQuizTypeSection.classList);
  console.log("elements.bQuizTypeSection.classList: ",elements.bQuizTypeSection.classList);
}

//クイズ用
/*  function getData()
function getData(searchClassesArray, property) {
  let elements = document.querySelectorAll('.' + searchClassesArray.join('.'));
  let result = [];

  elements.forEach(element => {
    switch (property) {
      case 'textContent':
        result.push(element.textContent.trim());
        break;
      case 'data-key-signature':
        result.push(element.dataset.keySignature);
        break;
      // 他のプロパティもここに追加
      // switch文の中で、element.dataset[property.replace("data-", "")] を使用してデータ属性にアクセスするように変更することも可能です。
      default:
        // 該当するプロパティがない場合の処理（必要に応じて）
        console.warn(`Unknown property: ${property}`);
        break;
    }
  });

  return result;

}
 
    // 使用例
    // b7つの調は何調でしょうか？
    let keyNameJa = getData(["quiz-detabase", "japan", "b7"], "textContent"); // 日本語の正解配列を返す
    let keyNameEn = getData(["quiz-detabase", "english", "b7"], "textContent"); // 英語の正解配列を返す
    let keyNameDe = getData(["quiz-detabase", "german", "b7"], "textContent"); // ドイツ語の正解配列を返す
    console.log(keyNameJa); // ["Ces dur", "Ces-Dur"]
 
    // Ces-Durの調号は、[▼選択]である。
    // A. b7つ
    let keySignatureDe = getData(["quiz-detabase", "german"], "data-key-signature"); 
    console.log(keySignatureDe); // ["b7"]
*/


/* ===== 変更後のコード ===== */
// HTML上の問題データ（.a-type-quest-data）の情報を元に、
// ユーザー回答テンプレート（.user-answer-template）を複製して問題を生成します。

function initializeKeySignatureQuestions() {
  // 例として、data-quest-type="a-type" かつ data-lang="japan" の要素のみを対象にしています
  generateKeySignatureQuestionsFromData(
    '.a-type-quest-data',       // 問題データ要素のセレクタ
    '.a-type-user-answer-template',    // ユーザー回答テンプレートのセレクタ
    [{ questType: 'a-type', lang: 'japan' }], // フィルター条件
    '.a-type-quest-clone'
  );
  generateKeySignatureQuestionsFromData(
    '.b-type-quest-data',       // 問題データ要素のセレクタ
    '.b-type-user-answer-template',    // ユーザー回答テンプレートのセレクタ
    [{ questType: 'b-type', lang: 'japan' }], // フィルター条件
    '.b-type-quest-clone'
  );
  
}

// まず、配列をランダムにシャッフルするための関数を追加します
function shuffleArray(array) {
  // Fisher-Yatesアルゴリズムで配列をシャッフル
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateKeySignatureQuestionsFromData(dataSelector, templateSelector, filterArray,targetContainerSelector) {
  // dataSelector：問題データ要素 (.a-type-quest-data) を取得し、Arrayに変換
  const dataElements = Array.from(document.querySelectorAll(dataSelector));
  // ランダムな順番にシャッフルする
  shuffleArray(dataElements);
  let questionNumber = 1;

  dataElements.forEach(dataEl => {
    // フィルター処理（指定のデータ属性が一致しているかチェック）
    if (filterArray) {
      const shouldInclude = filterArray.some(filter => {
        return Object.keys(filter).every(key => {
          return dataEl.dataset[key] === filter[key];
        });
      });
      if (!shouldInclude) return; // 合致しない場合はスキップ
    }

    // テンプレートを複製して新たな問題要素を生成
    const template = document.querySelector(templateSelector);
    if (!template) {
      console.error('Template not found:', templateSelector);
      return;
    }

    const question = template.cloneNode(true);
    question.classList.remove('user-answer-template');
    question.classList.add('user-answer-template-clone');

    // 非表示用のクラスを解除して表示状態に
    //question.classList.remove('display-none');
    toggleDisplay(question,true);
    question.classList.add('generated-question');

    // data要素から問題文などの情報を取得し、反映する
    // ※data-quest-text属性が存在しなければ、要素内テキストを使用
    const questText = dataEl.dataset.questText || dataEl.textContent.trim();
    const questTextElem = question.querySelector('.quest-text');
    if (questTextElem) {
      questTextElem.textContent = questText;
    }

    // その他のデータ属性も反映
    question.dataset.questType = dataEl.dataset.questType;
    question.dataset.lang = dataEl.dataset.lang;
    question.dataset.questNumber = dataEl.dataset.questNumber;
    question.dataset.keyName = dataEl.dataset.keyName;
    question.dataset.answerId = dataEl.dataset.answerId;

    // ユニークなIDの設定（例: a-type-1-japan-c-flat-major）
    question.id = `${dataEl.dataset.questType}-${questionNumber}-${dataEl.dataset.lang}-${dataEl.dataset.keyName.replace(/\s+/g, '-').toLowerCase()}`;

    // スライダーの初期化
    const slider = question.querySelector('.key-signature-select-slider');
    const display = question.querySelector('.user-answer-display');
    const image = question.querySelector('.key-signature-image');
    if (slider) {
      const initialValue = parseInt(slider.value);
      updateKeySignatureDisplay(initialValue, display, image);
      slider.addEventListener('input', () => {
        const value = parseInt(slider.value);
        updateKeySignatureDisplay(value, display, image);
      });
    } else {
      console.error('.key-signature-select-slider element not found in question.');
    }

    // 追加先の要素を取得
    const targetElement = document.querySelector(targetContainerSelector);
    // 追加先の要素が存在する場合のみ追加
    if (targetElement) {
      targetElement.appendChild(question);
      // targetElementのdisplay-noneをリムーブ
      //targetElement.classList.remove('display-none');
      toggleDisplay(targetElement,true);
    } else {
      console.error(`${targetContainerSelector} 要素が見つかりません。`);
    }
    questionNumber++;
  });
}


function updateKeySignatureDisplay(value, display, image) {
  let displayText = '';
  let imageSrc = '';

  switch (value) {
    case -7:
      displayText = '♭7つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case -6:
      displayText = '♭6つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case -5:
      displayText = '♭5つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case -4:
      displayText = '♭4つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case -3:
      displayText = '♭3つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case -2:
      displayText = '♭2つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case -1:
      displayText = '♭1つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 0:
      displayText = '調号なし';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 1:
      displayText = '♯1つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 2:
      displayText = '♯2つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 3:
      displayText = '♯3つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 4:
      displayText = '♯4つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 5:
      displayText = '♯5つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 6:
      displayText = '♯6つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    case 7:
      displayText = '♯7つ';
      imageSrc = '/static/images/testSVG.svg';
      break;
    default:
      displayText = value.toString();
      imageSrc = '';
      break;
  }

  display.textContent = `選択された調号: ${displayText}`;
  image.src = imageSrc;
  image.alt = displayText ? `${displayText}の調号` : '調号';
}



export default {
  toggleDisplay,
  toggleElements,
  changeLanguage,
  handleLanguageChange,
  toggleTable,
  togglePoints,
  handleQuizTypeChange,

  // 問題をテンプレートからクローン
  initializeKeySignatureQuestions,
  shuffleArray,
  generateKeySignatureQuestionsFromData,
  updateKeySignatureDisplay
};