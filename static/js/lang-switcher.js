// lang-switcher.js
import { VALID_LANGS, DEFAULT_LANG, log, LANG_DISPLAY_NAMES } from './globalConfig.js';

/**
 * 言語切り替え機能を提供する関数
 */
export function langSwitcher() {
    log("langSwitcher function called"); // デバッグログ追加

    // 言語切り替えリンクとドロップダウンボタンを取得
    const langLinks = document.querySelectorAll('.lang-switch');
    const langDropdownButton = document.getElementById("langDropdown");
    // 現在のURLとベースURLを取得
    const currentURL = new URL(window.location.href);
    const baseURL = window.location.origin;

    // 有効な言語の正規表現を作成
    const LANG_REGEX = new RegExp(`^/(${VALID_LANGS.join('|')})/`);

    // ローカルストレージから保存された言語を取得 (エラー処理あり)
    let savedLang;
    try {
        savedLang = localStorage.getItem('preferredLang');
        log(`Saved preferredLang: ${savedLang}`); // デバッグログ追加
    } catch (error) {
        log("Error accessing localStorage:", error);
        savedLang = null;
    }

    // 現在のURLから言語を取得
    let currentLangMatch = currentURL.pathname.match(LANG_REGEX);
    let currentLang = currentLangMatch ? currentLangMatch[1] : null;
    log(`Current language: ${currentLang}`); // デバッグログ追加

    // 現在の言語を preferredLang に保存
    if (currentLang && VALID_LANGS.includes(currentLang)) {
        saveLang(currentLang);
        log(`preferredLang updated to currentLang: ${currentLang}`); // デバッグログ追加
    }

    // 初回アクセス時のリダイレクト処理 (サイトのルート `/` の場合)
    if (!currentLang && currentURL.pathname === "/") {
        log("No current language detected, redirecting..."); // デバッグログ追加
        // ローカルストレージに保存された言語があれば、そちらにリダイレクト
        if (savedLang && VALID_LANGS.includes(savedLang)) {
            redirectToLang(savedLang);
            return;
        }
        // そうでない場合は、デフォルト言語にリダイレクト
        redirectToLang(DEFAULT_LANG);
        return;
    }

    // 言語切り替えリンクのイベントリスナーを設定
    langLinks.forEach(link => {
        const targetLang = link.dataset.lang;
        log(`Setting up lang-switch for: ${targetLang}`); // デバッグログ追加

        // 現在の言語のリンクは非表示にする
        if (targetLang === currentLang) {
            link.classList.add('hidden-lang');
            log(`Hiding current language link: ${targetLang}`); // デバッグログ追加
        } else {
            link.classList.remove('hidden-lang');
            log(`Showing language link: ${targetLang}`); // デバッグログ追加
        }

        // リンクをクリックしたときの処理
        link.addEventListener('click', (event) => {
            event.preventDefault(); // デフォルトのリンク動作を防止
            log(`Language link clicked: ${targetLang}`); // デバッグログ追加

            if (!VALID_LANGS.includes(targetLang)) {
                log(`Invalid target language: ${targetLang}`); // デバッグログ追加
                return; // 有効な言語でない場合は何もしない
            }

            // 選択された言語をローカルストレージに保存
            saveLang(targetLang);

            // URLを更新してリダイレクト
            let newPath = currentLangMatch
                ? currentURL.pathname.replace(LANG_REGEX, `/${targetLang}/`)
                : `/${targetLang}${currentURL.pathname}`;
            log(`Redirecting to: ${baseURL}${newPath}${currentURL.search}${currentURL.hash}`); // デバッグログ追加
            window.location.href = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;
        });
    });

    // 言語ドロップダウンボタンを更新する関数
    function updateLangDropdown() {
        if (langDropdownButton) {
            const displayName = LANG_DISPLAY_NAMES[currentLang] || "Language";
            const emoji = '🌍'; 
            langDropdownButton.textContent = `${emoji} ${displayName}`;
            langDropdownButton.setAttribute('aria-label', `Change language to ${displayName}`);
            log(`Language dropdown updated to: ${displayName}`); // デバッグログ追加
        }
    }

    // 言語選択ボタンの初回更新
    updateLangDropdown();

    // 言語にリダイレクトする関数
    function redirectToLang(lang) {
        try {
            log(`Redirecting to language: ${lang}`); // デバッグログ追加
            window.location.replace(`${baseURL}/${lang}/`);
        } catch (error) {
            log("Redirection failed:", error);
        }
    }

    // 言語を保存する関数
    function saveLang(lang) {
        try {
            localStorage.setItem('preferredLang', lang);
            log(`preferredLang set to ${lang}`);
        } catch (error) {
            log("Error saving to localStorage:", error);
        }
    }
}
