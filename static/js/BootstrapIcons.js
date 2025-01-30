export const ICON_MAP = {
    pencil: "pencil",
    clipboard: "clipboard",
    question: "question-circle",
    trash: "trash",
    save: "save"
};

export function getIcon(iconName, options = {}) {
    if (!ICON_MAP[iconName]) {
        console.error(`Icon "${iconName}" is not defined in ICON_MAP.`);
        return "";
    }

    const {
        size = "1em",
        color = "inherit",
        additionalClass = "",
        rotate = 0,
        spin = false,
        onClick = null,
        ariaLabel = "",
        spacing = "0.25em"
    } = options;

    const iconElement = document.createElement("i");
    iconElement.className = `bi bi-${ICON_MAP[iconName]} ${additionalClass}`.trim();
    iconElement.style.fontSize = size;
    iconElement.style.color = color;
    iconElement.style.marginRight = spacing;

    if (rotate) {
        iconElement.style.transform = `rotate(${rotate}deg)`;
    }

    if (spin) {
        iconElement.style.animation = "spin 1s linear infinite";
    }

    if (onClick && typeof onClick === "function") {
        iconElement.addEventListener("click", onClick);
        iconElement.style.cursor = "pointer";
    }

    if (ariaLabel) {
        iconElement.setAttribute("aria-label", ariaLabel);
    }

    return iconElement;
}

const style = document.createElement("style");
style.textContent = `
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
