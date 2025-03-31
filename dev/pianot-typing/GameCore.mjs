// GameCore.mjs

// ========================================
// 1. 定数とユーティリティ
// ========================================
// ----------------------------------------
// インポート
// ----------------------------------------
import { NOTE_DATA_KEYS, NOTE_DATA, NOTE_GROUPS, pushArray, removeArray } from './NOTE_DATA.mjs';
import { GameDomManager } from './GameDomManager.mjs';
// GameCore.mjs (一部抜粋)
import { EventBus, GAME_EVENTS } from './EventBus.mjs';



// ========================================
// 2. データ管理
// ========================================
export class StorageManager {
    // TODO: LocalStorage を使用する。サーバーサイドのデータベースを使用する場合は、API の設計や認証など、考慮すべき点が大幅に増える。まずは localStorage で実装し、必要に応じてサーバーサイドに移行することを検討する。
    static HIGH_SCORE_KEY = 'highScore';
    static SETTINGS_KEY = 'settings';

    constructor() {
        // サーバーサイドのデータベースを想定したオプションは、localStorage を使用する場合は不要なので削除する。
        // ハイスコアをロードするためのキー
        this.highScoreKey = StorageManager.HIGH_SCORE_KEY;
        this.settingsKey = StorageManager.SETTINGS_KEY; // 設定を保存するためのキーを追加
    }

    save(key, data) {
        console.log(`[StorageManager] Saving data to key: ${key}`, data);
        // TODO: 実際のストレージへの保存処理を実装する
        // 例：localStorage.setItem(key, JSON.stringify(data));
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
            console.log(`[StorageManager] Data saved to localStorage with key: ${key}`);
        } catch (error) {
            console.error(`[StorageManager] Error saving data to localStorage:`, error);
            // TODO: エラー処理を追加する。
            // 例：エラーイベントを発行する。
        }
    }

    load(key) {
        console.log(`[StorageManager] Loading data from key: ${key}`);
        // TODO: 実際のストレージからのロード処理を実装する
        // 例：const data = localStorage.getItem(key);
        //     return data ? JSON.parse(data) : null;
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData) {
                const data = JSON.parse(serializedData);
                console.log(`[StorageManager] Data loaded from localStorage with key: ${key}`, data);
                return data;
            } else {
                console.log(`[StorageManager] No data found in localStorage with key: ${key}`);
                return null;
            }
        } catch (error) {
            console.error(`[StorageManager] Error loading data from localStorage:`, error);
            // TODO: エラー処理を追加する。
            // 例：エラーイベントを発行する。
            return null;
        }
    }

    remove(key) {
        console.log(`[StorageManager] Removing data from key: ${key}`);
        // TODO: 実際のストレージからの削除処理を実装する
        // 例：localStorage.removeItem(key);
        try {
            localStorage.removeItem(key);
            console.log(`[StorageManager] Data removed from localStorage with key: ${key}`);
        } catch (error) {
            console.error(`[StorageManager] Error removing data from localStorage:`, error);
            // TODO: エラー処理を追加する。
            // 例：エラーイベントを発行する。
        }
    }

    clear() {
        console.log('[StorageManager] Clearing all data');
        // TODO: 実際のストレージのクリア処理を実装する
        // 例：localStorage.clear();
        try {
            localStorage.clear();
            console.log(`[StorageManager] All data cleared from localStorage`);
        } catch (error) {
            console.error(`[StorageManager] Error clearing localStorage:`, error);
            // TODO: エラー処理を追加する。
            // 例：エラーイベントを発行する。
        }
    }
}



// GameCore.mjs (GameSettingsManager クラス部分)

export class GameSettingsManager {
    static SETTING_KEYS = {
        // TODO: 今後、設定項目が増えた場合に、このオブジェクトにどのように追加していくか、ルールを決めておく。
        // TODO: DIFFICULTY のキーを数値から文字列に変更することを検討する。
        GAME_MODE: {
            1: "game-mode-1", // ゲームモード（音名）
            2: "game-mode-2", // ゲームモード（譜読み）
            3: "game-mode-3", // ゲームモード（聴音）
        },
        NOTE_NAME_TYPE: {
            JAPANESE: `note-name-type-japanese`,
            ENGLISH: `note-name-type-english`,
            GERMAN: `note-name-type-german`,
        },
        DIFFICULTY: {
            1: 1, 2: 2, 3: 3, 4: 4,
            5: 5, 6: 6, 7: 7, 8: 8,
            9: 9, 10: 10, 11: 11, 12: 12,
            13: 13, 14: 14, 15: 15, 16: 16,
            99: 99,
        }
    }

    static VALIDATION_RULES = {
        // TODO: 今後、設定項目が増えた場合に、このオブジェクトにどのように追加していくか、ルールを決めておく。
        // TODO: type を "number" 以外にも指定できるようにする。
        // TODO: values の配列に、SETTING_KEYS の値を直接参照するように変更する。
        difficulty: {
            type: "number",
            min: 1,
            max: 16,
            special: 99,
        },
        noteNameType: {
            values: Object.values(GameSettingsManager.SETTING_KEYS.NOTE_NAME_TYPE),
        },
        gameMode: {
            values: Object.values(GameSettingsManager.SETTING_KEYS.GAME_MODE),
        },
        // 他のバリデーションルールもここに追加
    };


    constructor(options = {}) {
        this.eventBus = options.eventBus;
        // TODO: loadedSettings がない場合の処理は、options.loadedSettings || {} で対応できている。問題ない。
        // TODO: defaults と loadedSettings をマージする処理も、{ ...this.defaults, ...this.loadedSettings } で対応できている。問題ない。
        this.defaults = {
            gameMode: GameSettingsManager.SETTING_KEYS.GAME_MODE[1],
            noteNameType: GameSettingsManager.SETTING_KEYS.NOTE_NAME_TYPE.JAPANESE,
            difficulty: GameSettingsManager.SETTING_KEYS.DIFFICULTY[1],
            // その他のセッティング
        };
        this.loadedSettings = options.loadedSettings || {};
        this.settings = { ...this.defaults, ...this.loadedSettings };
        this.eventTarget = new EventTarget();
    }

