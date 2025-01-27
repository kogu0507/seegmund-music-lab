// base.js

import { langSwitcher } from './lang-switcher.js';
import { log } from './globalConfig.js'; // log関数をインポート

document.addEventListener("DOMContentLoaded", () => {
  log("base.js loaded"); // 確認用ログ（本番では無効）
  langSwitcher();
});
