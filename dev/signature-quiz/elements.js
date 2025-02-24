// elements.js
import DomUtils from '/dev/modules/DomUtils.js';

function createElements() {
    try {
        const elements = DomUtils.getElementsByCamelCase([
            // getElementsByCamelCaseを使ってキャメルケースのIDで要素を取得
            //"",
            // 設定セクション
            "settings",
            "chart-radio", "quiz-radio",

            "main-contents",
            "signature-chart-section",
            // ラジオボタン群
            "japanese-radio", "english-radio", "german-radio",
            "horizontal-table-radio", "vertical-table-radio",
            "show-points-radio", "hide-points-radio",
            // 日本語
            'japanese-signature-chart-section',
            "japanese-vertical-table",
            "japanese-horizontal-table",
            // 英語
            'english-signature-chart-section',
            "english-vertical-table",
            "english-horizontal-table",
            // ドイツ語
            'german-signature-chart-section',
            "german-vertical-table",
            "german-horizontal-table",

            //クイズセクション
            "signature-quiz-section",
            "a-quiz-type-select-radio",
            "b-quiz-type-select-radio",
            "a-quiz-type-section",
            "b-quiz-type-section",
            "clone-section",
            "a-type-quest-clone",
            "b-type-quest-clone"
        ]);
        return elements;
    } catch (error) {
        console.error("要素の取得に失敗しました:", error);
        return null; // または適切なエラー処理
    }
}

export default createElements;