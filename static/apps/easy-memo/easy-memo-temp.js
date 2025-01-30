import { getIcon } from './BootstrapIcons.js';

document.addEventListener("DOMContentLoaded", () => {
    const memoTextarea = document.getElementById("easyMemoTextarea");
    const memoContainer = document.getElementById("easyMemoContainer");
    const toggleButtons = document.querySelectorAll(".open-memo-button, .floating-button");
    const previewArea = document.querySelector(".preview-content");
    const saveButton = document.querySelector(".easy-memo-save");
    const clearButton = document.querySelector(".easy-memo-clear");
    const copyButton = document.querySelector(".easy-memo-copy");
    const charCountElement = document.querySelector(".memo-char-count");
    const alertBox = document.getElementById("memoAlert"); 
    const MAX_MEMO_LENGTH = 500;

    // ✅ アイコンをボタンに適用（getIcon() を使用）
    if (saveButton) {
        saveButton.prepend(getIcon("save", { size: "1.2rem", color: "#fff" }));
    }
    if (clearButton) {
        clearButton.prepend(getIcon("trash", { size: "1.2rem", color: "red" }));
    }
    if (copyButton) {
        copyButton.prepend(getIcon("clipboard", { size: "1.2rem", color: "#007bff" }));
    }

    // ✅ 初回ロード時にローカルストレージからメモを復元
    const savedMemo = localStorage.getItem("easyMemo") || "";
    memoTextarea.value = savedMemo;
    updatePreview(savedMemo);
    updateCharCount(savedMemo);

    // ✅ メモの開閉トグル
    function toggleMemo() {
        memoContainer.classList.toggle("open");
    }

    toggleButtons.forEach(button => {
        button.addEventListener("click", toggleMemo);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && memoContainer.classList.contains("open")) {
            toggleMemo();
        }
    });

    document.addEventListener("click", (event) => {
        if (memoContainer.classList.contains("open") && 
            !memoContainer.contains(event.target) && 
            !event.target.closest(".open-memo-button, .floating-button")) {
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

        const sanitizedContent = DOMPurify.sanitize(content); 
        localStorage.setItem("easyMemo", sanitizedContent);
        showAlert("✅ メモを保存しました！", "success");
    }

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
    document.querySelectorAll(".easy-memo-copy").forEach(copyBtn => {
        copyBtn.addEventListener("click", async () => {
            const memoContent = memoTextarea.value;
            if (!memoContent) {
                showAlert("⚠️ コピーするメモがありません。", "warning");
                return;
            }

            if (!navigator.clipboard) {
                showAlert("⚠️ クリップボード API がサポートされていません。", "danger");
                return;
            }

            try {
                await navigator.clipboard.writeText(memoContent);
                showAlert("📋 メモをコピーしました！", "info");
            } catch (err) {
                console.error("コピーに失敗しました:", err);
                showAlert("⚠️ コピーに失敗しました。", "danger");
            }
        });
    });

    function updateCharCount(content) {
        const charCount = content.length;
        const warningThreshold = Math.floor(MAX_MEMO_LENGTH * 0.9);
        const charCountElements = document.querySelectorAll(".memo-char-count"); 

        charCountElements.forEach(element => {
            if (charCount >= MAX_MEMO_LENGTH) {
                element.textContent = `⚠️ ${charCount} / ${MAX_MEMO_LENGTH} 文字 - 上限を超えています！`;
                element.classList.remove("text-muted");
                element.classList.add("text-danger");
            } else if (charCount >= warningThreshold) {
                element.textContent = `⚠️ ${charCount} / ${MAX_MEMO_LENGTH} 文字 - 上限が近づいています！`;
                element.classList.remove("text-muted");
                element.classList.add("text-danger");
            } else {
                element.textContent = `${charCount} / ${MAX_MEMO_LENGTH} 文字`;
                element.classList.remove("text-danger");
                element.classList.add("text-muted");
            }
        });
    }

    function updatePreview(content) {
        const sanitizedContent = DOMPurify.sanitize(content);
        previewArea.innerHTML = sanitizedContent.replace(/\n/g, "<br>");
    }

    let saveTimer;
    memoTextarea.addEventListener("input", () => {
        updateCharCount(memoTextarea.value);
        updatePreview(memoTextarea.value);

        clearTimeout(saveTimer);
        saveTimer = setTimeout(saveMemo, 1000);
    });

    function showAlert(message, type) {
        if (!alertBox) return; 

        alertBox.innerHTML = "";

        const alertElement = document.createElement("div");
        alertElement.className = `alert alert-${type} alert-dismissible fade show`;
        alertElement.setAttribute("role", "alert");
        alertElement.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        alertBox.appendChild(alertElement);

        setTimeout(() => {
            alertElement.classList.remove("show");
            alertElement.classList.add("fade");
            setTimeout(() => alertElement.remove(), 500);
        }, 3000);
    }
});
