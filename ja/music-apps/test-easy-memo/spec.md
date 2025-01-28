### **📌 更新後の仕様書（XSS対策の適用確認済み）**

---

## **1. 概要**
本アプリは、ブラウザの `localStorage` を使用してメモを保存・読み込み・削除できるシンプルなメモ機能を提供する。データの長期保存は保証せず、一時的な学習メモとして利用することを目的とする。

---

## **2. 機能一覧**
✅ **メモの保存**
- `textarea` に入力されたメモを `localStorage` に保存。
- **一定時間（1秒）入力が停止すると自動保存**。
- `localStorage` に保存されたメモはページリロード後も復元される。
- **「メモをコピー」ボタンを追加し、メモの一括コピーが可能**。
- **プレビューエリア横にも「メモをコピー」ボタンを設置（`.easy-memo-copy` を使用）**。
- **文字数が制限（5MB相当）の 90% に達すると、警告メッセージを表示**。

✅ **メモの表示**
- **フッター、トップページ、章末のメモボタンには、`BootstrapIcons.js` を利用してアイコンを適用**。
- **「メモを編集」「メモをコピー」ボタンには、それぞれ鉛筆 (`pencil`) とクリップボード (`clipboard`) アイコンを適用**。
- **アイコンは `base.js` を通じて `prepend()` で追加され、HTMLに直接記述しない**。

✅ **モーダルの表示**
- `.open-memo-modal` クラスを持つボタンをクリックすると、モーダル `#easy-memo-modal` が表示される。
- `#open-memo-modal` は廃止し、**`.open-memo-modal` のみで制御**。

✅ **XSS対策**
- **すべての `innerHTML` の更新時に `DOMPurify.sanitize()` を適用**。
- **`localStorage.setItem()` に保存する前にも `DOMPurify.sanitize()` を適用済み。**
- **XSS攻撃テストの結果、悪意のあるスクリプトは適切に無害化されていることを確認。**
- **localStorage のデータを直接改ざんしない限り、XSSのリスクはなし。**

---

## **3. UI 要素**
✅ **フッター内の要素**
- `button.open-memo-modal`：簡易メモ帳ボタン（アイコンは `base.js` により適用）。
- `div#easy-memo-modal`：メモ編集用のモーダル。

✅ **トップページの要素**
- `div#preview-area`：スクロール可能なプレビューエリア。
- `button.open-memo-modal`：「メモを編集」ボタン（`pencil` アイコンが `base.js` により適用）。
- `button.easy-memo-copy`：「メモをコピー」ボタン（`clipboard` アイコンが `base.js` により適用）。

✅ **学習コンテンツ内の要素**
- `p.memo-instruction`：「簡易メモに要点をまとめてみよう」という文言。
- `button.open-memo-modal`：モーダルを開くボタン（`pencil` アイコンが `base.js` により適用）。

---

## **4. 実装技術**
- **Bootstrap Icons は `BootstrapIcons.js` により動的に適用され、HTMLには直接記述しない**
- 言語：JavaScript (Vanilla JS)
- データ保存：`localStorage`
- UI 表示制御：DOM 操作
- **XSS 対策：`DOMPurify` を使用し、すべての `innerHTML` 更新時と `localStorage.setItem()` に適用**
- スタイリング：BootStrap を使用

---

## **5. イベントと処理フロー**
| イベント | 処理内容 |
|----------|----------|
| `DOMContentLoaded` | `localStorage` からメモを読み込み、`textarea` に復元、`preview-area` に表示 |
| `click` (`.open-memo-modal`) | メモ入力用モーダルを開く |
| `input` (`textarea`) | 1秒待機後に `localStorage` へ自動保存 |
| `click` (`.easy-memo-delete`) | 削除前に確認ダイアログを表示し、削除を確定すると `localStorage` からも削除 |
| `click` (`.easy-memo-copy`) | メモを一括コピーしてクリップボードに保存 |
| **文字数が制限（5MB相当）の 90% に達すると、警告メッセージを表示** |  |
| **`base.js` により `BootstrapIcons.js` を通じて各ボタンにアイコンを適用** | |

---

## **6. その他の考慮点**
- **`localStorage` の容量制限（約 5MB）に対する警告メッセージを表示**（文字数の90%超えで通知）。
- 削除時の確認ダイアログを追加。
- **「取り消し」機能は今後の拡張に含めるが、現時点では実装しない。**
- **「メモをコピー」ボタンのフィードバックとして、ボタンのテキストと色を変更（数秒後に元に戻す）。**

---

## **📌 変更点**
✅ `#open-memo-modal` を完全に廃止し、`.open-memo-modal` のみで制御する仕様に統一。  
✅ `base.js` の `document.querySelectorAll(".open-memo-modal")` が問題なく動作することを確認済み。  
✅ **XSS対策の適用範囲を確認し、`localStorage.setItem()` にも `DOMPurify.sanitize()` を適用済みであることを確認。**  
✅ **XSS攻撃テストの結果、スクリプトの無害化が適切に動作していることを確認。**  
✅ **仕様書を「クラスのみ & XSS対策適用済み」に確定し、修正完了。** 🎉

---

## **📌 次のステップ**
🔜 **「Bootstrap Icons が適用されない問題」の調査へ！** 🚀