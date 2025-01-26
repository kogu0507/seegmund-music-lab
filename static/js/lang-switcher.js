import { validLangs, defaultLang } from './globalConfig.js';

export function langSwitcher() {
  const langLinks = document.querySelectorAll('.lang-switch');
  const currentURL = new URL(window.location.href);
  const baseURL = window.location.origin;

  // 1️⃣ `localStorage` から前回の言語設定を取得
  let savedLang;
  try {
    savedLang = localStorage.getItem('preferredLang');
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    savedLang = null; // localStorage にアクセスできない場合は null を設定
  }

  // 2️⃣ URL から現在の言語を取得
  let currentLangMatch = currentURL.pathname.match(new RegExp(`^/(${validLangs.join('|')})/`));
  let currentLang = currentLangMatch ? currentLangMatch[1] : defaultLang;

  // 3️⃣ ルート (`/`) にアクセスした場合、localStorage の言語へリダイレクト
  if (!currentLangMatch && savedLang && validLangs.includes(savedLang)) {
    window.location.replace(`${baseURL}/${savedLang}/index.html`);
    return;
  }

  // 4️⃣ 言語切り替えボタンの表示制御
  langLinks.forEach(link => {
    const targetLang = link.dataset.lang;

    // 現在の言語と同じボタンは非表示にする
    if (targetLang === currentLang) {
      link.classList.add('d-none'); 
    } else {
      link.classList.remove('d-none'); 
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!validLangs.includes(targetLang)) return;

      // 5️⃣ 言語を `localStorage` に保存
      try {
        localStorage.setItem('preferredLang', targetLang);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      let newPath = currentURL.pathname;

      // 6️⃣ 言語切り替え時の `index.html` を補完し、現在のパスを維持
      if (currentLangMatch) {
        newPath = newPath.replace(new RegExp(`^/(${validLangs.join('|')})/`), `/${targetLang}/`);
      } else {
        newPath = `/${targetLang}${currentURL.pathname}`;
      }

      // `/` の場合のみ `index.html` を補完
      if (newPath === `/${targetLang}/`) {
        newPath += 'index.html';
      }

      const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;

      // 7️⃣ URL を変更してページの一部を更新（リロード削減）
      window.history.pushState(null, '', newURL);
      updateContentForNewLanguage(targetLang);
    });
  });

  // **新規追加: 言語変更時にページの一部を更新**
  function updateContentForNewLanguage(lang) {
    // ページの一部を動的に更新する処理（例: API からデータを取得するなど）
    // ここでは単純にリロードするが、実際には動的更新が望ましい
    location.reload();
  }
}
