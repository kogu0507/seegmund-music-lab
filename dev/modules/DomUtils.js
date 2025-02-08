// DomUtils.js
/* 
import DomUtils from '/dev/modules/DomUtils.js';
// getElementsByCamelCaseを使ってキャメルケースのIDで要素を取得
const elements = DomUtils.getElementsByCamelCase(['score-select', 'start-btn', 'stop-btn']);

 */
class DomUtils {

    static camelCaseToHyphen(str) { // static メソッド
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    static hyphenToCamelCase(str) { // static メソッド
        return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    }

    /**
     * IDに基づいて要素を取得する。
     * @param {string|Array<string>} ids 取得する要素のID。単数または複数のIDを指定できる。
     * @returns {HTMLElement|object} IDに対応する要素。単数のIDが指定された場合はHTMLElement、複数のIDが指定された場合はIDをキー、要素を値とするオブジェクトを返す。
     * @throws {Error} 要素が見つからない場合にエラーをスローする。
     */
    static getElementsByIds(ids) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        const elements = {};

        for (const id of ids) {
            const element = document.getElementById(id); // IDをそのまま取得

            if (element) {
                elements[id] = element;
            } else {
                throw new Error(`Element with ID '${id}' not found.`); // 例外をスロー
            }
        }

        return ids.length === 1 ? elements[ids[0]] : elements;
    }

    // 要素が存在するか確認するメソッド
    static elementExists(element) {
        return element !== null;
    }

    static checkElementsExistence(elements) {
        const checkedElements = {};
        for (const id in elements) {
            if (DomUtils.elementExists(elements[id])) { // elementExists を呼び出す
                checkedElements[id] = elements[id];
            } else {
                throw new Error(`Element with ID '${id}' not found.`); // 例外をスロー
            }
        }
        return checkedElements;
    }

    static convertCamelCaseAll(elements) {
        const convertedElements = {};
        for (const id in elements) {
            const camelCaseId = DomUtils.hyphenToCamelCase(id);
            convertedElements[camelCaseId] = elements[id];
        }
        return convertedElements;
    }
    
    /**
        * キャメルケースのIDで要素を取得する。
        * @param {string|Array<string>} ids 取得する要素のID。単数または複数のIDを指定できる。
        * @returns {HTMLElement|object} キャメルケースのIDに対応する要素。
        */
    static getElementsByCamelCase(ids) {
        /* this.を使うということは、インスタンスが必要 */
        const originalElements = DomUtils.getElementsByIds(ids); // 元の要素
        const checkedElements = DomUtils.checkElementsExistence(originalElements); // 存在チェック済みの要素
        const camelCaseElements = DomUtils.convertCamelCaseAll(checkedElements); // キャメルケース変換済みの要素
        return camelCaseElements; // キャメルケース変換済みの要素を返す
    }
}

export default DomUtils;