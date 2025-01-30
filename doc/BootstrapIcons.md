# BootstrapIcons.js ドキュメント

## 1. 概要
`BootstrapIcons.js` は、[Bootstrap Icons](https://icons.getbootstrap.com/) を動的に生成・適用するためのユーティリティです。JavaScript を使って簡単にアイコンを作成し、サイズ・色・アニメーションなどのカスタマイズが可能です。

**主な機能：**
- **`getIcon()` 関数を使ってアイコンを簡単に取得**
- **サイズ・色・スピンアニメーションなどをオプションで指定可能**
- **キャッシュ機能を備え、パフォーマンスを向上**
- **未定義のアイコンが渡された場合、エラーログを出力**

---

## 2. 使い方
### **2.1 基本的な使用方法**

```js
import { getIcon } from './BootstrapIcons.js';

document.addEventListener("DOMContentLoaded", () => {
    const helpIcon = getIcon('question', { size: '1.5rem', color: 'blue' });
    if (helpIcon) {
        document.getElementById('help-icon').appendChild(helpIcon);
    }
});
```

### **2.2 スピンアニメーション付きのアイコン**

```js
const loadingIcon = getIcon('question', { size: '2rem', color: 'red', spin: true });
document.getElementById('loading-area').appendChild(loadingIcon);
```

---

## 3. オプション一覧

| オプション         | 型       | デフォルト値 | 説明 |
|----------------|--------|------------|------|
| `size`        | `string`  | `'1em'`    | アイコンのサイズ（例：`'1.5rem'`, `'20px'`）|
| `color`       | `string`  | `'inherit'`| アイコンの色（例：`'blue'`, `'#ff0000'`）|
| `additionalClass` | `string` | `''`       | 追加のCSSクラス |
| `spin`        | `boolean` | `false`    | スピンアニメーションを適用するか |
| `ariaLabel`   | `string`  | `''`       | スクリーンリーダー向けの説明 |
| `spacing`     | `string`  | `'0.25em'` | アイコンとテキストの間隔（例：`'0.5em'`, `'10px'`）|

---

## 4. `ICON_MAP` の管理方法

アイコンの一覧は `ICON_MAP` に定義されており、動的に適用されるアイコンのみを管理します。

### **4.1 `ICON_MAP` の確認**

```js
export const ICON_MAP = {
    question: "question-circle" // ヘルプアイコン
};
```

### **4.2 新しいアイコンを追加する**
新しいアイコンを追加する場合は、`ICON_MAP` にアイコン名を定義してください。

```js
export const ICON_MAP = {
    question: "question-circle",
    info: "info-circle" // ℹ️ 情報アイコンを追加
};
```

---

## 5. エラーハンドリング

### **5.1 存在しないアイコンを指定した場合**
未定義のアイコンを指定すると、エラーログを出力し、`null` を返します。

```js
const invalidIcon = getIcon('invalid-icon');
console.log(invalidIcon); // null
```

### **5.2 その他の異常値テスト**

```js
console.log(getIcon(null));  // 🚨 null が渡された場合
console.log(getIcon(''));    // 🚨 空文字列が渡された場合
console.log(getIcon('unknown-icon'));  // 🚨 ICON_MAP にないアイコンを指定
console.log(getIcon('question', { size: '3rem', color: 12345 })); // 🚨 color に不正な値
console.log(getIcon('question', { spacing: '100abc' })); // 🚨 spacing の不正値
```

---

## 6. よくある質問（FAQ）

### **Q1. Bootstrap Icons の `<i>` タグを直接書くのと何が違う？**
A. `<i>` タグを直接書く方法では、一度HTMLを書き換えないとアイコンを変更できません。`getIcon()` を使うことで、JS側で動的に管理できるため、変更が簡単になります。

### **Q2. `ICON_MAP` にすべてのアイコンを入れるべき？**
A. いいえ。`ICON_MAP` には、動的に使用するアイコンのみを登録し、静的なアイコンはHTMLに直接 `<i>` タグを書くのがベストプラクティスです。

### **Q3. `getIcon()` はどこで使うべき？**
A. **JSで動的に追加・変更する場合に使用** してください。静的なアイコンはHTMLに `<i class="bi bi-icon-name"></i>` を記述するのが推奨されます。

---

## 7. まとめ
`BootstrapIcons.js` は、Bootstrap Icons を簡単に管理できるユーティリティです。`getIcon()` を活用することで、JSで動的にアイコンを追加・変更でき、コードの可読性やメンテナンス性が向上します。

- **静的なアイコンは HTML に `<i>` タグを直書き**
- **動的に追加・変更する場合は `getIcon()` を使用**
- **キャッシュ機能を備え、パフォーマンス向上**
- **未定義のアイコンには適切なエラーハンドリングを実装**

このルールを守ることで、効率的に Bootstrap Icons を活用できます！ 🚀

