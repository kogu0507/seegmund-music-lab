//lang-switcher.js
import { validLangs, defaultLang } from './globalConfig.js';

export function langSwitcher() {  
  const langLinks = document.querySelectorAll('.lang-switch');
  const currentURL = new URL(window.location.href);
  const baseURL = window.location.origin;

  // 1️⃣ `localStorage` から前回の言語設定を取得
  const savedLang = localStorage.getItem('preferredLang');

  // 2️⃣ URL から現在の言語を取得（ルート `/` の場合は `null`）
  const currentLangMatch = currentURL.pathname.match(new RegExp(`^/(${validLangs.join('|')})/`));
  let currentLang = currentLangMatch ? currentLangMatch[1] : null;

  // 3️⃣ ルート (`/`) にアクセスした場合、保存された言語にリダイレクト
  if (!currentLang && savedLang && validLangs.includes(savedLang)) {
    window.location.replace(`${baseURL}/${savedLang}/index.html`);
    return; // ここで処理を止める
  }

  // 4️⃣ `localStorage` の言語が現在のURLと異なる場合、リダイレクト
  if (savedLang && savedLang !== currentLang && validLangs.includes(savedLang)) {
    const newPath = currentURL.pathname.replace(new RegExp(`^/(${validLangs.join('|')})/`), `/${savedLang}/`);
    const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;
    window.location.replace(newURL);
    return;
  }

  langLinks.forEach(link => {
    const targetLang = link.dataset.lang;

    if (targetLang === currentLang) {
      link.classList.add('d-none'); // Bootstrapの `d-none` クラスで現在の言語のリンクを非表示
    }

    link.addEventListener('click', (event) => {
      if (!validLangs.includes(targetLang)) return;
      event.preventDefault();

      // 5️⃣ 言語を `localStorage` に保存
      localStorage.setItem('preferredLang', targetLang);

      let newPath = currentURL.pathname;
      if (currentLangMatch) {
        newPath = newPath.replace(new RegExp(`^/(${validLangs.join('|')})/`), `/${targetLang}/`);
      } else {
        newPath = `/${targetLang}${newPath}`;
      }

      const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;

      // 6️⃣ URL を変更してリロード
      window.history.pushState(null, '', newURL);
      location.reload();
    });
  });
}