    apply() {
        // 設定を適用する処理
        console.log('Settings applied:', this.settings);
        // TODO: 設定が適用された際に、DOM を更新する処理を実装する。
        // TODO: 具体的に、どの DOM 要素をどのように更新するのか、検討する。
        // 例：
        // - ゲームモードの表示を更新する。
        // - 音名タイプの表示を更新する。
        // - 難易度の表示を更新する。
        // - 問題の表示を更新する。
        // - スコアの表示を更新する。
        // - タイマーの表示を更新する。
        // - コンボの表示を更新する。
        // - ライフの表示を更新する。
        // - ...

        // 設定が適用されたことを通知
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SETTINGS_APPLIED, { detail: this.settings }));
        this.eventBus.publish(GAME_EVENTS.SETTINGS_APPLIED, this.settings); // EventBus を使ってイベントを発行
    }

    get(key) {
        // TODO: 特に問題ない。
        return this.settings[key] || this.defaults[key];
    }

    update(key, value) {
        if (this._validate(key, value)) {
            this.settings[key] = value;
            this.saveSettings();
            this.apply();

            // 設定が更新されたことを通知
            //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SETTINGS_UPDATED, { detail: { key, value } }));
            this.eventBus.publish(GAME_EVENTS.SETTINGS_UPDATED, { key, value }); // EventBus を使ってイベントを発行
        } else {
            console.error(`Invalid value for key "${key}": ${value}`);
            // TODO: _validate() でエラーが発生した場合、エラーイベントを発行することを検討する。
            // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.ERROR, { detail: { message: `Invalid value for key "${key}": ${value}` } }));
        }
    }


    reset() {
        // TODO: 特に問題ない。
        this.settings = { ...this.defaults };
        this.saveSettings();
        this.apply();

        // 設定がリセットされたことを通知
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SETTINGS_RESET));
        this.eventBus.publish(GAME_EVENTS.SETTINGS_RESET); // EventBus を使ってイベントを発行
    }


    saveSettings() {
        console.log("saveSettings()が呼ばれました。GameManagerで実装してください。");
        // TODO: StorageManager を使用して、設定を保存するように実装する。
        // TODO: StorageManager の save() メソッドを呼び出す際に、どのキーを使用するか、検討する。
        // TODO: StorageManager の save() メソッドを呼び出すタイミングを検討する。
        // 例：
        // this.storageManager.save('settings', this.settings);

        // 設定が保存されたことを通知
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SETTINGS_SAVED, { detail: this.settings }));
        this.eventBus.publish(GAME_EVENTS.SETTINGS_SAVED, this.settings); // EventBus を使ってイベントを発行
    }


    //loadSettings() { return storageManager.load('settings') || { ...this.defaults }; }

    _validate(key, value) {
        const rule = GameSettingsManager.VALIDATION_RULES[key];
        if (!rule) {
            return true; // ルールが定義されていない場合はバリデーションを通過
        }

        switch (key) {
            case 'difficulty':
                // TODO: rule.special が複数ある場合に対応できるようにする。
                return (
                    typeof value === rule.type &&
                    value >= rule.min &&
                    value <= rule.max ||
                    value === rule.special
                );
            case 'noteNameType':
            case 'gameMode':
                // TODO: rule.values が SETTING_KEYS の値を直接参照するように変更する。
                return rule.values.includes(value);
            // 他の設定項目のバリデーションを追加
            default:
                return true; // デフォルトではバリデーションを通過
        }
        // TODO: バリデーションに失敗した場合、エラーイベントを発行することを検討する。
    }
}

export class GameScoreManager {
    /* 
    ## ゲーム概要
    
    **目的:**
    
    * 60秒の制限時間内に、ハイスコアを目指すスコアアタックゲーム。
    
    **ゲームオーバー条件:**
    
    * ライフが0になる（最大3）。
    * 制限時間が終了する。
    
    **ゲームクリア:**
    
    * ゲームクリアという概念はない。
    
    **難易度:**
    
    * 難易度設定あり。スコア計算には影響なし。
    * TODO: 正解文字数が10の倍数ごとに難易度上昇。GameScoreManagerではなく、GameManager か GameQuestionGenerator で管理した方がよい。
    
    ## スコア計算
    
    * **基本スコア:**
        * 1文字正解につき10点。
    * **コンボ:**
        * 問題ごとに連続正解でコンボ数が増加。
        * スコア = 基本スコア × コンボ数。
        * ボーナス: コンボが10の倍数ごとにライフ+1、制限時間+3秒。
    * **問題:**
        * 1問2～8文字。
        * 正解で制限時間+1秒。 TODO: GameQuestionGeneratorに移動したほうがよいかも。
    * **ミス:**
        * ミスタイプ1回につき、ライフ-1。
    
    ## その他
    
    * 難易度設定はゲームの難易度のみ調整。
    
    // TODO: このコメントは、クラスの設計が変更された場合に、適宜更新する必要がある。
     */

    // static 定数
    static BASE_SCORE_PER_CHARACTER = 10; // 1文字正解あたりの基本スコア
    static COMBO_BONUS_THRESHOLD = 10; // コンボボーナスの閾値
    static INITIAL_LIVES = 3; // 初期ライフ
    static MAX_LIVES = 3; // 最大ライフ
    static DEFAULT_SCORE = 0; // 初期スコア
    static DEFAULT_COMBO = 0; // 初期コンボ
    static TIME_LIMIT_WARNING_MULTIPLIER = 1.5; // タイムリミット警告中のスコア倍率
    // TODO: 今後、ゲームのバランス調整を行う際に、これらの定数を変更するだけで済むようにしておく。

    /* 現在のゲームスコアを管理 */
    constructor(options = {}) {
        this.eventBus = options.eventBus;
        // TODO: オプションが不足していた場合の処理を追加することを検討する。
        this.score = GameScoreManager.DEFAULT_SCORE;
        this.highScore = 0;
        this.combo = GameScoreManager.DEFAULT_COMBO;
        this.lives = GameScoreManager.INITIAL_LIVES;
        this.correctCount = 0;
        this.incorrectCount = 0;

        // this.settingsManager.addEventListener(GAME_EVENTS.SETTINGS_UPDATED, this.handleSettingsUpdated.bind(this));
        // this.settingsManager.addEventListener(GAME_EVENTS.SETTINGS_APPLIED, this.handleSettingsApplied.bind(this));
        // this.settingsManager.addEventListener(GAME_EVENTS.SETTINGS_RESET, this.handleSettingsReset.bind(this));
        // TODO:settingsManager のイベントがコメントアウトされているが、これは、GameManager で購読することになったためですね。問題ない。


        this.isTimeLimitWarningActive = false; // タイムリミット警告中かどうか
        this.gameTimeLimitTimer = options.gameTimeLimitTimer;

        // this.gameTimeLimitTimer.addEventListener('timeLimitWarning', this.handleTimeLimitWarning.bind(this));
        // this.gameTimeLimitTimer.addEventListener('timeLimitEnded', this.handleTimeLimitEnded.bind(this));
        this.eventBus.subscribe(GAME_EVENTS.TIME_LIMIT_WARNING, this.handleTimeLimitWarning.bind(this)); // EventBus を使ってイベントを購読
        this.eventBus.subscribe(GAME_EVENTS.TIME_LIMIT_ENDED, this.handleTimeLimitEnded.bind(this)); // EventBus を使ってイベントを購読

        this.settingsManager = options.settingsManager;
        this.comboBonusThreshold = 10; // コンボボーナスの閾値
        this.lastComboBonus = 0; // 最後にコンボボーナスを得たコンボ数
        this.gameTimeLimitTimer = options.gameTimeLimitTimer;
        this.gameDomManager = options.gameDomManager;
        this.eventTarget = new EventTarget();

    }


