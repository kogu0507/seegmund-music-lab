// fullscreen.js

import { log } from './globalConfig.js'; // log関数をインポート

// フルスクリーンの切り替えを設定する関数
export function setupFullscreenToggle(buttonId) {
    // 指定されたIDのボタンを取得
    const fullscreenButton = document.getElementById(buttonId);
    
    if (!fullscreenButton) {
        log(`Button with id '${buttonId}' not found.`);
        return; // ボタンが見つからない場合は処理を中断
    }

    // フルスクリーンボタンのテキスト
    const FULLSCREEN_TEXT = '🖥️ フルスクリーン';
    const FULLSCREEN_EXIT_TEXT = '📴 フルスクリーン解除';

    let isFullscreenMode = false;

    // フルスクリーン切り替え処理
    fullscreenButton.addEventListener('click', () => {
        document.body.classList.toggle('fullscreen-mode');
        isFullscreenMode = !isFullscreenMode;
        fullscreenButton.textContent = isFullscreenMode ? FULLSCREEN_EXIT_TEXT : FULLSCREEN_TEXT;
        log(`Fullscreen mode: ${isFullscreenMode}`);
    });
}
