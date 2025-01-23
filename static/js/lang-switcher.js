// lang-switcher.js

export function langSwitcher() {
  document.addEventListener("DOMContentLoaded", () => {
    const langLinks = document.querySelectorAll('.lang-switch');
    const currentURL = new URL(window.location.href); // 現在のURLをオブジェクトとして取得
    const baseURL = window.location.origin; // ベースURL
    const defaultLang = 'ja'; // デフォルト言語
    const validLangs = ['ja', 'en']; // 有効な言語コードリスト

    // URL から現在の言語を取得（例: /ja/ や /en/ の部分）
    const currentLangMatch = currentURL.pathname.match(/^\/(ja|en)\//);
    const currentLang = currentLangMatch ? currentLangMatch[1] : defaultLang;

    langLinks.forEach(link => {
      const targetLang = link.dataset.lang; // data-lang 属性から言語を取得

      if (targetLang === currentLang) {
        link.classList.add('d-none'); // Bootstrapの `d-none` クラスで現在の言語のリンクを非表示
      }

      link.addEventListener('click', (event) => {
        event.preventDefault(); // デフォルトのリンク動作をキャンセル

        if (!validLangs.includes(targetLang)) return; // 無効な言語なら処理を中断

        let newPath = currentURL.pathname;

        if (currentLangMatch) {
          // 言語コードを変更（/ja/ または /en/ の部分を targetLang に置き換え）
          newPath = newPath.replace(/^\/(ja|en)\//, `/${targetLang}/`);
        } else {
          // URL に言語コードが含まれていない場合は追加
          newPath = `/${targetLang}${newPath}`;
        }

        // 新しいURLを作成（クエリパラメータやハッシュを維持）
        const newURL = `${baseURL}${newPath}${currentURL.search}${currentURL.hash}`;

        // 言語を切り替えてページを遷移（リロード）
        window.location.href = newURL;
      });
    });
  });
}