    // TODO: GameScoreManager にて settingsManager からのイベントを受け取る処理は、GameManager で処理するようになったため、不要になっているか、もしくは、処理内容を調整する必要がありそう。
    handleSettingsUpdated(event) {
        console.log("Settings Updated:", event.detail);
        // 設定が更新された時の処理
        // 例：更新された設定を反映する
        this.difficulty = this.settingsManager.get('difficulty');
        this.noteNameType = this.settingsManager.get('noteNameType');
        this.gameMode = this.settingsManager.get('gameMode');
    }

    handleSettingsApplied(event) {
        console.log("Settings Applied:", event.detail);
        // 設定が適用された時の処理
        // 例：DOMを更新する
    }

    handleSettingsReset(event) {
        console.log("Settings Reset");
        // 設定がリセットされた時の処理
        // 例：DOMを初期状態に戻す
    }

    handleTimeLimitWarning() {
        console.log("Time limit warning received!");
        this.isTimeLimitWarningActive = true; // タイムリミット警告中フラグを立てる
    }

    handleTimeLimitEnded() {
        console.log("Time limit ended!");
        this.isTimeLimitWarningActive = false; // タイムリミット警告中フラグを下ろす
    }


    // スコアを加算する
    addScore(correctCharCount) {
        // TODO: correctCharCount が数値であることをチェックする。
        if (typeof correctCharCount !== 'number') {
            console.error(`Invalid correctCharCount: ${correctCharCount}`);
            return;
        }
        // TODO: correctCharCountは、GameManagerのcheckAnswer()でカウントして、addScore()に渡す必要がある。
        const baseScore = GameScoreManager.BASE_SCORE_PER_CHARACTER; // 1文字正解あたりの基本スコア
        let scoreToAdd = baseScore * correctCharCount * this.combo;

        // タイムリミット警告中ならスコアを1.5倍にする
        if (this.isTimeLimitWarningActive) {
            scoreToAdd *= GameScoreManager.TIME_LIMIT_WARNING_MULTIPLIER; // static定数を使う
        }

        this.score += scoreToAdd;
        this.combo++;

        // コンボボーナスのチェック
        if (this.combo >= this.comboBonusThreshold && this.combo - this.lastComboBonus >= this.comboBonusThreshold) {
            // TODO: この条件が意図した通りに動作するか、再度確認する。
            this.gainLife(); // ライフ+1
            this.gameTimeLimitTimer.change(3); // 制限時間+3秒
            this.lastComboBonus = this.combo; // 最後にボーナスを得たコンボ数を更新
            // TODO: コンボボーナスを獲得したことを通知するイベントを発行することを検討する。
            // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.COMBO_BONUS_GAINED, { detail: this.combo }));
        }

        // TODO: ハイスコアの更新は、ゲーム終了時に行う方が良いかもしれない。
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_UPDATED, { detail: this.score }));
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.COMBO_UPDATED, { detail: this.combo }));
        this.eventBus.publish(GAME_EVENTS.SCORE_UPDATED, this.score); // EventBus を使ってイベントを発行
        this.eventBus.publish(GAME_EVENTS.COMBO_UPDATED, this.combo); // EventBus を使ってイベントを発行
    }


    // スコアを減算する
    subtractScore(points) {
        // TODO: スコアを減算する処理を実装する。
        // TODO: 減算するポイントが負の値でないことをチェックする。
        if (typeof points !== 'number' || points < 0) {
            console.error(`Invalid points: ${points}`);
            return;
        }
        // TODO: スコアが0未満にならないようにする。
        this.score = Math.max(0, this.score - points);
        // TODO: スコアが減算されたことを通知するイベントを発行することを検討する。
        // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_SUBTRACTED, { detail: this.score }));
        this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_UPDATED, { detail: this.score }));
    }

    // コンボ数をリセットする
    resetCombo() {
        this.combo = 0;

        // コンボがリセットされたことを通知するイベントを発行
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.COMBO_UPDATED, { detail: this.combo }));
        this.eventBus.publish(GAME_EVENTS.COMBO_UPDATED, this.combo); // EventBus を使ってイベントを発行
    }

    // ライフを減らす
    loseLife() {
        this.lives--;
        if (this.lives < 0) {
            this.lives = 0;
        }
        this.resetCombo(); // コンボをリセット

        // ライフが0になったことを通知するイベントを発行
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.LIVES_UPDATED, { detail: this.lives }));
        this.eventBus.publish(GAME_EVENTS.LIVES_UPDATED, this.lives); // EventBus を使ってイベントを発行

        if (this.lives === 0) {
            // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.LIVES_EMPTY, { detail: this.lives }));
            this.eventBus.publish(GAME_EVENTS.LIVES_EMPTY, this.lives); // EventBus を使ってイベントを発行
        }
    }

    // ライフを増やす
    gainLife() {
        // TODO: ライフが最大値を超えないようにする。
        this.lives = Math.min(GameScoreManager.MAX_LIVES, this.lives + 1);

        // 通知
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.LIVES_UPDATED, { detail: this.lives }));
        this.eventBus.publish(GAME_EVENTS.LIVES_UPDATED, this.lives); // EventBus を使ってイベントを発行
    }

    // 正解数をカウントする
    incrementCorrectCount() {
        this.correctCount++;
        // TODO: 正解数が更新されたことを通知するイベントを発行することを検討する。
        // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.CORRECT_COUNT_UPDATED, { detail: this.correctCount }));
    }

    // 不正解数をカウントする
    incrementIncorrectCount() {
        this.incorrectCount++;
        // TODO: 不正解数が更新されたことを通知するイベントを発行することを検討する。
        // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.INCORRECT_COUNT_UPDATED, { detail: this.incorrectCount }));
    }

    // スコアをリセットする
    resetScore() {
        this.score = GameScoreManager.DEFAULT_SCORE;
        this.combo = GameScoreManager.DEFAULT_COMBO;
        this.lives = GameScoreManager.INITIAL_LIVES;
        this.correctCount = 0;
        this.incorrectCount = 0;


        // スコアがリセットされたことを通知するイベントを発行
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_UPDATED, { detail: this.score }));
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.COMBO_UPDATED, { detail: this.combo }));
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.LIVES_UPDATED, { detail: this.lives }));
        this.eventBus.publish(GAME_EVENTS.SCORE_UPDATED, this.score); // EventBus を使ってイベントを発行
        this.eventBus.publish(GAME_EVENTS.COMBO_UPDATED, this.combo); // EventBus を使ってイベントを発行
        this.eventBus.publish(GAME_EVENTS.LIVES_UPDATED, this.lives); // EventBus を使ってイベントを発行
    }

    // ハイスコアを更新する
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            // TODO: ハイスコアが更新されたことを通知するイベントを発行することを検討する。
            // 例：this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.HIGH_SCORE_UPDATED, { detail: this.highScore }));
        }
    }

    addBonusScore() {
        const bonusPoints = 50; // ボーナスポイント
        this.score += bonusPoints;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        // 通知
        //this.eventTarget.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_UPDATED, { detail: this.score }));
        this.eventBus.publish(GAME_EVENTS.SCORE_UPDATED, this.score); // EventBus を使ってイベントを発行
        console.log(`Time limit bonus added: +${bonusPoints} points`);


    }


    // スコアを表示する
    displayScore() {
        // TODO: このメソッドはデバッグ用なので、リリース時には削除するか、デバッグモードでのみ実行されるように変更することを検討する。
        console.log(`displayScore() called.
            スコア: ${this.score}
            ハイスコア: ${this.highScore}
            コンボ: ${this.combo}
            ライフ: ${this.lives}
            正解数: ${this.correctCount}
            不正解数: ${this.incorrectCount}`);
    }
}
// ========================================
// 3. ゲームロジック
// ========================================
// TODO: モジュール化した場合はインポート
//import { NOTE_DATA_KEYS, NOTE_DATA, NOTE_GROUPS, pushArray, removeArray } from './NOTE_DATA.mjs'; // インポートが必要なため追加
import { GameSettingsManager } from './GameCore.mjs'; // GameSettingsManager を参照するために追加

