/**
 * バリデーションユーティリティ
 * 各関数は純粋関数（Pure Function）であり、元のデータを変更せずにチェックを行う。
 */
/**
 * 指定したキー文字列（ドット記法および配列記法をサポート）に基づいて、
 * データから値（または値の配列）を取得するヘルパー関数
 * 
 * @param {object} data - 検索対象のオブジェクト
 * @param {string} keyPath - 例："meta.title" や "parts[].notes"
 * @returns {Array} - 取得した値の配列。存在しない場合は空配列を返す。
 */
function getNestedValues(data, keyPath) {
    // まず、"[]" を含むかで判定
    if (keyPath.includes("[]")) {
      // 例："parts[].notes" → parts と notes に分割
      const [arrayKey, ...rest] = keyPath.split("[]");
      // arrayKey の末尾にドットがある場合は除去
      const cleanArrayKey = arrayKey.replace(/\.$/, "");
      // 残りのパス（先頭のドットを除去）
      const remainingPath = rest.join("[]").replace(/^\./, "");
      
      // data から対象の配列を取得
      const arrayData = data[cleanArrayKey];
      if (!Array.isArray(arrayData)) {
        return [];
      }
      // 配列内の各要素について、再帰的に値を取得する
      let results = [];
      arrayData.forEach(item => {
        if (remainingPath) {
          // 再帰的に呼び出し
          results = results.concat(getNestedValues(item, remainingPath));
        } else {
          results.push(item);
        }
      });
      return results;
    } else if (keyPath.includes(".")) {
      // ドットで分割してネストされた値を取得する
      const keys = keyPath.split(".");
      let currentValue = data;
      for (let key of keys) {
        if (currentValue == null || typeof currentValue !== "object") {
          return [];
        }
        currentValue = currentValue[key];
      }
      return currentValue === undefined ? [] : [currentValue];
    } else {
      // 単一のキーの場合
      const val = data[keyPath];
      return val === undefined ? [] : [val];
    }
  }
  
  /**
   * ネストしたプロパティ（ドット記法、配列記法対応）のバリデーションを行う関数
   * @param {Object} data - チェック対象のデータ
   * @param {Object} schema - バリデーションルール。キーに "meta.title" や "parts[].notes" などを利用可能。
   * @param {Object} [options={}] - バリデーションオプション
   * @returns {Object} - { isValid: boolean, errors: Array }
   */
  export const validateSchema = (data, schema, options = {}) => {
    const errors = [];
  
    // スキーマの各ルールについてチェック
    for (const schemaKey in schema) {
      const rules = schema[schemaKey];
      // getNestedValues() を用いて対象の値をすべて取得（配列の場合も含む）
      const values = getNestedValues(data, schemaKey);
  
      // 値が取得できなかった場合、undefined とみなす
      // ただし、対象が複数ある場合は、各要素に対してチェックする
      if (values.length === 0) {
        // required チェック
        if (rules.required) {
          errors.push({ key: schemaKey, message: rules.requiredMessage || `${schemaKey} is required.` });
        }
        // 他のチェックは値が存在しないのでスキップ
        continue;
      }
  
      // 取得した各値に対してルールを適用
      values.forEach((value) => {
        // 必須チェック（※空文字も対象）
        if (rules.required && isRequired(value)) {
          errors.push({ key: schemaKey, message: rules.requiredMessage || `${schemaKey} is required.` });
        }
  
        // 型チェック
        if (rules.isOfType && !isOfType(value, rules.isOfType)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should be of type ${rules.isOfType}.` });
        }
  
        // 配列チェック
        if (rules.isArray && !isArray(value)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should be an array.` });
        }
  
        // 真偽値チェック
        if (rules.isBoolean && !isBoolean(value)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should be a boolean.` });
        }
  
        // 日付チェック
        if (rules.isDate && !isDate(value)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should be a valid date.` });
        }
  
        // 最小値チェック
        if (rules.min !== undefined && isMin(value, rules.min)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should be greater than or equal to ${rules.min}.` });
        }
  
        // 最大値チェック
        if (rules.max !== undefined && isMax(value, rules.max)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should be less than or equal to ${rules.max}.` });
        }
  
        // 正規表現パターンチェック
        if (rules.pattern && matchPattern(value, rules.pattern)) {
          errors.push({ key: schemaKey, message: `${schemaKey} is not in the correct format.` });
        }
  
        // 文字列の最小長チェック
        if (rules.minLength !== undefined && hasMinLength(value, rules.minLength)) {
          errors.push({ key: schemaKey, message: `${schemaKey} should have at least ${rules.minLength} characters.` });
        }
  
        // カスタムバリデーション
        if (rules.customValidator && !customValidator(value, data, rules.customValidator)) {
          errors.push({ key: schemaKey, message: rules.customMessage || `${schemaKey} failed custom validation.` });
        }
  
        // 条件付きバリデーション（必要に応じて）
        if (rules.conditional) {
          const condition = rules.conditional;
          if (data[condition.field] !== undefined && !condition.validator(value, data)) {
            errors.push({ key: schemaKey, message: condition.message || `${schemaKey} failed conditional validation.` });
          }
        }
      });
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  /* 既存のバリデーション関数例（必要に応じてインポートしてください） */
  export const isRequired = (value) => value === undefined || value === null || value === '';
  export const isOfType = (value, type) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === type.toLowerCase();
  export const isMin = (value, min) => value < min;
  export const isMax = (value, max) => value > max;
  export const matchPattern = (value, pattern) => !pattern.test(value);
  export const hasMinLength = (value, minLength) => value.length < minLength;
  export const isArray = (value) => Array.isArray(value);
  export const isBoolean = (value) => typeof value === 'boolean';
  export const isDate = (value) => value instanceof Date && !isNaN(value.getTime());
  export const customValidator = (value, data, customFn) => customFn(value, data);
  