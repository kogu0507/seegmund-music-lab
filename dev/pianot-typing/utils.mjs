// utils.mjs

/**
 * 指定されたセレクターに一致する最初の DOM 要素を取得します。
 * @param {string} selector - CSS セレクター
 * @returns {HTMLElement|null} - 該当する DOM 要素または null
 */
export function getElement(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.error("getElement error:", error); // エラーログを出力
        return null; // エラー発生時はnullを返す
    }
}


/**
 * 指定されたセレクターに一致するすべての DOM 要素を取得します。
 * @param {string} selector - CSS セレクター
 * @returns {NodeListOf<HTMLElement>} - 該当する DOM 要素の配列または空の配列
 */
export function getElements(selector) {
    return document.querySelectorAll(selector);
}

/**
 * 指定されたセレクターに一致する DOM 要素の値を取得します。
 * @param {string} selector - CSS セレクター
 * @returns {string|null} - 該当する DOM 要素の値または null
 */
export function getElementValue(selector) {
    const element = getElement(selector);
    return element ? element.value : null;
}

/**
 * 指定されたセレクターに一致する DOM 要素の data- 属性の値を取得します。
 * @param {string} selector - CSS セレクター
 * @param {string} dataKey - data- 属性のキー
 * @returns {string|null} - 該当する DOM 要素の data- 属性の値または null
 */
export function getElementData(selector, dataKey) {
    const element = getElement(selector);
    if (element && element.dataset && element.dataset.hasOwnProperty(dataKey)) {
        return element.dataset[dataKey];
    } else {
        return null;
    }
}


/**
 * 指定されたname属性を持つラジオボタンの中で、チェックされているラジオボタンの値を取得します。
 * @param {string} name - ラジオボタンのname属性
 * @returns {string|null} - チェックされているラジオボタンの値。チェックされていない場合はnull
 */
export function getCheckedRadioValue(name) {
    const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return checkedRadio ? checkedRadio.value : null;
}

/**
 * 指定されたセレクターに一致する要素の表示/非表示を切り替えます。
 * @param {object} options - オプションオブジェクト
 * @param {string|string[]} [options.show] - 表示する要素のセレクターまたはセレクターの配列
 * @param {string|string[]} [options.hide] - 非表示にする要素のセレクターまたはセレクターの配列
 */
export function toggleElementVisibility(options) {
    const { show, hide } = options;

    // 表示する要素を表示
    if (show) {
        const selectorsToShow = Array.isArray(show) ? show : [show];
        selectorsToShow.forEach((selector) => {
            const element = getElement(selector);
            if (element) {
                element.classList.remove('d-none');
            }
        });
    }

    // 非表示にする要素を非表示
    if (hide) {
        const selectorsToHide = Array.isArray(hide) ? hide : [hide];
        selectorsToHide.forEach((selector) => {
            const element = getElement(selector);
            if (element) {
                element.classList.add('d-none');
            }
        });
    }
}

/**
 * 指定されたIDの配列に一致するすべての DOM 要素を取得します。
 * 存在しないIDの場合はnullを格納します。
 * @param {string[]} ids - IDの配列
 * @returns {object} - 該当する DOM 要素のオブジェクト
 */
export function getElementsByIds(ids) {
    const elements = {};
    ids.forEach(id => {
        elements[id] = document.getElementById(id) || null; // 存在しない場合はnullを返すように修正
    });
    return elements;
}

/**
 * 指定されたセレクターのオブジェクトに一致するすべての DOM 要素を取得します。
 * 存在しないセレクターの場合は空のNodeListを格納します。
 * @param {object} selectors - セレクターのオブジェクト
 * @returns {object} - 該当する DOM 要素のオブジェクト
 */
export function getElementsBySelectors(selectors) {
    const elements = {};
    for (const key in selectors) {
        elements[key] = document.querySelectorAll(selectors[key]) || document.createDocumentFragment(); // 存在しない場合は空のNodeListを返すように修正
    }
    return elements;
}
