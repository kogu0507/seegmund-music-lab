document.addEventListener("DOMContentLoaded", () => {
    const memoTextarea = document.getElementById("easyMemoTextarea");
    const memoContainer = document.getElementById("easyMemoContainer");
    const toggleButtons = document.querySelectorAll(".open-memo-button, .floating-button");
    const previewArea = document.querySelector(".preview-content");
    const saveButton = document.querySelector(".easy-memo-save");
    const clearButton = document.querySelector(".easy-memo-clear");
    const copyButton = document.querySelector(".easy-memo-copy");
    const charCountElement = document.querySelector(".memo-char-count");
    const alertBox = document.getElementById("memoAlert"); // ✅ 通知用のバー

    // ✅ メモの最大文字数（50,000 文字まで）
    const MAX_MEMO_LENGTH = 50000;

    // ✅ 初回ロード時にローカルストレージからメモを復元
    const savedMemo = localStorage.getItem("easyMemo") || "";
    memoTextarea.value = savedMemo;
    updatePreview(savedMemo);
    updateCharCount(savedMemo);

    // ✅ メモの開閉トグル
    function toggleMemo() {
        memoContainer.classList.toggle("open");
    }

    // ✅ すべての開閉ボタンにイベントを設定
    toggleButtons.forEach(button => {
        button.addEventListener("click", toggleMemo);
    });

    // ✅ ESCキーで閉じる
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && memoContainer.classList.contains("open")) {
            toggleMemo();
        }
    });
    
    // ✅ メモを保存
    function saveMemo() {
        const content = memoTextarea.value;

        if (content.length > MAX_MEMO_LENGTH) {
            showAlert(`⚠️ メモが長すぎます！最大 ${MAX_MEMO_LENGTH} 文字までです。`, "danger");
            return;
        }

        const sanitizedContent = DOMPurify.sanitize(content); // XSS対策
        localStorage.setItem("easyMemo", sanitizedContent);
        showAlert("✅ メモを保存しました！", "success");
    }

    saveButton.addEventListener("click", saveMemo);

    // ✅ メモを削除（確認メッセージ付き）
    clearButton.addEventListener("click", () => {
        if (confirm("削除します。この操作は戻せません。削除しますか？")) {
            memoTextarea.value = "";
            localStorage.removeItem("easyMemo");
            updatePreview("");
            updateCharCount("");
            showAlert("🗑️ メモを削除しました！", "warning");
        }
    });

    // ✅ メモをコピー（クリップボードにコピー）
    copyButton.addEventListener("click", () => {
        if (!memoTextarea.value) {
            showAlert("⚠️ コピーするメモがありません。", "warning");
            return;
        }

        navigator.clipboard.writeText(memoTextarea.value)
            .then(() => {
                showAlert("📋 メモをコピーしました！", "info");
            })
            .catch((err) => {
                console.error("コピーに失敗しました:", err);
                showAlert("⚠️ コピーに失敗しました。", "danger");
            });
    });

    // ✅ 文字数カウンターを更新
    function updateCharCount(content) {
        const charCount = content.length;
        const warningThreshold = Math.floor(MAX_MEMO_LENGTH * 0.9);

        if (charCount >= MAX_MEMO_LENGTH) {
            charCountElement.textContent = `⚠️ ${charCount} / ${MAX_MEMO_LENGTH} 文字 - 上限を超えています！`;
            charCountElement.classList.remove("text-muted");
            charCountElement.classList.add("text-danger");
        } else if (charCount >= warningThreshold) {
            charCountElement.textContent = `⚠️ ${charCount} / ${MAX_MEMO_LENGTH} 文字 - 上限が近づいています！`;
            charCountElement.classList.remove("text-muted");
            charCountElement.classList.add("text-danger");
        } else {
            charCountElement.textContent = `${charCount} / ${MAX_MEMO_LENGTH} 文字`;
            charCountElement.classList.remove("text-danger");
            charCountElement.classList.add("text-muted");
        }
    }

    // ✅ プレビュー更新関数（Markdown簡易変換 & XSS対策）
    function updatePreview(content) {
        const sanitizedContent = DOMPurify.sanitize(content);
        previewArea.innerHTML = sanitizedContent.replace(/\n/g, "<br>");
    }

    // ✅ 自動保存 & プレビュー更新
    let saveTimer;
    memoTextarea.addEventListener("input", () => {
        updateCharCount(memoTextarea.value);
        updatePreview(memoTextarea.value);

        clearTimeout(saveTimer);
        saveTimer = setTimeout(saveMemo, 1000);
    });

    // ✅ Bootstrap のアラートを表示（画面上部に通知）
    function showAlert(message, type) {
        if (!alertBox) return; // 🔹 alertBox が null の場合、エラーを防ぐ
    
        // 🔥 既存のアラートがある場合は削除
        alertBox.innerHTML = "";
    
        // ✅ Bootstrap のアラートHTMLを生成
        const alertElement = document.createElement("div");
        alertElement.className = `alert alert-${type} alert-dismissible fade show`;
        alertElement.setAttribute("role", "alert");
        alertElement.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
    
        // 🔥 アラートを追加
        alertBox.appendChild(alertElement);
    
        // ⏳ 3秒後にアラートをフェードアウト＆削除
        setTimeout(() => {
            alertElement.classList.remove("show"); // Bootstrap の `fade` エフェクトを適用
            alertElement.classList.add("fade"); // アニメーションで消す
            setTimeout(() => alertElement.remove(), 500); // さらに0.5秒後に完全削除
        }, 3000);
    }
});