export class GameQuestionGenerator {
    /* 
    設定（モード、音名タイプ、難易度など）に応じて問題オブジェクト作成とリターン。
    モード1:
        question:音名（日本語、英語、ドイツ語） 
        answer: midiNumber（鍵盤を弾く）
    モード2:
        question:楽譜（画像） 
        answer: midiNumber（鍵盤を弾く）
    モード3:
        question:音（Tone.jsかな？）
        answer:answer: midiNumber（鍵盤を弾く）
    問題オブジェクト：questionになるデータ、answerになるデータ
     */

    // 難易度と出題音の対応表
    static ALTERD_NOTES = {
        1: [NOTE_DATA_KEYS.E_FLAT, NOTE_DATA_KEYS.F_SHARP, NOTE_DATA_KEYS.A_FLAT, NOTE_DATA_KEYS.B_FLAT], // Eb F# Ab Bb
        2: [NOTE_DATA_KEYS.C_SHARP, NOTE_DATA_KEYS.D_SHARP, NOTE_DATA_KEYS.G_SHARP], // C# D# G#
        3: [NOTE_DATA_KEYS.C_FLAT, NOTE_DATA_KEYS.E_SHARP, NOTE_DATA_KEYS.F_FLAT, NOTE_DATA_KEYS.B_SHARP], // Cb, E#, Fb, B#
        // ダブルシャープ、ダブルフラット
        // 91: [NOTE_DATA_KEYS.F_DOUBLE_SHARP, NOTE_DATA_KEYS.C_DOUBLE_SHARP, NOTE_DATA_KEYS.G_DOUBLE_SHARP], // F## C## G##
        // 92: [NOTE_DATA_KEYS.B_DOUBLE_FLAT, NOTE_DATA_KEYS.E_DOUBLE_FLAT, NOTE_DATA_KEYS.A_DOUBLE_FLAT], // Bbb Ebb Abb
        // 93: [NOTE_DATA_KEYS.D_DOUBLE_SHARP, NOTE_DATA_KEYS.A_DOUBLE_SHARP], // Dx Ax
        // 94: [NOTE_DATA_KEYS.D_DOUBLE_FLAT, NOTE_DATA_KEYS.A_DOUBLE_FLAT], // Dbb Abb
    };
    static STATIC_NOTE_GROUPS = {
        1: pushArray(NOTE_DATA_KEYS.WHITE_KEYS, this.constructor.ALTERD_NOTES[1]),
        2: pushArray(NOTE_DATA_KEYS.WHITE_KEYS, this.constructor.ALTERD_NOTES[2]),
        3: pushArray(NOTE_DATA_KEYS.WHITE_KEYS, this.constructor.ALTERD_NOTES[1], this.constructor.ALTERD_NOTES[2]),
        4: removeArray(NOTE_DATA_KEYS.ALL_ALTERED_FLAT_SHARP, this.constructor.ALTERD_NOTES[3]),
    }
    static difficultyNoteConfig = {
        1: { noteNumMin: 1, noteNumMax: 2, noteData: [NOTE_DATA_KEYS.C_NATURAL, NOTE_DATA_KEYS.E_NATURAL, NOTE_DATA_KEYS.G_NATURAL] }, // C E G
        2: { noteNumMin: 1, noteNumMax: 2, noteData: [NOTE_DATA_KEYS.C_NATURAL, NOTE_DATA_KEYS.F_NATURAL, NOTE_DATA_KEYS.A_NATURAL] }, // C F A
        3: { noteNumMin: 1, noteNumMax: 3, noteData: [NOTE_DATA_KEYS.D_NATURAL, NOTE_DATA_KEYS.G_NATURAL, NOTE_DATA_KEYS.G_NATURAL] }, // D G B
        4: { noteNumMin: 1, noteNumMax: 4, noteData: NOTE_GROUPS.WHITE_KEYS },// 白鍵
        // 白鍵 | Eb F# Ab Bb
        5: { noteNumMin: 1, noteNumMax: 4, noteData: this.constructor.STATIC_NOTE_GROUPS[1] },
        6: { noteNumMin: 2, noteNumMax: 6, noteData: this.constructor.STATIC_NOTE_GROUPS[1] },
        7: { noteNumMin: 4, noteNumMax: 8, noteData: this.constructor.STATIC_NOTE_GROUPS[1] },
        8: { noteNumMin: 8, noteNumMax: 8, noteData: this.constructor.STATIC_NOTE_GROUPS[1] },
        // 白鍵 | C# D# G#
        9: { noteNumMin: 4, noteNumMax: 4, noteData: this.constructor.STATIC_NOTE_GROUPS[2] },
        10: { noteNumMin: 4, noteNumMax: 6, noteData: this.constructor.STATIC_NOTE_GROUPS[2] },
        // 白鍵 Eb F# Ab Bb | C# D# G#
        11: { noteNumMin: 6, noteNumMax: 8, noteData: this.constructor.STATIC_NOTE_GROUPS[3] },
        12: { noteNumMin: 8, noteNumMax: 8, noteData: this.constructor.STATIC_NOTE_GROUPS[3] },
        // Cb,E#,Fb,B#を除く、♮♭♯全部
        13: { noteNumMin: 4, noteNumMax: 4, noteData: this.constructor.STATIC_NOTE_GROUPS[4] },
        14: { noteNumMin: 4, noteNumMax: 8, noteData: this.constructor.STATIC_NOTE_GROUPS[4] },
        //♮♭♯全部
        15: { noteNumMin: 4, noteNumMax: 4, noteData: NOTE_DATA_KEYS.ALL_ALTERED_FLAT_SHARP },
        16: { noteNumMin: 4, noteNumMax: 8, noteData: NOTE_DATA_KEYS.ALL_ALTERED_FLAT_SHARP },
        // TODO:他も作る
        // ♮♭♯全部 + (Fx Cx Gx)
        // ♮♭♯全部 + (Fx Cx Gx) + (Bbb Ebb Abb)
        // ♮♭♯全部 + (Fx Cx Gx) + (Bbb Ebb Abb) + (Dx Ax)
        // Dbb Gbb
        // ♮ ♭ ♯ x bb 全部


        99: [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75]// bb, b, ♮, #, x全部
    };

