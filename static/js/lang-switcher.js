import { VALID_LANGS, DEFAULT_LANG } from './globalConfig.js';

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
        console.error("Error accessing localStorage:", error);
        savedLang = null;
    }

    let currentLangMatch = currentURL.pathname.match(new RegExp(`^/(${VALID_LANGS.join('|')})/`));
    let currentLang = currentLangMatch ? currentLangMatch[1] : DEFAULT_LANG;

    // **初回アクセス時のリダイレクト処理**
    if (!currentLangMatch && savedLang && VALID_LANGS.includes(savedLang)) {
        window.location.replace(`${baseURL}/${savedLang}/`);
        return; // **リダイレクト後は処理を続行しない**
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
                console.error("Error saving to localStorage:", error);
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
    async function updateLangDropdown() {
        try {
            const currentLangMatch = window.location.pathname.match(new RegExp(`^/(${VALID_LANGS.join('|')})/`));
            const currentLang = currentLangMatch ? currentLangMatch[1] : DEFAULT_LANG;
            const commonPath = `/lang/${currentLang}/common.json`;

            console.log("Fetching common:", commonPath);
            const commonResponse = await fetch(commonPath);
            if (!commonResponse.ok) throw new Error(`Failed to load ${commonPath}`);
            const commonLangData = await commonResponse.json();

            // 言語選択ボタンのテキストを変更（現在の言語を表示）
            if (langDropdownButton && commonLangData.common.lang_switch) {
                langDropdownButton.textContent = `🌍 ${currentLang === 'ja' ? '日本語' : currentLang === 'en' ? 'English' : 'Language'}`;
            }
        } catch (error) {
            console.error("Error updating language dropdown:", error);
        }
    }

    // 言語選択ボタンの初回更新
    updateLangDropdown();
}
