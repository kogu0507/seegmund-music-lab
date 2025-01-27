/**
 * [モジュール名].js
 * [このモジュールの概要説明]
 * 
 * @param {type} paramName - [パラメータの説明]
 * @returns {type} [返り値の説明]
 */

import { log } from './globalConfig.js'; // ログ関数をインポート（本番では無効）

export function exampleFunction(param) {
    log(`exampleFunction called with param:`, param);

    if (!param) {
        log("Error: param is required.");
        return null;
    }

    // 処理の実装
    const result = `Processed: ${param}`;
    
    log("exampleFunction result:", result);
    return result;
}
