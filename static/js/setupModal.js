/**
 * setupModal.js
 * ボタンをクリックすると、モーダルを表示する
 * @param {string | string[]} buttonIds - クリックするボタンのID (単一または配列)
 * @param {string} modalId - 表示するモーダルのID
 * @param {object} [options] - モーダルのオプション (Bootstrapのオプション)
 * @returns {function} - モーダルのイベントリスナーを削除し、モーダルを破棄する関数
 */
import { log } from './globalConfig.js'; // log関数をインポート

export function setupModal(buttonIds, modalId, options = {}) {
    const buttonIdsArray = Array.isArray(buttonIds) ? buttonIds : [buttonIds];
    const modalElement = document.getElementById(modalId);

    if (!modalElement) {
        log(`Error: モーダル (ID: ${modalId}) が見つかりません。`);
        return () => {}; // 空の削除関数を返す
    }

    // Bootstrapモーダルを初期化
    const modal = new bootstrap.Modal(modalElement, options);
    const removeListeners = [];

    for (const buttonId of buttonIdsArray) {
        const button = document.getElementById(buttonId);
        if (!button) {
            log(`Error: ボタン (ID: ${buttonId}) が見つかりません。`);
            continue;
        }

        // ボタンがクリックされたらモーダルを表示する
        const showModal = () => modal.show();
        button.addEventListener("click", showModal);

        // イベントリスナー削除用の関数を保存
        removeListeners.push(() => button.removeEventListener("click", showModal));
    }

    // 返り値として削除関数を提供（モーダルを閉じてから削除）
    return () => {
        modal.hide(); // まずはモーダルを閉じる
        removeListeners.forEach(removeListener => removeListener()); // すべてのリスナーを削除
        modal.dispose(); // モーダルを破棄
    };
}
