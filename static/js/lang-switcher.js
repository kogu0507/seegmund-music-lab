// lang-switcher.js

export function langSwitcher() {
  document.addEventListener("DOMContentLoaded", () => {
    const langLinks = document.querySelectorAll('.lang-switch');
    const currentURL = window.location.href;
    const baseURL = window.location.origin;
    const defaultLang = 'ja'; // デフォルト言語
    const validLangs = ['ja', 'en']; // 有効な言語コードリスト

    // URL または document.documentElement.lang から現在の言語を取得
    const currentLang = currentURL.match(/\/([a-z]{2})\//)?.[1] || document.documentElement.lang || defaultLang;

    // 言語切り替えリンクの処理
    langLinks.forEach(link => {
      const targetLang = link.getAttribute('href').replace('#', '');
      
      if (targetLang === currentLang) {
        link.classList.add('d-none'); // 現在の言語のリンクを非表示にする
      }

      link.addEventListener('click', (event) => {
        event.preventDefault();

        let newURL;
        if (validLangs.includes(targetLang)) { // 言語コードの検証
          // 正規表現で言語部分を置換
          newURL = currentURL.replace(/\/[a-z]{2}\//, `/${targetLang}/`);

          // 言語部分が存在しない場合は追加
          if (!/\/([a-z]{2})\//.test(currentURL)) {
            if (currentURL === baseURL + '/') { // トップページの場合
              newURL = `${baseURL}/${targetLang}/`; // トップページを適切にリダイレクト
            } else {
              const path = currentURL.replace(baseURL, '');
              newURL = `${baseURL}/${targetLang}${path}`; // 他のページの場合はURLを調整
            }
          }
        }

        window.location.href = newURL;
      });
    });
  });
}
