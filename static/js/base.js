// base.js

import { langSwitcher } from './lang-switcher.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("base.js loaded"); // 確認用ログ
  langSwitcher();
});
