// base.js

// lang-switcher.js から langSwitcher 関数をインポート
import { langSwitcher } from './lang-switcher.js';

document.addEventListener("DOMContentLoaded", function() {
    // langSwitcher 関数を呼び出して、言語切り替えを有効にする
    langSwitcher();

    // 他の共通機能があればここに追加
    // 例えば、モーダルウィンドウの初期化など
});
