// BootstrapIcons.js

export function getIcon(iconName, options = {}) {
    if (!iconName) {
        console.error("Icon name is required.");
        return "";
    }

    const {
        size = "1em",         // アイコンのサイズ（デフォルト: 1em）
        color = "inherit",    // アイコンの色（デフォルト: 継承）
        additionalClass = "", // 追加クラス
        rotate = 0,           // 回転角度（デフォルトなし）
        spin = false,         // アニメーション有無（デフォルト: false）
        onClick = null,       // クリックイベント
        ariaLabel = "",        // アクセシビリティ対応（スクリーンリーダー用）
        spacing = "0.25em"     // アイコンとテキストの間隔 (デフォルト: 0.25em)
    } = options;

    const iconElement = document.createElement("i");
    iconElement.className = `bi bi-${iconName} ${additionalClass}`.trim();
    iconElement.style.fontSize = size;
    iconElement.style.color = color;
    iconElement.style.marginRight = spacing; // ← ここでスペースを設定

    // 回転設定
    if (rotate) {
        iconElement.style.transform = `rotate(${rotate}deg)`;
    }

    // スピン（無限回転）設定
    if (spin) {
        iconElement.style.animation = "spin 1s linear infinite";
    }

    // クリックイベントが指定されている場合
    if (onClick && typeof onClick === "function") {
        iconElement.addEventListener("click", onClick);
        iconElement.style.cursor = "pointer"; // クリック可能な見た目に
    }

    // スクリーンリーダー用の説明
    if (ariaLabel) {
        iconElement.setAttribute("aria-label", ariaLabel);
    }

    return iconElement;
}

// スピンアニメーションをCSSで定義
const style = document.createElement("style");
style.textContent = `
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
