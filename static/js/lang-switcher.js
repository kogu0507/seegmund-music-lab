//lang-switcher.js
import { validLangs, defaultLang } from './globalConfig.js';

export function langSwitcher() {  
  const langLinks = document.querySelectorAll('.lang-switch');
  const currentURL = new URL(window.location.href);
  const baseURL = window.location.origin;

  // 1️⃣ `localStorage` から前回の言語設定を取得
  const savedLang = localStorage.getItem('preferredLang');

  // 2️⃣ URL から現在の言語を取得（ルート `/` の場合は `null`）
  let currentLangMatch = currentURL.pathname.match(new RegExp(`^/(${validLangs.join('|')})/`));
  let currentLang = currentLangMatch ? currentLangMatch[1] : null;

  // 3️⃣ ルート (`/`) にアクセスした場合、localStorage の言語へリダイレクト
  if (!currentLang && savedLang && validLangs.includes(savedLang)) {
    window.location.replace(`${baseURL}/${savedLang}/index.html`);
    return;
  }

  // 4️⃣ `index.html` が明示的に含まれていない場合、自動補完
  if (currentLang && currentURL.pathname.endsWith(`/${currentLang}/`)) {
    window.location.replace(`${baseURL}/${currentLang}/index.html`);
    return;
  }

  // 5️⃣ 言語切り替えボタンの表示制御
  langLinks.forEach(link => {
    const targetLang = link.dataset.lang;

    if (targetLang === currentLang) {
      link.classList.add('d-none'); // 現在の言語のリンクを非表示にする
    } else {
      link.classList.remove('d-none'); // 他の言語のリンクは表示
    }

    link.addEventListener('click', (event) => {
      if (!validLangs.includes(targetLang)) return;
      event.preventDefault();

      // 6️⃣ 言語を `localStorage` に保存
      localStorage.setItem('preferredLang', targetLang);

      let newPath = currentURL.pathname;

      // 7️⃣ `index.html` が抜ける問題を修正
      if (currentLangMatch) {
        newPath = newPath.replace(new RegExp(`^/(${validLangs.join('|')})/`), `/${targetLang}/`);
      } else {
        newPath = `/${targetLang}/index.html`;
      }

      const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;

      // 8️⃣ URL を変更してリロード
      window.history.pushState(null, '', newURL);
      location.reload();
    });
  });
}
