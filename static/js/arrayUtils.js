// arrayUtils.js

/**
 * 配列から指定した条件に合致する要素を検索する
 * @param {Array} array - 検索対象の配列
 * @param {Function} predicate - 判定関数 (例: (item) => item.id === 3)
 * @returns {*} - 条件に合致した最初の要素（見つからなければ undefined）
 */
export function findElement(array, predicate) {
    return array.find(predicate);
}

/**
 * 配列から指定した値を削除し、新しい配列を返す
 * @param {Array} array - 元の配列
 * @param {Function} predicate - 削除条件を判定する関数
 * @returns {Array} - 指定した要素を削除した新しい配列
 */
export function removeElement(array, predicate) {
    return array.filter(item => !predicate(item));
}

/**
 * 指定した位置に要素を挿入し、新しい配列を返す
 * @param {Array} array - 元の配列
 * @param {*} element - 挿入する要素
 * @param {number} index - 挿入位置
 * @returns {Array} - 新しい配列
 */
export function insertElement(array, element, index) {
    return [...array.slice(0, index), element, ...array.slice(index)];
}

/**
 * 指定した条件に一致する要素のみを残した新しい配列を作成する
 * @param {Array} array - 元の配列
 * @param {Function} predicate - 残す要素を判定する関数
 * @returns {Array} - フィルタリング後の新しい配列
 */
export function filterArray(array, predicate) {
    return array.filter(predicate);
}

/**
 * 配列を指定した比較関数でソートした新しい配列を作成する
 * @param {Array} array - 元の配列
 * @param {Function} compareFunction - ソート用の比較関数
 * @returns {Array} - ソート後の新しい配列
 */
export function sortArray(array, compareFunction) {
    return [...array].sort(compareFunction);
}

/**
 * 配列のすべての要素に関数を適用し、新しい配列を作成する
 * @param {Array} array - 元の配列
 * @param {Function} transformFunction - 変換関数
 * @returns {Array} - 変換後の新しい配列
 */
export function mapArray(array, transformFunction) {
    return array.map(transformFunction);
}

/**
 * 配列を反転させた新しい配列を作成する（元の配列は変更しない）
 * @param {Array} array - 元の配列
 * @returns {Array} - 反転後の新しい配列
 */
export function reverseArray(array) {
    return [...array].reverse();
}

/**
 * 配列の重複を削除して、新しい配列を返す
 * @param {Array} array - 元の配列
 * @returns {Array} - 重複を削除した配列
 */
export function uniqueArray(array) {
    return [...new Set(array)];
}

/**
 * 配列の要素をランダムにシャッフル（Fisher-Yatesアルゴリズム）
 * @param {Array} array - 元の配列
 * @returns {Array} - シャッフルされた新しい配列
 */
export function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * 配列を指定したサイズごとに分割（エラーハンドリング追加）
 * @param {Array} array - 元の配列
 * @param {number} size - 各チャンクのサイズ（0以上である必要あり）
 * @returns {Array[]} - 分割された配列
 * @throws {Error} - サイズが0以下の場合
 */
export function chunkArray(array, size) {
    if (size <= 0) {
        throw new Error('Size must be greater than 0');
    }
    let result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

/**
 * ネストされた配列を1次元にフラット化する
 * @param {Array} array - 元の配列
 * @returns {Array} - フラット化された配列
 */
export function flattenArray(array) {
    return array.flat(Infinity);
}

/**
 * 指定したキーごとにオブジェクト配列をグループ化する
 * @param {Array} array - 元の配列
 * @param {string} key - グループ化のキー
 * @returns {Object} - グループ化されたオブジェクト
 */
export function groupBy(array, key) {
    return array.reduce((acc, obj) => {
        const group = obj[key];
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(obj);
        return acc;
    }, {});
}

/**
 * 配列を結合して新しい配列を作成する
 * @param {Array} arr1 - 結合する配列1
 * @param {Array} arr2 - 結合する配列2
 * @returns {Array} - 結合された新しい配列
 */
export function concatArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

/**
 * 配列の指定範囲の要素を取得する
 * @param {Array} array - 元の配列
 * @param {number} start - 開始インデックス
 * @param {number} end - 終了インデックス（含まない）
 * @returns {Array} - 指定範囲の要素を含む新しい配列
 */
export function sliceArray(array, start, end) {
    return array.slice(start, end);
}
