/**
 * グローバル設定ファイル
 * 言語設定や共通の設定値を定義
 */

/**
 * サポートする言語の一覧
 * @type {string[]}
 */
export const VALID_LANGS = ['ja', 'en'];

/**
 * デフォルトの言語
 * @type {string}
 */
export const DEFAULT_LANG = 'ja';

/**
 * 言語名と表示名の対応 (例: 言語選択ドロップダウンなどで使用)
 * @type {Record<string, string>}
 */
export const LANG_DISPLAY_NAMES = {
  ja: '日本語',
  en: 'English',
};

// 他のグローバル設定があればここに追加
// 例：APIのエンドポイント
// export const API_ENDPOINT = 'https://example.com/api';