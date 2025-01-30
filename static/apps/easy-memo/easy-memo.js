document.addEventListener("DOMContentLoaded", () => {
    const memoTextarea = document.getElementById("easyMemoTextarea");
    const previewArea = document.querySelector(".preview-content");
    const saveButton = document.querySelector(".easy-memo-save");
    const clearButton = document.querySelector(".easy-memo-clear");
    const copyButton = document.querySelector(".easy-memo-copy");
    const charCountElement = document.querySelector(".memo-char-count");

    // ✅ メモの最大文字数（50,000 文字まで）
    const MAX_MEMO_LENGTH = 50000;

    // ✅ 初回ロード時にローカルストレージからメモを復元
    const savedMemo = localStorage.getItem("easyMemo") || "";
    memoTextarea.value = savedMemo;
    updatePreview(savedMemo);
    updateCharCount(savedMemo);

    // ✅ メモを保存
    function saveMemo() {
        const content = memoTextarea.value;

        if (content.length > MAX_MEMO_LENGTH) {
            alert(`⚠️ メモが長すぎます！最大 ${MAX_MEMO_LENGTH} 文字までです。`);
            return;
        }

        const sanitizedContent = DOMPurify.sanitize(content); // XSS対策
        localStorage.setItem("easyMemo", sanitizedContent);
        alert("メモを保存しました！");
    }

    saveButton.addEventListener("click", saveMemo);

    // ✅ メモを削除（確認メッセージ付き）
    clearButton.addEventListener("click", () => {
        if (confirm("削除します。この操作は戻せません。削除しますか？")) {
            memoTextarea.value = "";
            localStorage.removeItem("easyMemo");
            updatePreview("");
            updateCharCount("");
            alert("メモを削除しました！");
        }
    });

    // ✅ メモをコピー（クリップボードにコピー）
    copyButton.addEventListener("click", () => {
        if (!memoTextarea.value) {
            alert("コピーするメモがありません。");
            return;
        }

        navigator.clipboard.writeText(memoTextarea.value)
            .then(() => {
                alert("メモをコピーしました！");
            })
            .catch((err) => {
                console.error("コピーに失敗しました:", err);
                alert("コピーに失敗しました。");
            });
    });

    // ✅ 文字数カウンターを更新
    function updateCharCount(content) {
        const charCount = content.length;
        const warningThreshold = Math.floor(MAX_MEMO_LENGTH * 0.9); // 90% の閾値

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
});
