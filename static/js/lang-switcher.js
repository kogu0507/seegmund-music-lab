import { VALID_LANGS, DEFAULT_LANG } from './globalConfig.js';

/**
 * 言語切り替え機能を提供する関数
 */
export function langSwitcher() {
    const langLinks = document.querySelectorAll('.lang-switch');
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

    if (currentURL.pathname === "/" && savedLang && VALID_LANGS.includes(savedLang)) {
        window.location.replace(`${baseURL}/${savedLang}/`);
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
                console.error("Error saving to localStorage:", error);
            }

            let newPath = currentURL.pathname;
            newPath = currentLangMatch
                ? currentURL.pathname.replace(new RegExp(`^/(${VALID_LANGS.join('|')})/`), `/${targetLang}/`)
                : currentURL.pathname !== "/"
                    ? `/${targetLang}${currentURL.pathname}`
                    : `/${targetLang}/`;

            const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;

            window.history.pushState(null, '', newURL);

            // data-i18n-page属性からページキーを取得
            const pageKey = document.querySelector('html').dataset.i18nPage || 'common';
            updateContentForNewLanguage(targetLang, pageKey);
        });
    });

    /**
     * 新しい言語に合わせてコンテンツを更新する関数
     * @param {string} lang - 新しい言語コード
     * @param {string} pageKey - ページキー (例: "index", "about", "blog/article1")
     */
    async function updateContentForNewLanguage(lang, pageKey) {
        try {
            const commonResponse = await fetch(`/lang/${lang}/common.json`);
            if (!commonResponse.ok) {
                throw new Error(`HTTP error! status: ${commonResponse.status} (common.json)`);
            }
            const commonLangData = await commonResponse.json();
            
            let pageLangData = {};
            try{
                const pageResponse = await fetch(`/lang/${lang}/${pageKey}.json`);
                if (!pageResponse.ok) {
                    // console.warn(`HTTP error! status: ${pageResponse.status} (${pageKey}.json)`);
                    // ページ固有のJSONがない場合はエラーにしない
                } else {
                    pageLangData = await pageResponse.json();
                }
            }catch(pageError){
                console.error("Error fetching page language data:", pageError);
            }

            const langData = { ...commonLangData, ...pageLangData };

            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const key = element.getAttribute("data-i18n");
                if (langData[key]) {
                    element.textContent = langData[key];

                    if (element.tagName === 'HTML') {
                        element.lang = lang;
                    }
                }
            });

            const errorMessageElement = document.getElementById('error-message');
            if (errorMessageElement) {
                errorMessageElement.textContent = "";
            }

        } catch (error) {
            console.error("Error fetching language data:", error);
            const errorMessageElement = document.getElementById('error-message');
            if (errorMessageElement) {
                errorMessageElement.textContent = "Failed to load language data. Please try again later.";
            }
        }
    }
}