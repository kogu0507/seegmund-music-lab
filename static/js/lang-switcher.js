import { VALID_LANGS, DEFAULT_LANG, log } from './globalConfig.js';

/**
 * 言語切り替え機能を提供する関数
 */
export function langSwitcher() {
    const langLinks = document.querySelectorAll('.lang-switch');
    const langDropdownButton = document.getElementById("langDropdown");
    const currentURL = new URL(window.location.href);
    const baseURL = window.location.origin;

    let savedLang;

    try {
        savedLang = localStorage.getItem('preferredLang');
    } catch (error) {
        log("Error accessing localStorage:", error);
        savedLang = null;
    }

    let currentLangMatch = currentURL.pathname.match(new RegExp(`^/(${VALID_LANGS.join('|')})/`));
    let currentLang = currentLangMatch ? currentLangMatch[1] : null;

    // **初回アクセス時のリダイレクト処理（サイトのルート `/` の場合）**
    if (!currentLang && savedLang && VALID_LANGS.includes(savedLang)) {
        window.location.replace(`${baseURL}/${savedLang}/`);
        return;
    }

    // 言語が決定できない場合、デフォルトの `DEFAULT_LANG` にリダイレクト
    if (!currentLang) {
        window.location.replace(`${baseURL}/${DEFAULT_LANG}/`);
        return;
    }

    langLinks.forEach(link => {
        const targetLang = link.dataset.lang;

        if (targetLang === currentLang) {
            link.classList.add('d-none');
        } else {
            link.classList.remove('d-none');
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();
            if (!VALID_LANGS.includes(targetLang)) return;

            try {
                localStorage.setItem('preferredLang', targetLang);
            } catch (error) {
                log("Error saving to localStorage:", error);
            }

            let newPath = currentLangMatch
                ? currentURL.pathname.replace(new RegExp(`^/(${VALID_LANGS.join('|')})/`), `/${targetLang}/`)
                : `/${targetLang}${currentURL.pathname}`;

            window.location.href = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;
        });
    });

    /**
     * 言語ドロップダウンボタンを更新する関数
     */
    function updateLangDropdown() {
        if (langDropdownButton) {
            langDropdownButton.textContent = "🌍 Language";
        }
    }

    // 言語選択ボタンの初回更新
    updateLangDropdown();
}
