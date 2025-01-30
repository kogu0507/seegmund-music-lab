/**
 * Bootstrap Icons のアイコンを動的に生成するユーティリティ
 * @module BootstrapIcons
 */

/**
 * アイコンのマッピング（動的に使用するアイコンのみ）
 * @property {string} question - ヘルプアイコン
 */
export const ICON_MAP = {
    question: "question-circle"
};

// アイコンキャッシュ（同じアイコンを繰り返し作成しないようにする）
const iconCache = new Map();

/**
 * Bootstrap Icons のアイコンを生成する
 * @param {string} iconName - アイコンのキー名（ICON_MAP に定義されている）
 * @param {Object} [options={}] - オプション（サイズ・色・スピンアニメーションなど）
 * @param {string} [options.size="1em"] - アイコンのサイズ（例: "1.5rem", "20px"）
 * @param {string} [options.color="inherit"] - アイコンの色
 * @param {string} [options.additionalClass=""] - 追加のクラス
 * @param {boolean} [options.spin=false] - スピンアニメーションを適用するか
 * @param {string} [options.ariaLabel=""] - アクセシビリティのラベル
 * @param {string} [options.spacing="0.25em"] - アイコンとテキストの間隔（単位指定可）
 * @returns {HTMLElement | null} - 生成したアイコン要素（または null）
 */
export function getIcon(iconName, options = {}) {
    if (!ICON_MAP[iconName]) {
        console.error(`Icon "${iconName}" is not defined in ICON_MAP.`);
        return null; // ❗ `throw` ではなく `null` を返すことで柔軟なエラーハンドリングが可能
    }

    const cacheKey = `${iconName}-${JSON.stringify(options)}`;
    if (iconCache.has(cacheKey)) {
        return iconCache.get(cacheKey).cloneNode(true); // クローンを返すことで変更が影響しない
    }

    const {
        size = "1em",
        color = "inherit",
        additionalClass = "",
        spin = false,
        ariaLabel = "",
        spacing = "0.25em"
    } = options;

    const iconElement = document.createElement("i");
    iconElement.className = `bi bi-${ICON_MAP[iconName]} ${additionalClass}`.trim();
    iconElement.style.fontSize = size;
    iconElement.style.color = color;
    iconElement.style.marginRight = spacing;

    if (spin) {
        iconElement.style.animation = "spin 1s linear infinite";
    }

    if (ariaLabel) {
        iconElement.setAttribute("aria-label", ariaLabel);
    }

    iconCache.set(cacheKey, iconElement); // キャッシュに保存
    return iconElement;
}

// ✅ スピンアニメーションのCSS（スピンオプション用）
const style = document.createElement("style");
style.textContent = `
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
