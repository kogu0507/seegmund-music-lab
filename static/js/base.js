import { langSwitcher } from './lang-switcher.js';
import { log } from './globalConfig.js';
import { getIcon } from './BootstrapIcons.js';

// 定数化
const buttonIconMap = {
    ".open-memo-modal": "pencil",
    ".easy-memo-copy": "clipboard"
};

// アイコンごとのアクセシビリティラベル
const ariaLabelMap = {
    pencil: "メモを作成",
    clipboard: "メモをコピー"
};

document.addEventListener("DOMContentLoaded", () => {
    log("base.js loaded");

    langSwitcher();

    Object.entries(buttonIconMap).forEach(([className, iconName]) => {
        document.querySelectorAll(className).forEach(button => {
            try {
                const icon = getIcon(iconName, {
                    size: "1.2rem",
                    color: "#ffffff",
                    ariaLabel: ariaLabelMap[iconName]
                });

                // アイコンをボタンの先頭に追加
                button.prepend(icon);

                // クリック時の視覚フィードバック
                button.addEventListener("click", () => {
                    button.classList.add("button-clicked");
                    setTimeout(() => {
                        button.classList.remove("button-clicked");
                    }, 100);
                });

            } catch (error) {
                console.error(`Error adding icon to ${className}:`, error);
            }
        });
    });

    log("Icons added to buttons");
});
