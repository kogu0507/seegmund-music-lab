## ベース
```html
<!-- Bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Easy Memo スクリプト -->
<script type="module" src="/static/apps/easy-memo/easy-memo.js"></script>
```

---

## **コンポーネント（コピペ）**

### **フロートボタン**
✅ **スライド用の `data-bs-toggle="collapse"` を使用**  
✅ **Bootstrap Icons のペンマークを追加**  
```html
<button class="btn btn-primary rounded-circle floating-button" data-bs-toggle="collapse" data-bs-target="#easyMemoContainer" aria-expanded="false">
    <i class="bi bi-pencil"></i> <!-- ペンアイコン -->
</button>
```

---

### **簡易メモ帳を開くボタン**
✅ **スライド用の `data-bs-toggle="collapse"` を使用**
```html
<button class="btn btn-primary open-memo-button" data-bs-toggle="collapse" data-bs-target="#easyMemoContainer" aria-expanded="false">
    <i class="bi bi-pencil"></i> 簡易メモ帳
</button>
```

---

### **スライド**
✅ **モーダルではなくスライドに変更**  
✅ **`collapse collapse-horizontal` を使用し、横スライドで開く**  
✅ **`textarea` を追加（直接入力）**  
✅ **削除ボタン & 保存ボタンを追加**
```html
<div class="collapse collapse-horizontal" id="easyMemoContainer">
    <div class="card card-body">
        <h5>簡易メモ</h5>
        <textarea id="easyMemoTextarea" class="form-control" rows="5" placeholder="メモを入力..."></textarea>
        <div class="mt-2 d-flex justify-content-between">
            <button class="btn btn-sm btn-danger easy-memo-clear">削除</button>
            <button class="btn btn-sm btn-primary easy-memo-copy">メモをコピー</button>
            <button class="btn btn-sm btn-success easy-memo-save">保存</button>
        </div>
    </div>
</div>
```

---

### **プレビューエリア**
✅ **「メモを編集」ボタンがスライドを開くように修正**  
✅ **「メモをコピー」ボタンはそのまま**  
✅ **`data-bs-target="#easyMemoContainer"` に統一**
```html
<div class="previewarea container my-4 p-3 border bg-white">
    <div class="preview-title">簡易メモ帳</div>  
    <div class="preview-content"></div>
    <div class="text-end mt-2">
        <small class="memo-char-count text-muted"></small>
    </div>
    <button class="btn btn-sm btn-primary mt-2 open-memo-button" data-bs-toggle="collapse" data-bs-target="#easyMemoContainer" aria-expanded="false">
        メモを編集
    </button>
    <button class="btn btn-sm btn-primary mt-2 easy-memo-copy">メモをコピー</button>
</div>
```