    constructor(options = {}) {
        // 引数チェック
        if (!options || !options.settingsManager) {
            throw new Error(`[GameQuestionGenerator] constructor: options.settingsManager is required.`);
        }
        this.settingsManager = options.settingsManager;

        // デフォルト値
        this.DEFAULT_GAME_MODE = this.settingsManager.defaults.gameMode;
        this.DEFAULT_NOTE_NAME_TYPE = this.settingsManager.defaults.noteNameType;
        this.DEFAULT_DIFFICULTY = this.settingsManager.defaults.difficulty;

        //TODO: 他のゲームモードに対応するための準備をしましょう
        // TODO: GameQuestionGenerator のコンストラクタで、options.mode が不正だった場合の処理を追加する。
    }

    generateQuestions(options) {
        // TODO: generateQuestions()で、生成する問題の数を引数として指定できるようにする。
        // 引数のチェックとデフォルト値の設定
        const gameMode = options.gameMode || this.DEFAULT_GAME_MODE; // this.constructor.DEFAULT_GAME_MODE を this.DEFAULT_GAME_MODE に修正
        const difficulty = options.difficulty || this.DEFAULT_DIFFICULTY; // this.constructor.DEFAULT_DIFFICULTY を this.DEFAULT_DIFFICULTY に修正
        const noteNameType = options.noteNameType || this.DEFAULT_NOTE_NAME_TYPE; // this.constructor.DEFAULT_NOTE_NAME_TYPE を this.DEFAULT_NOTE_NAME_TYPE に修正

        // 引数の型チェック
        if (typeof gameMode !== 'string') {
            throw new Error(`Invalid gameMode: ${gameMode}`);
        }
        if (typeof difficulty !== 'number') {
            throw new Error(`Invalid difficulty: ${difficulty}`);
        }
        if (typeof noteNameType !== 'string') {
            throw new Error(`Invalid noteNameType: ${noteNameType}`);
        }

        // 引数の値チェック
        if (!Object.values(GameSettingsManager.SETTING_KEYS.GAME_MODE).includes(gameMode)) { // SettingsManager を GameSettingsManager に修正
            throw new Error(`Invalid gameMode: ${gameMode}`);
        }
        if (!Object.values(GameSettingsManager.SETTING_KEYS.DIFFICULTY).includes(difficulty)) { // SettingsManager を GameSettingsManager に修正
            throw new Error(`Invalid difficulty: ${difficulty}`);
        }
        if (!Object.values(GameSettingsManager.SETTING_KEYS.NOTE_NAME_TYPE).includes(noteNameType)) { // SettingsManager を GameSettingsManager に修正
            throw new Error(`Invalid noteNameType: ${noteNameType}`);
        }

        // ... (問題生成ロジック)
        //TODO: 他のオブジェクトに名前がかぶってしまっているので変更する
        const noteNumMin = options.noteNumMini || this.constructor.difficultyNoteConfig[difficulty].noteNumMin;
        const noteNumMax = options.noteNumMax || this.constructor.difficultyNoteConfig[difficulty].noteNumMax;
        const noteData = options.noteData || this.constructor.difficultyNoteConfig[difficulty].noteData;
        let questions = [];
        const optionsForGenerate = {
            difficulty: difficulty,
            noteNameType: noteNameType,
            noteNumMin: noteNumMin,
            noteNumMax: noteNumMax,
            noteData: noteData,
        };

        // ゲームモードに基づいて問題を生成するロジック
        switch (gameMode) {
            case GameSettingsManager.SETTING_KEYS.GAME_MODE[1]: questions = this._generateQuestionsMode1(optionsForGenerate); break; // SettingsManager を GameSettingsManager に修正
            case GameSettingsManager.SETTING_KEYS.GAME_MODE[2]: questions = this._generateQuestionsMode2(optionsForGenerate); break; // SettingsManager を GameSettingsManager に修正
            case GameSettingsManager.SETTING_KEYS.GAME_MODE[3]: questions = this._generateQuestionsMode3(optionsForGenerate); break; // SettingsManager を GameSettingsManager に修正
            // その他のゲームモードに対応
            default:
                questions = this._generateQuestionsMode1(optionsForGenerate);
            // TODO: 未知のゲームモードが指定された場合の処理を検討する。
        }

        return questions;
    }

    _generateQuestionsMode1(options) {
        //TODO: 他のオブジェクトに名前がかぶってしまっているので変更する
        const difficulty = options.difficulty;
        const noteNameType = options.noteNameType;
        const noteNumMin = options.noteNumMin;
        const noteNumMax = options.noteNumMax;
        const noteData = options.noteData;
        let questions = []; // optionsのquestionsではなく、ここで新規に配列を作る

        function getRandInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // 出題する音数を決める
        const currentNoteNum = getRandInt(noteNumMin, noteNumMax);

        // 重複しない乱数を生成する
        const selectedIndices = new Set();
        while (selectedIndices.size < currentNoteNum) {
            const randomIndex = getRandInt(0, noteData.length - 1);
            selectedIndices.add(randomIndex);
        }

        // 乱数を使って音名を取得する
        selectedIndices.forEach(index => {
            const noteDataId = noteData[index];
            const note = NOTE_DATA[noteDataId];
            const noteName = this.getNoteName(note, noteNameType);
            questions.push({
                noteName: noteName,
                midiNumber: note.midiNumber,
            });
        });

        return questions;
    }

