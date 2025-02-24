// dictToneElements.js
// DOM要素を一括取得し、キャッシュとして保持するモジュール

// 要素キャッシュ用オブジェクト
const elements = {
    /**
     * 指定されたIDリストのDOM要素を取得してキャッシュします。
     * 取得した要素は、ケバブケースのIDをキャメルケースに変換したキーで格納されます。
     *
     * @param  {...string} ids - 取得するDOM要素のIDリスト
     */
    getElementByIds: (...ids) => {
      ids.forEach(kebabCaseId => {
        // ケバブケース（例: score-select）をキャメルケース（例: scoreSelect）に変換
        const camelCaseId = kebabCaseId.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        const element = document.getElementById(kebabCaseId);
        if (!element) {
          console.error(`Element with id "${kebabCaseId}" not found.`);
        }
        elements[camelCaseId] = element;
      });
    }
  };
  
  export default elements;