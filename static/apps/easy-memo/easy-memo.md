# Easy Memo - 簡易メモ帳

## 📌 必要な読み込みタグ
HTML の `<head>` に以下を追加してください：
```html
<!-- Bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

<!-- Easy Memo CSS & JS -->
<link rel="stylesheet" href="/static/apps/easy-memo/easy-memo.css">
<script type="module" src="/static/apps/easy-memo/easy-memo.js"></script>
```

---

## 🏠 Easy Memo の設置方法
以下の HTML をページ内に追加すると、メモ帳が利用できます。

```html
<!-- フロートボタン -->
<button class="btn btn-primary rounded-circle floating-button">
    <i class="bi bi-pencil"></i>
</button>

<!-- 簡易メモ帳を開くボタン -->
<button class="btn btn-primary open-memo-button">
    <i class="bi bi-pencil"></i> 簡易メモ帳
</button>

<!-- プレビューエリア -->
<div class="previewarea container my-4 p-3 border bg-white">
    <div class="preview-title fw-bold fs-5 mb-3">簡易メモ帳 プレビュー</div>
    <div class="preview-content"></div>
    <div class="text-end mt-2">
        <small class="memo-char-count text-muted"></small>
    </div>
    <button class="btn btn-sm btn-primary mt-2 open-memo-button">
        <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-sm btn-primary easy-memo-copy" title="コピー">
        <i class="bi bi-files"></i>
    </button>
</div>

<!-- スライドメモ帳 -->
<div id="easyMemoContainer" class="closed">
    <div class="card card-body">
        <div class="d-flex justify-content-between">
            <h5>簡易メモ帳</h5>
            <button class="btn btn-light" data-bs-toggle="tooltip" data-bs-placement="top"
                title="ページを閉じてもメモは残りますが、ブラウザの設定やローカルストレージのクリア によって削除されることがあります。">
                <i class="bi bi-question-circle"></i>
            </button>
        </div>
        <textarea id="easyMemoTextarea" class="form-control" rows="5" placeholder="メモを入力...（デバイスに自動保存）"></textarea>
        <div class="text-end mt-2">
            <small class="memo-char-count text-muted"></small>
        </div>
        <div class="mt-2 d-flex justify-content-between">
            <button class="btn btn-sm btn-danger easy-memo-clear" title="削除">
                <i class="bi bi-trash"></i>
            </button>
            <button class="btn btn-sm btn-primary easy-memo-copy" title="コピー">
                <i class="bi bi-files"></i>
            </button>

        </div>
    </div>
</div>

<!-- Bootstrap のアラートボックス -->
<div id="memoAlert" class="position-fixed top-0 start-50 translate-middle-x mt-3 z-3"></div>
```

---

## 📚 使い方
- **メモは自動保存されます！**
- **プレビューはリアルタイム更新**
- **「メモを編集」ボタンまたはフロートボタンでスライドを開く**
- **メモを削除すると元に戻せません**
- **コピーするとクリップボードにコピーされます（HTTPSのみ）**
- **スライド外をクリック or ESCキーでスライドを閉じる**

---

## ⚠ 制限事項
- **メモはローカルストレージ（ブラウザの保存領域）に保存**
  - **ブラウザの設定やキャッシュ削除で消える**
  - **異なるブラウザではメモは共有されない**
- **クリップボードコピー機能は HTTPS 環境でのみ動作**
- **最大 50,000 文字まで入力可能**
  - 90% を超えると警告が表示される

---

## 🎨 カスタマイズ方法
### 1️⃣ フロートボタンのデザインを変更
```css
.floating-button {
    background-color: red; /* 色を変更 */
    width: 70px; /* サイズを変更 */
}
```

### 2️⃣ スライドの位置を変更
```css
#easyMemoContainer {
    left: 0; /* 右からではなく左からスライドさせる */
}
```

---

## 🛠 よくある質問
### **Q1: メモが消えた！**
A1: **ブラウザのキャッシュを削除すると、ローカルストレージも消える可能性があります！**
A2: **別のデバイスや別のブラウザではデータが共有されません！**

### **Q2: コピー機能が動かない！**
A1: **HTTPS 環境でないとクリップボード API は動きません！**
A2: **`navigator.clipboard` が無効になっているかも（設定を確認）！**

---

🚀 **このドキュメントに沿って、Easy Memo を活用してください！** 🌟

