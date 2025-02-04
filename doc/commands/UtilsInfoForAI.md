### **📂 `/doc/UtilsInfoForAI_Short.md`**  
📌 **このドキュメントは、プロジェクトで使用するユーティリティ関数の概要を簡潔にまとめたものです。**  
**AI にコーディングを依頼するときは、このファイルを渡せば OK！**  

---

## **📌 1. 配列操作ユーティリティ (`arrayUtils.js`)**
**概要:**  
配列操作を便利にするユーティリティモジュール。  
**元の配列を変更せず、新しい配列を返す純粋関数を提供。**  

### **🔹 提供される関数**
- `findElement(array, predicate)`: 条件に合致する最初の要素を取得
- `removeElement(array, predicate)`: 条件に合致する要素を削除
- `insertElement(array, element, index)`: 指定位置に要素を挿入
- `filterArray(array, predicate)`: 条件に合致する要素のみを残す
- `sortArray(array, compareFunction)`: 比較関数でソート
- `mapArray(array, transformFunction)`: 各要素を変換
- `reverseArray(array)`: 配列を反転
- `uniqueArray(array)`: 配列の重複を削除
- `shuffleArray(array)`: 配列をシャッフル
- `chunkArray(array, size)`: 指定サイズごとに分割
- `flattenArray(array)`: ネストされた配列を1次元に展開
- `groupBy(array, key)`: 指定キーでグループ化
- `concatArrays(arr1, arr2)`: 配列を結合
- `sliceArray(array, start, end)`: 配列の一部を取得

### **🛠 使い方**
```javascript
import { findElement, sortArray } from './arrayUtils.js';

// 配列から要素を検索
console.log(findElement([1, 2, 3, 4, 5], num => num === 3)); // 3

// 配列を降順にソート
console.log(sortArray([5, 1, 3, 2, 4], (a, b) => b - a)); // [5, 4, 3, 2, 1]
```

---

## **📌 2. バリデーションユーティリティ (`validation.js`)**
**概要:**  
データのバリデーション（型チェック・値チェック）を行うモジュール。  
**元の配列を変更せず、新しい配列を返す純粋関数を提供。**  

### **🔹 提供される関数**
- `isRequired(value)`: 値が必須かチェック
- `isOfType(value, type)`: 型を厳密にチェック (`"number"`, `"string"`, `"array"`, etc.)
- `isMin(value, min)`: 数値が `min` 以上かチェック
- `isMax(value, max)`: 数値が `max` 以下かチェック
- `matchPattern(value, pattern)`: 正規表現パターンに一致するか
- `hasMinLength(value, minLength)`: 文字列の最小長をチェック
- `isArray(value)`: 配列かどうか
- `isBoolean(value)`: 真偽値かどうか
- `isDate(value)`: 有効な日付オブジェクトか
- `validateSchema(data, schema, options)`: スキーマバリデーションを実行

### **🛠 使い方**
```javascript
import { isRequired, isOfType, validateSchema } from './validation.js';

console.log(isRequired("")); // false
console.log(isOfType([], "array")); // true

const schema = {
    name: { type: 'string', required: true, minLength: 3 },
    age: { type: 'number', min: 0, max: 150 }
};

const data = { name: "John", age: 30 };
console.log(validateSchema(data, schema)); // { isValid: true, errors: [] }
```

---

## **📌 3. 追加予定のユーティリティ**
| カテゴリ | ファイル名 | 追加予定の関数 |
|----|----|----|
| 数学系 | `mathUtils.js` | `clamp(value, min, max)`, `randomInt(min, max)` |
| 文字列操作 | `stringUtils.js` | `capitalize(str)`, `truncate(str, length)` |
| 日付操作 | `dateUtils.js` | `formatDate(date, format)`, `getTimeDifference(date1, date2)` |

---








---
## **🎯 AI に伝える用（ショート版 + 最小限の例付き）**
### **プロジェクトのユーティリティ関数**
- `arrayUtils.js`: 配列操作ユーティリティ（すべて純粋関数）  
- `validation.js`: バリデーションユーティリティ（すべて純粋関数）  

---
### **配列操作 (`arrayUtils.js`)**
- `findElement(array, predicate)`: 条件に合致する最初の要素を取得
- `removeElement(array, predicate)`: 条件に合致する要素を削除
- `insertElement(array, element, index)`: 指定位置に要素を挿入
- `filterArray(array, predicate)`: 条件に合致する要素のみを残す
- `sortArray(array, compareFunction)`: 比較関数でソート
- `mapArray(array, transformFunction)`: 各要素を変換
- `reverseArray(array)`: 配列を反転
- `uniqueArray(array)`: 配列の重複を削除
- `shuffleArray(array)`: 配列をシャッフル
- `chunkArray(array, size)`: 指定サイズごとに分割
- `flattenArray(array)`: ネストされた配列を1次元に展開
- `groupBy(array, key)`: 指定キーでグループ化
- `concatArrays(arr1, arr2)`: 配列を結合
- `sliceArray(array, start, end)`: 配列の一部を取得

#### **🛠 最小限の例**
```javascript
import { findElement, sortArray, mapArray } from './arrayUtils.js';

// 配列の中から条件に合う最初の要素を取得
console.log(findElement([1, 2, 3, 4, 5], num => num === 3)); // 3

// 配列を降順にソート
console.log(sortArray([5, 1, 3, 2, 4], (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 各要素を2倍に変換
console.log(mapArray([1, 2, 3], num => num * 2)); // [2, 4, 6]
```

---
### **バリデーション (`validation.js`)**
- `isRequired(value)`: 値が必須かチェック
- `isOfType(value, type)`: 型を厳密にチェック (`"number"`, `"string"`, `"array"`, etc.)
- `isMin(value, min)`: 数値が `min` 以上かチェック
- `isMax(value, max)`: 数値が `max` 以下かチェック
- `matchPattern(value, pattern)`: 正規表現パターンに一致するか
- `hasMinLength(value, minLength)`: 文字列の最小長をチェック
- `isArray(value)`: 配列かどうか
- `isBoolean(value)`: 真偽値かどうか
- `isDate(value)`: 有効な日付オブジェクトか
- `validateSchema(data, schema, options)`: スキーマバリデーションを実行

#### **🛠 最小限の例**
```javascript
import { isRequired, validateSchema } from './validation.js';

// 値が必須かチェック
console.log(isRequired("")); // true
console.log(isRequired("Hello")); // false

// スキーマバリデーションの実行
const schema = {
    name: { type: 'string', required: true, minLength: 3 },
    age: { type: 'number', min: 0, max: 150 }
};

const validData = { name: "John", age: 30 };
console.log(validateSchema(validData, schema)); 
// { isValid: true, errors: [] }

const invalidData = { name: "J", age: -5 };
console.log(validateSchema(invalidData, schema)); 
// { isValid: false, errors: [...] }
```

---
## **📌 最小限の例を入れる理由**
- AI が **関数の使い方を正しく理解しやすくなる**
- **必要最小限** の例（**3つずつ**）で負担を減らす
- **代表的なユースケース** を示すことで、より正確にコードを生成しやすくする