    getNoteName(note, noteNameType) {
        switch (noteNameType) {
            case GameSettingsManager.SETTING_KEYS.NOTE_NAME_TYPE.JAPANESE: // SettingsManager を GameSettingsManager に修正
                return note.japanese;
            case GameSettingsManager.SETTING_KEYS.NOTE_NAME_TYPE.GERMAN: // SettingsManager を GameSettingsManager に修正
                return note.german;
            default:
                return note.english;
        }
    }

    _generateQuestionsMode2() {
        // TODO: _generateQuestionsMode2() のロジックを実装する。
    }
    _generateQuestionsMode3() {
        // TODO: _generateQuestionsMode3() のロジックを実装する。
    }
    //TODO: 他のモードで使うことができる共通の処理は関数化するとよい。
}

// TODO: モジュール化する際はインポートする
//import { GAME_EVENTS } from './GameCore.mjs'; // イベント名を使用するためにインポート

export class GameTimeLimitTimer extends EventTarget {
    /* 
    // 使用例
    const timer = new GameTimeLimitTimer({ dispatch: (action) => console.log(action) });

    timer.addEventListener('timeupdated', (event) => {
        console.log('Time updated:', event.detail);
    });

    timer.start();
    */

    static DEFAULT_INTERVAL = 1000;
    static MAX_SECONDS = 60;

    constructor(options = {}) { // オプションを必須ではなく任意にした
        super(); // EventTargetのコンストラクタを呼び出す
        this.eventBus = options.eventBus; // EventBus のインスタンスを受け取る

        // TODO: optionsに、タイマーの開始秒数、タイムリミット警告を発する秒数、タイムリミット終了を発する秒数などを設定できるようにするとよい。
        // TODO: optionsが指定されなかった場合の処理を検討する。
        this.dispatch = options.dispatch; // このプロパティの役割が明確ではないため、必要に応じて削除を検討する。
        this.seconds = options.seconds || GameTimeLimitTimer.MAX_SECONDS;
        this.timer = null;
        this.isPaused = false;
        this.isEnded = false;
        this.startTime = null;
        this.endTime = null;
        this.interval = GameTimeLimitTimer.DEFAULT_INTERVAL;
        this.isTimeLimitWarningSent = false; // タイムリミット警告が送信されたかどうか
    }

    start(seconds = GameTimeLimitTimer.MAX_SECONDS) {
        // TODO: secondsが不正な値だった場合のエラー処理を追加する。
        this.seconds = seconds;
        this.startTime = Date.now();
        this.endTime = this.startTime + this.seconds * 1000;
        this.isEnded = false;
        this.isPaused = false;

        this.timer = setInterval(() => {
            this.updateTimer();
        }, this.interval);

        this.updateDisplay();
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isPaused = true;
    }

    change(deltaSeconds) {
        // TODO: deltaSecondsが不正な値だった場合のエラー処理を追加する。
        this.seconds += deltaSeconds;
        this.seconds = Math.max(0, Math.min(this.seconds, GameTimeLimitTimer.MAX_SECONDS)); // マイナス値にならないようにし、かつ最大値を超えないようにする
        this.endTime = Date.now() + this.seconds * 1000;
        this.updateDisplay();
    }

    updateTimer() {
        // TODO:  updateTimer の中で、elapsedTime と seconds の両方を更新しているが、実質的に同じ値を算出しているため、冗長である。どちらか一方を削除することを検討する。
        // const elapsedTime = Math.floor((this.endTime - Date.now()) / 1000); // 削除予定
        // this.seconds = Math.max(0, elapsedTime);
        this.seconds = Math.max(0, Math.floor((this.endTime - Date.now()) / 1000)); // 秒数を再計算
        this.updateDisplay();

        if (this.seconds <= 10 && !this.isTimeLimitWarningSent) {
            this.isTimeLimitWarningSent = true;

            // タイムリミット警告イベントを発行
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.TIME_LIMIT_WARNING)); 
            this.eventBus.publish(GAME_EVENTS.TIME_LIMIT_WARNING); // EventBus を使ってイベントを発行
        }

        if (this.seconds <= 0) {
            this.ended();

            // タイムリミット終了イベントを発行
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.TIME_LIMIT_ENDED)); 
            this.eventBus.publish(GAME_EVENTS.TIME_LIMIT_ENDED); // EventBus を使ってイベントを発行
        }
    }

    updateDisplay() {
        //this.dispatchEvent(new CustomEvent(GAME_EVENTS.TIME_UPDATED, { detail: this.seconds })); //イベント名を変更
        this.eventBus.publish(GAME_EVENTS.TIME_UPDATED, this.seconds); // EventBus を使ってイベントを発行
        if (this.dispatch) {
            this.dispatch({ type: 'UPDATE_TIME', payload: this.seconds });
        }
    }

    ended() {
        this.isEnded = true;
        this.stop();
        console.log("タイマー終了！");
        // TODO: GAME_EVENTS.につくる？

    }


    reset() {
        this.stop();
        this.seconds = GameTimeLimitTimer.MAX_SECONDS;
        this.isEnded = false;
        this.isPaused = false;
        this.startTime = null;
        this.endTime = null;
        this.updateDisplay();
        this.isTimeLimitWarningSent = false;
    }
    // TODO: reset() の中で、this.elapsedTime = 0; が削除されているが、本当に不要かどうか、確認する。
}

// TODO: // TODO: モジュール化する際はインポートする
// import { GAME_EVENTS } from './GameCore.mjs';

export class GameCounter extends EventTarget {
    constructor(options = {}) {
        super();
        this.eventBus = options.eventBus; // EventBus のインスタンスを受け取る
        // 管理するカウンターをオブジェクトとして定義
        this.counters = {
            questionCount: 0, // 出題された問題数
            round: 0, // ラウンド数
            level: 1, // レベル（仮）
            gamePlayCount: 0, //ゲームのプレイ回数
            lastPlayDate: null,//最終プレイ日
            sessionPlayCount: 0,//セッションプレイ回数（ブラウザを閉じるとリセット）
        };
    }

    /**
     * 指定されたカウンターをインクリメントする。
     * @param {string} counterName - カウンターの名前
     */
    increment(counterName) {
        // TODO: counterNameが不正な値だった場合のエラー処理を追加する。
        if (!this.counters.hasOwnProperty(counterName)) {
            console.error(`[GameCounter] increment: Invalid counterName: ${counterName}`);
            return;
        }
        this.counters[counterName]++;

        // 通知
        //this.dispatchEvent(new CustomEvent(GAME_EVENTS.COUNTER_UPDATED, { detail: { counterName, value: this.counters[counterName] } }));
        this.eventBus.publish(GAME_EVENTS.COUNTER_UPDATED, { counterName, value: this.counters[counterName] }); // EventBus を使ってイベントを発行
    }

