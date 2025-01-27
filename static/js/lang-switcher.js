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
            const commonPath = `/lang/${lang}/common.json`;
            const pagePath = `/lang/${lang}/${pageKey}.json`;

            console.log("Fetching common:", commonPath);
            const commonResponse = await fetch(commonPath);
            if (!commonResponse.ok) {
                throw new Error(`HTTP error! status: ${commonResponse.status} (common.json)`);
            }
            const commonLangData = await commonResponse.json();
            console.dir("commonLangData:", commonLangData); // console.dirに変更

            console.log("Fetching page:", pagePath);
            let pageLangData = {};
            try {
                const pageResponse = await fetch(pagePath);
                if (!pageResponse.ok) {
                    console.warn(`HTTP error! status: ${pageResponse.status} (${pageKey}.json)`);
                } else {
                    pageLangData = await pageResponse.json();
                    console.dir("pageLangData:", pageLangData); // console.dirに変更
                }
            } catch (pageError) {
                console.error("Error fetching page language data:", pageError);
            }

            const langData = { ...commonLangData, ...pageLangData };
            console.dir("Combined langData:", langData); //console.dirに変更

            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const key = element.getAttribute("data-i18n");
                console.log("Processing element with key:", key); // どの要素を処理しているか
                const keys = key.split('.'); // キーを分割
                let translatedText = langData;
                for (const k of keys) {
                    if (translatedText && translatedText.hasOwnProperty(k)) {
                        translatedText = translatedText[k];
                    } else {
                        console.warn(`Translation for key ${key} not found in ${lang}.json`);
                        translatedText = undefined;
                        break;
                    }
                }
                if (translatedText !== undefined) {
                    console.log("Setting textContent to:", translatedText); // 翻訳後のテキストをログ出力
                    element.textContent = translatedText;
                } else {
                    console.warn(`Translation not found for key: ${key}`);
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