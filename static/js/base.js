// base.js
import { langSwitcher } from './lang-switcher.js';
import { log } from './globalConfig.js';

document.addEventListener("DOMContentLoaded", () => {
    log("base.js loaded");

    langSwitcher();

    log("Icons added to buttons");
});
