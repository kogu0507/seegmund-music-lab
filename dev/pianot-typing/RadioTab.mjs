// RadioTab.mjs

/**
 * RadioTabクラス：ラジオボタンに連動して詳細表示を切り替える汎用モジュール
 */
export class RadioTab extends EventTarget {
    /**
     * コンストラクタ
     * @param {object} options - オプション
     * @param {NodeList} options.radioElements - ラジオボタンの要素（NodeList）
     * @param {NodeList} options.detailElements - 詳細表示用の要素（NodeList）
     * @param {HTMLElement} [options.initialSelectedRadio] - 初期選択されたラジオボタンの要素（省略可）
     * @param {string} [options.detailAttribute='detail-target'] - 詳細要素を関連付けるための属性名（デフォルト：'detail-target'）
     * @param {string} [options.hiddenClassName='d-none'] - 隠しクラス名（デフォルト：'d-none'）
     * @param {string} [options.event='change'] - イベント名（デフォルト：'change'）
     */
    constructor(options) {
        super(); // EventTargetのコンストラクタを呼び出す
        this.radioElements = options.radioElements;
        this.detailElements = options.detailElements;
        this.initialSelectedRadio = options.initialSelectedRadio;
        this.detailAttribute = options.detailAttribute || 'detail-target';
        this.hiddenClassName = options.hiddenClassName || 'd-none';
        this.event = options.event || 'change';

        this.init();
    }

    /**
     * 初期化処理：イベントリスナーの設定と初期状態の表示
     */
    init() {
        this.radioElements.forEach((radio) => {
            radio.addEventListener(this.event, (event) => {
                const detailTarget = radio.dataset[this.detailAttribute];
                if (detailTarget) {
                    this.updateDetails(detailTarget);
                    // イベントを発行
                    this.dispatchEvent(new CustomEvent('radioTabChanged', {
                        detail: {
                            selectedRadio: radio,
                            selectedValue: radio.value,
                            detailTarget: detailTarget,
                            event: event,
                        }
                    }));
                } else {
                    console.error(`data-${this.detailAttribute}属性が設定されていません`);
                }
            });
        });

        if (this.initialSelectedRadio) {
            const initialDetailTarget = this.initialSelectedRadio.dataset[this.detailAttribute];
            if (initialDetailTarget) {
                this.updateDetails(initialDetailTarget);
            } else {
                console.error(`初期選択されたラジオボタンにdata-${this.detailAttribute}属性が設定されていません`);
            }
        }
    }

    /**
     * 指定されたdetailTargetに対応する詳細のみ表示し、他は隠します
     * @param {string} detailTarget - 表示する詳細要素のターゲット名
     */
    updateDetails(detailTarget) {
        this.detailElements.forEach((detail) => {
            this.setHidden(detail, true);
        });

        const selectedDetail = document.querySelector(`[data-detail-name="${detailTarget}"]`);

        if (selectedDetail) {
            this.setHidden(selectedDetail, false);
        } else {
            console.error(`指定された詳細要素が存在しません: ${detailTarget}`);
        }
    }

    /**
     * 要素の表示／非表示を切り替えます
     * @param {HTMLElement} element - 対象の要素
     * @param {boolean} hidden - trueで非表示、falseで表示
     */
    setHidden(element, hidden) {
        if (hidden) {
            element.classList.add(this.hiddenClassName);
        } else {
            element.classList.remove(this.hiddenClassName);
        }
    }
}


/* 

// script.js (一部抜粋)
import { RadioTab } from './RadioTab.mjs';
// ...

document.addEventListener('DOMContentLoaded', function () {
    // ...

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

    // radioTabChanged イベントを購読
    radioTab.addEventListener('radioTabChanged', (event) => {
        console.log("script.js: radioTabChanged event received", event.detail);
        // 選択されたラジオボタンの値に応じて、他の処理を実行する
        // 例：
        // if (event.detail.selectedValue === 'game-mode-1') {
        //     // ゲームモード1の処理
        // }
    });

    // ...
});


*/