// EventBus.mjs

// ----------------------------------------
// イベント定数
// ----------------------------------------
export const GAME_EVENTS = {
    // 設定関連
    SETTINGS_UPDATED: "SETTINGS_UPDATED", // 設定が更新された
    SETTINGS_APPLIED: "SETTINGS_APPLIED", // 設定が適用された
    SETTINGS_RESET: "SETTINGS_RESET", // 設定がリセットされた
    SETTINGS_SAVED: "SETTINGS_SAVED", // 設定が保存された
    SETTINGS_LOADED: "SETTINGS_LOADED", // 設定がロードされた

    // ゲーム開始・終了関連(script.jsのイベントリスナ)
    GAME_INITIALIZED: "GAME_INITIALIZED", // ゲームが初期化された
    START_BUTTON_CLICKED: "START_BUTTON_CLICKED", // スタートボタンがクリックされた
    KEY_CLICKED: "KEY_CLICKED", // キーがクリックされた
    REPLAY_BUTTON_CLICKED: "REPLAY_BUTTON_CLICKED", // リプレイボタンがクリックされた

    // ゲームの状態関連
    GAME_START: "GAME_START", // ゲームが開始された
    GAME_END: "GAME_END", // ゲームが終了した
    GAME_PAUSE: "GAME_PAUSE", // ゲームが一時停止された
    GAME_RESUME: "GAME_RESUME", // ゲームが再開された
    GAME_OVER: "GAME_OVER", // ゲームオーバーになった
    GAME_RESTART: "GAME_RESTART", // ゲームがリスタートされた
    ROUND_START: "ROUND_START", // ラウンドが開始された
    ROUND_END: "ROUND_END", // ラウンドが終了した
    LEVEL_UP: "LEVEL_UP", // レベルが上がった
    LEVEL_DOWN: "LEVEL_DOWN", // レベルが下がった

    // ゲームの進行関連
    QUESTION_GENERATED: "QUESTION_GENERATED", // 問題が生成された
    QUESTION_DISPLAYED: "QUESTION_DISPLAYED", // 問題が表示された
    ANSWER_SUBMITTED: "ANSWER_SUBMITTED", // 回答が送信された
    ANSWER_CORRECT: "ANSWER_CORRECT", // 回答が正解だった
    ANSWER_INCORRECT: "ANSWER_INCORRECT", // 回答が不正解だった
    SCORE_UPDATED: "SCORE_UPDATED", // スコアが更新された
    TIME_UPDATED: "TIME_UPDATED", // 残り時間が更新された
    LIVES_UPDATED: "LIVES_UPDATED", // ライフが更新された
    COMBO_UPDATED: "COMBO_UPDATED", // コンボが更新された

    // ユーザーのインタラクション関連
    USER_INPUT: "USER_INPUT", // ユーザーが何らかの入力をした
    KEY_PRESSED: "KEY_PRESSED", // キーが押された
    BUTTON_CLICKED: "BUTTON_CLICKED", // ボタンがクリックされた
    NOTE_PLAYED: "NOTE_PLAYED", // 音符が演奏された

    // ストレージ関連
    HIGH_SCORE_UPDATED: "HIGH_SCORE_UPDATED", // ハイスコアが更新された

    // その他
    ERROR: "ERROR", // エラーが発生した
    DEBUG_MESSAGE: "DEBUG_MESSAGE", // デバッグメッセージが出力された
};
// TODO: イベント名が適切か確認する。
// TODO: イベント名が重複していないか確認する。
// TODO: イベント名がわかりやすいか確認する。
// TODO: イベント名が多すぎないか確認する。
// TODO: イベント名が少なすぎないか確認する。
// TODO: イベント名が不足していないか確認する。
// TODO: イベント名が使われていないものがないか確認する。
// TODO: イベント名が使われすぎているものがないか確認する。
// TODO: イベント名が使われている場所を確認する。
// TODO: イベント名が使われていない場所を確認する。
// TODO: イベント名が使われている場所と使われていない場所を確認する。
// TODO: イベント名が使われている場所と使われていない場所を比較する。
// TODO: イベント名が使われている場所と使われていない場所を分析する。
// TODO: イベント名が使われている場所と使われていない場所を評価する。
// TODO: イベント名が使われている場所と使われていない場所を改善する。
// TODO: イベント名が使われている場所と使われていない場所を最適化する。
// TODO: イベント名が使われている場所と使われていない場所をテストする。
// TODO: イベント名が使われている場所と使われていない場所をデバッグする。
// TODO: イベント名が使われている場所と使われていない場所をリファクタリングする。
// TODO: イベント名が使われている場所と使われていない場所をドキュメント化する。
// TODO: イベント名が使われている場所と使われていない場所をレビューする。
// TODO: イベント名が使われている場所と使われていない場所をマージする。
// TODO: イベント名が使われている場所と使われていない場所をリリースする。
// TODO: イベント名が使われている場所と使われていない場所を監視する。
// TODO: イベント名が使われている場所と使われていない場所を分析する。
// TODO: イベント名が使われている場所と使われていない場所を評価する。
// TODO: イベント名が使われている場所と使われていない場所を改善する。
// TODO: イベント名が使われている場所と使われていない場所を最適化する。
// TODO: イベント名が使われている場所と使われていない場所をテストする。
// TODO: イベント名が使われている場所と使われていない場所をデバッグする。
// TODO: イベント名が使われている場所と使われていない場所をリファクタリングする。
// TODO: イベント名が使われている場所と使われていない場所をドキュメント化する。
// TODO: イベント名が使われている場所と使われていない場所をレビューする。
// TODO: イベント名が使われている場所と使われていない場所をマージする。
// TODO: イベント名が使われている場所と使われていない場所をリリースする。
// TODO: イベント名が使われている場所と使われていない場所を監視する。
// TODO: イベント名が使われている場所と使われていない場所を分析する。
// TODO: イベント名が使われている場所と使われていない場所を評価する。
// TODO: イベント名が使われている場所と使われていない場所を改善する。
// TODO: イベント名が使われている場所と使われていない場所を最適化する。
// TODO: イベント名が使われている場所と使われていない場所をテストする。
// TODO: イベント名が使われている場所と使われていない場所をデバッグする。
// TODO: イベント名が使われている場所と使われていない場所をリファクタリングする。
// TODO: イベント名が使われている場所と使われていない場所をドキュメント化する。
// TODO: イベント名が使われている場所と使われていない場所をレビューする。
// TODO: イベント名が使われている場所と使われていない場所をマージする。
// TODO: イベント名が使われている場所と使われていない場所をリリースする。
// TODO: イベント名が使われている場所と使われていない場所を監視する。



/**
 * イベントバスのクラス
 */
export class EventBus {
  /**
   * コンストラクタ
   */
  constructor() {
    this.events = {};
  }

  /**
   * イベントを購読する
   * @param {string} eventName - イベント名
   * @param {function} callback - コールバック関数
   */
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  /**
   * イベントを発行する
   * @param {string} eventName - イベント名
   * @param {any} data - イベントデータ
   */
  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(data);
      });
    }
  }

  /**
   * イベントの購読を解除する
   * @param {string} eventName - イベント名
   * @param {function} callback - コールバック関数
   */
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }

  /**
   * すべてのイベントの購読を解除する
   */
  clear() {
    this.events = {};
  }
}
