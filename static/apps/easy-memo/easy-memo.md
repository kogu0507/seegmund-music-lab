
## ディレクトリ構造

以下のように、ディレクトリにファイルを作りました。
```
/static/apps/easy-memo/easy-memo.css
/static/apps/easy-memo/easy-memo.js
```


## 実際に仕様する再のHTML

easy-memo-components.mdを参照


## コンポーネント案

### easy-memo-modal.html
```html
<!-- /static/apps/easy-memo/easy-memo-modal.html -->
    <!-- 簡易メモ帳 モーダル -->
    <div class="modal fade" id="easy-memo-modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">簡易メモ帳</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- タブナビゲーション -->
                    <ul class="nav nav-tabs" id="memoTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="input-tab" data-bs-toggle="tab" data-bs-target="#input"
                                type="button" role="tab">入力</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="preview-tab" data-bs-toggle="tab" data-bs-target="#preview"
                                type="button" role="tab">プレビュー</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="guide-tab" data-bs-toggle="tab" data-bs-target="#guide"
                                type="button" role="tab">使い方</button>
                        </li>
                    </ul>

                    <!-- タブコンテンツ -->
                    <div class="tab-content mt-3" id="memoTabContent">
                        <!-- 入力タブ -->
                        <div class="tab-pane fade show active" id="input" role="tabpanel">
                            <textarea class="easy-memo-modal-input form-control text-start" rows="5"
                                placeholder="メモを入力してください"></textarea>
                            <div class="text-end mt-2">
                                <small class="memo-char-count text-muted">0 / 50,000 文字</small>
                            </div>

                        </div>

                        <!-- プレビュータブ -->
                        <div class="tab-pane fade" id="preview" role="tabpanel">
                            <div class="easy-memo-modal-preview border p-3 bg-light text-start"></div>
                            <div class="text-end mt-2">
                                <small class="memo-char-count text-muted">0 / 50,000 文字</small>
                            </div>

                        </div>

                        <!-- 使い方タブ -->
                        <div class="tab-pane fade" id="guide" role="tabpanel">
                            <div class="p-3">
                                <h6>簡易メモ帳の使い方</h6>
                                <p>1. 「入力」タブでメモを入力してください。</p>
                                <p>2. 「プレビュー」タブでメモの見た目を確認できます。</p>
                                <p>3. メモは自動で保存されます。</p>
                                <p>4. 「メモをコピー」ボタンでメモをクリップボードにコピーできます。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-danger easy-memo-delete">メモを削除</button>
                    <button class="btn btn-primary easy-memo-copy">メモをコピー</button>
                </div>

            </div>
        </div>
    </div>
```
### **✅ 動作確認用 HTML**
このHTMLを使えば、`easy-memo.js` の全機能をテストできます。  
すべてのボタン、入力、プレビュー機能が正常に動作するか確認してください。

---

## **✅ テスト用 HTML**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簡易メモ帳 - テストページ</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

    <!-- カスタムCSS -->
    <link rel="stylesheet" href="/static/apps/easy-memo/easy-memo.css">
</head>
<body>
    <!-- フロートボタン -->
    <button class="btn btn-primary rounded-circle floating-button" data-bs-toggle="collapse" data-bs-target="#easyMemoContainer" aria-expanded="false">
        <i class="bi bi-pencil"></i>
    </button>

    <!-- 簡易メモ帳を開くボタン -->
    <button class="btn btn-primary open-memo-button" data-bs-toggle="collapse" data-bs-target="#easyMemoContainer" aria-expanded="false">
        <i class="bi bi-pencil"></i> 簡易メモ帳
    </button>

    <!-- 横スライドでメモ帳を表示 -->
    <div class="collapse collapse-horizontal" id="easyMemoContainer">
        <div class="card card-body">
            <h5>簡易メモ</h5>
            <textarea id="easyMemoTextarea" class="form-control" rows="5" placeholder="メモを入力..."></textarea>
            <div class="text-end mt-2">
                <small class="memo-char-count text-muted">0 / 50000 文字</small>
            </div>
            <div class="mt-2 d-flex justify-content-between">
                <button class="btn btn-sm btn-danger easy-memo-clear">削除</button>
                <button class="btn btn-sm btn-primary easy-memo-copy">メモをコピー</button>
                <button class="btn btn-sm btn-success easy-memo-save">保存</button>
            </div>
        </div>
    </div>

    <!-- プレビューエリア -->
    <div class="previewarea container my-4 p-3 border bg-white">
        <div class="preview-title">簡易メモ帳 プレビュー</div>  
        <div class="preview-content"></div>
        <div class="text-end mt-2">
            <small class="memo-char-count text-muted">0 / 50000 文字</small>
        </div>
        <button class="btn btn-sm btn-primary mt-2 open-memo-button" data-bs-toggle="collapse" data-bs-target="#easyMemoContainer" aria-expanded="false">
            メモを編集
        </button>
        <button class="btn btn-sm btn-primary mt-2 easy-memo-copy">メモをコピー</button>
    </div>

    <!-- Bootstrap & JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.10/purify.min.js"></script>
    <script type="module" src="/static/apps/easy-memo/easy-memo.js"></script>
</body>
</html>
```
