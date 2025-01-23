export function langSwitcher() {  
  const langLinks = document.querySelectorAll('.lang-switch');
  const currentURL = new URL(window.location.href);
  const baseURL = window.location.origin;
  const defaultLang = 'ja';
  const validLangs = ['ja', 'en'];

  console.log("lang-switcher.js loaded"); // デバッグ用

  // URL から現在の言語を取得
  const currentLangMatch = currentURL.pathname.match(/^\/(ja|en)\//);
  const currentLang = currentLangMatch ? currentLangMatch[1] : defaultLang;

  langLinks.forEach(link => {
    const targetLang = link.dataset.lang;

    if (targetLang === currentLang) {
      link.classList.add('d-none'); // Bootstrapの `d-none` クラスで現在の言語のリンクを非表示
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!validLangs.includes(targetLang)) return;

      let newPath = currentURL.pathname;
      if (currentLangMatch) {
        newPath = newPath.replace(/^\/(ja|en)\//, `/${targetLang}/`);
      } else {
        newPath = `/${targetLang}${newPath}`;
      }

      const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;
      console.log("Switching language to:", newURL);
      window.location.href = newURL;
    });
  });
}