    /**
     * 指定されたカウンターをデクリメントする。
     * @param {string} counterName - カウンターの名前
     */
    decrement(counterName) {
        // TODO: counterNameが不正な値だった場合のエラー処理を追加する。
        if (!this.counters.hasOwnProperty(counterName)) {
            console.error(`[GameCounter] decrement: Invalid counterName: ${counterName}`);
            return;
        }
        this.counters[counterName]--;

        // 通知
        //this.dispatchEvent(new CustomEvent(GAME_EVENTS.COUNTER_UPDATED, { detail: { counterName, value: this.counters[counterName] } }));
        this.eventBus.publish(GAME_EVENTS.COUNTER_UPDATED, { counterName, value: this.counters[counterName] }); // EventBus を使ってイベントを発行
    }

    /**
     * 指定されたカウンターをリセットする。
     * @param {string} counterName - カウンターの名前
     * @param {number} value - リセットする値(省略可能。省略した場合は0)
     */
    reset(counterName, value = 0) {
        // TODO: counterNameが不正な値だった場合のエラー処理を追加する。
        if (!this.counters.hasOwnProperty(counterName)) {
            console.error(`[GameCounter] reset: Invalid counterName: ${counterName}`);
            return;
        }
        this.counters[counterName] = value;

        // 通知
        //this.dispatchEvent(new CustomEvent(GAME_EVENTS.COUNTER_UPDATED, { detail: { counterName, value: this.counters[counterName] } }));
        this.eventBus.publish(GAME_EVENTS.COUNTER_UPDATED, { counterName, value: this.counters[counterName] }); // EventBus を使ってイベントを発行
    }

    /**
     * 指定されたカウンターの値を返す
     * @param {string} counterName - カウンターの名前
     * @returns {number} カウンターの値
     */
    get(counterName) {
        // TODO: counterNameが不正な値だった場合のエラー処理を追加する。
        if (!this.counters.hasOwnProperty(counterName)) {
            console.error(`[GameCounter] get: Invalid counterName: ${counterName}`);
            return;
        }
        return this.counters[counterName];
    }

    /**
     * 指定されたカウンターの値を設定する
     * @param {string} counterName - カウンターの名前
     * @param {number} value - 設定する値
     */
    set(counterName, value) {
        // TODO: counterNameが不正な値だった場合のエラー処理を追加する。
        if (!this.counters.hasOwnProperty(counterName)) {
            console.error(`[GameCounter] set: Invalid counterName: ${counterName}`);
            return;
        }
        this.counters[counterName] = value;

        // 通知
        //this.dispatchEvent(new CustomEvent(GAME_EVENTS.COUNTER_UPDATED, { detail: { counterName, value: this.counters[counterName] } }));
        this.eventBus.publish(GAME_EVENTS.COUNTER_UPDATED, { counterName, value: this.counters[counterName] }); // EventBus を使ってイベントを発行
    }


    // TODO: 複数のカウンターをまとめてリセットするメソッドを追加する。
    // TODO: ブラウザを閉じたときに、セッション系のカウンターをリセットする処理を追加する。（window.onbeforeunload）
    // TODO: ブラウザを閉じたときに、永続化したいデータを保存する処理を追加する。（window.onbeforeunload）
    // TODO: テストコードを追加する。
}

// TODO: モジュール化する際はインポートする
//import { GAME_EVENTS } from './GameCore.mjs';

export class GameManager {
    constructor(options) {
        // TODO: options が指定されなかった場合のエラー処理を追加する。
        if (!options || !options.storageManager || !options.gameDomManager) {
            throw new Error('[GameManager] constructor: options is required.');
        }


        // TODO: オプションをオブジェクトで渡すように修正する。
        // オプションから必要なプロパティを取得
        this.eventBus = options.eventBus; // EventBus のインスタンスを受け取る
        this.storageManager = options.storageManager;
        this.domManager = options.gameDomManager;
        this.elements = options.domElements;

        // 初期化処理（インスタンス生成や初期値の設定）
        this.settingsManager = new GameSettingsManager({ loadedSettings: this.storageManager.load('settings'), eventBus: this.eventBus }); // EventBus を渡す
        this.questionGenerator = new GameQuestionGenerator({ settingsManager: this.settingsManager }); // 設定を渡す
        this.counter = new GameCounter();
        this.gameScoreManager = new GameScoreManager({
            gameDomManager: this.domManager,
            settingsManager: this.settingsManager,
            eventBus: this.eventBus // EventBus を渡す
        });
        this.timeLimitTimer = new GameTimeLimitTimer({ seconds: this.settingsManager.get('timeLimit'), eventBus: this.eventBus }); // 制限時間を渡す, EventBus を渡す
        this.counter = new GameCounter({ eventBus: this.eventBus }); // EventBus を渡す

        // イベントリスナーを設定
        this.setupEventListeners();
        this.setupGameDomManagerEventListeners();

        //初期化
        this.initialize();
    }

    setupEventListeners() {
        // TODO: メソッド名は統一感がある方がよい。「handleReplayButtonClicked」は、「handleReplayButtonClick」のように統一する。
        // document.addEventListener(GAME_EVENTS.START_BUTTON_CLICKED, this.handleStartButtonClicked.bind(this));   // スタートボタンクリックイベントを購読 // 修正
        // document.addEventListener(GAME_EVENTS.KEY_CLICKED, this.handleKeyClicked.bind(this));                    // 鍵盤クリックイベントを購読 // 修正
        // document.addEventListener(GAME_EVENTS.REPLAY_BUTTON_CLICKED, this.handleReplayButtonClick.bind(this)); // リプレイボタンクリックイベントを購読 // 修正
        // document.addEventListener(GAME_EVENTS.GAME_INITIALIZED, this.handleGameInitialized.bind(this));        // 初期化完了イベントを購読 // 修正
        this.eventBus.subscribe(GAME_EVENTS.START_BUTTON_CLICKED, this.handleStartButtonClicked.bind(this)); // EventBus を使ってイベントを購読
        this.eventBus.subscribe(GAME_EVENTS.KEY_CLICKED, this.handleKeyClicked.bind(this)); // EventBus を使ってイベントを購読
        this.eventBus.subscribe(GAME_EVENTS.REPLAY_BUTTON_CLICKED, this.handleReplayButtonClick.bind(this)); // EventBus を使ってイベントを購読
        this.eventBus.subscribe(GAME_EVENTS.GAME_INITIALIZED, this.handleGameInitialized.bind(this)); // EventBus を使ってイベントを購読
    }

    setupGameDomManagerEventListeners() {
        // this.domManager.addEventListener(GAME_EVENTS.SCORE_UPDATED, (event) => {
        //     console.log("GameManager: SCORE_UPDATED event received", event.detail);
        //     // スコアが更新された時の処理
        // });
        // this.domManager.addEventListener(GAME_EVENTS.TIME_UPDATED, (event) => {
        //     console.log("GameManager: TIME_UPDATED event received", event.detail);
        //     // 時間が更新された時の処理
        // });
        // this.domManager.addEventListener(GAME_EVENTS.COMBO_UPDATED, (event) => {
        //     console.log("GameManager: COMBO_UPDATED event received", event.detail);
        //     // コンボが更新された時の処理
        // });
        // this.domManager.addEventListener(GAME_EVENTS.LIVES_UPDATED, (event) => {
        //     console.log("GameManager: LIVES_UPDATED event received", event.detail);
        //     // ライフが更新された時の処理
        // });
        // this.domManager.addEventListener(GAME_EVENTS.HIGH_SCORE_UPDATED, (event) => {
        //     console.log("GameManager: HIGH_SCORE_UPDATED event received", event.detail);
        //     // ハイスコアが更新された時の処理
        // });
        this.eventBus.subscribe(GAME_EVENTS.SCORE_UPDATED, (data) => { // EventBus を使ってイベントを購読
            console.log("GameManager: SCORE_UPDATED event received", data);
            // スコアが更新された時の処理
        });
        this.eventBus.subscribe(GAME_EVENTS.TIME_UPDATED, (data) => { // EventBus を使ってイベントを購読
            console.log("GameManager: TIME_UPDATED event received", data);
            // 時間が更新された時の処理
        });
        this.eventBus.subscribe(GAME_EVENTS.COMBO_UPDATED, (data) => { // EventBus を使ってイベントを購読
            console.log("GameManager: COMBO_UPDATED event received", data);
            // コンボが更新された時の処理
        });
        this.eventBus.subscribe(GAME_EVENTS.LIVES_UPDATED, (data) => { // EventBus を使ってイベントを購読
            console.log("GameManager: LIVES_UPDATED event received", data);
            // ライフが更新された時の処理
        });
        this.eventBus.subscribe(GAME_EVENTS.HIGH_SCORE_UPDATED, (data) => { // EventBus を使ってイベントを購読
            console.log("GameManager: HIGH_SCORE_UPDATED event received", data);
            // ハイスコアが更新された時の処理
        });
    }


    initialize() {
        // 設定を適用
        this.settingsManager.apply();

        // 初期状態を設定
        this.isData = {
            isGameActive: false, // ゲームがアクティブかどうか
            isGameOver: false, // ゲームが終了したかどうか
            isFirstQuestion: true, // 最初の問題かどうか（タイマースタート用）
        };

        // question系をオブジェクトで管理
        this.questionData = {
            questions: [], // 問題の配列（空で初期化）
            currentQuestionIndex: 0, // 現在の問題のインデックス
            currentQuestion: null, // 現在の問題
            questionCount: 0, // 問題の数
        };

        // ゲーム設定を取得
        // TODO: settings系のデータは、まとめたほうがよい
        this.difficulty = this.settingsManager.get('difficulty'); // 難易度
        this.noteNameType = this.settingsManager.get('noteNameType'); // 音名タイプ
        this.gameMode = this.settingsManager.get('gameMode'); // ゲームモード
        this.timeLimit = this.settingsManager.get('timeLimit')

        // ゲームのスコア管理クラスを初期化
        this.gameScoreManager.resetScore();

        //DOM要素をリセット
        this.domManager.reset();
    }



    handleGameInitialized() {
        console.log("GameManager: GAME_INITIALIZED event received");
        // 初期化処理
        this.initialize();
    }

    handleStartButtonClicked() {
        console.log("GameManager: START_BUTTON_CLICKED event received");
        // 例：オープニングセクションを非表示、ゲームセクションを表示
        this.domManager.toggleElementVisibility({
            hide: "#opening-section",
            show: "#game-section"
        });
        this.startGame();
    }

    startGame() {
        // TODO: ゲームスタートの処理が整理されていないので、整理する。
        // TODO: start時に、再スタート時はすでにaudicontextがある。という問題に注意する。
        // ゲーム開始時に実行する処理
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); // AudioContextを初期化
        }
        // ゲーム開始時に設定を適用
        this.settingsManager.apply();

        this.questionData.questions = this.questionGenerator.generateQuestions({
            gameMode: this.gameMode,
            difficulty: this.difficulty,
            noteNameType: this.noteNameType
        }); // 問題を生成
        this.questionData.questionCount = this.questionData.questions.length; // 問題数を設定
        this.nextQuestion()

        this.timeLimitTimer.start(this.timeLimit); //GameTimeLimitTimer をスタートさせる。

        // TODO: 正常にゲームがスタートしたらかな？
        this.isData.isGameActive = true; // ゲームがアクティブ
    }

    handleKeyClicked(event) {
        console.log("GameManager: KEY_CLICKED event received", event.detail.note);
        // 採点
        this.checkAnswer(event.detail.note);
    }

    checkAnswer(userAnswer) {
        /* 
            // TODO: checkAnswer() で、正誤判定を行い、GameScoreManager のメソッドを使ってスコアを更新する。
            // TODO: checkAnswer()をリファクタリングする
            // TODO: 検討　checkAnswerするクラスは必要かな？わけておけばほかのゲームを作る時に差し替えだけとか？
            
         */
        // 正誤判定
        if (this.questionData.currentQuestion.midiNumber == userAnswer) {
            console.log("正解！")
            this.gameScoreManager.addScore(1);
        } else {
            console.log("不正解！")
            this.gameScoreManager.loseLife();
        }

        this.nextQuestion();
    }

    handleReplayButtonClick() {
        console.log("GameManager: REPLAY_BUTTON_CLICKED event received");
        this.replayGame();
    }

    replayGame() {
        //ゲームの初期状態に戻す
        this.initialize();
        //ゲームをスタート
        this.startGame();
    }

    updateDom() {
        // TODO: 
    }
    nextQuestion() {
        //次の問題を取得
        this.questionData.currentQuestionIndex++;
        if (this.questionData.currentQuestionIndex < this.questionData.questionCount) {
            // 次の問題が存在する場合
            this.questionData.currentQuestion = this.questionData.questions[this.questionData.currentQuestionIndex];
            this.domManager.updateQuestions(this.questionData.currentQuestion.noteName);
        } else {
            // すべての問題を終えた場合
            console.log("ゲーム終了！");
        }
    }
    saveSettings() {
        this.storageManager.save('settings', this.settingsManager.settings);
    }
}
