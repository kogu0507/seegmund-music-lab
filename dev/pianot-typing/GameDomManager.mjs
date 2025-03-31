// GameDomManager.mjs

// 必要なモジュールをインポート
import { GAME_EVENTS } from './GameCore.mjs'; // イベント名を使用するためにインポート
import { GameScoreManager } from './GameCore.mjs';
import { GameTimeLimitTimer } from './GameCore.mjs';
import { EventBus, GAME_EVENTS } from './EventBus.mjs'; // EventBus と GAME_EVENTS をインポート

export class GameDomManager extends EventTarget {
    constructor({ domElements, eventBus } = {}) {
        super(); // EventTargetのコンストラクタを呼び出す

        // 引数チェック
        if (!domElements) {
            throw new Error(`[GameDomManager] constructor: domElements is required.`);
        }
        // 各要素が存在するかチェック
        const requiredElements = [
            "game-score-value",
            "game-time-limit-bar",
            "game-combo-value",
            "game-lives-value",
            "game-mode-1-question-display",
            "result-symbol",
            "ending-high-score",
            "ending-score-value",
            "ending-time-value",
            "game-section",
            "ending-section",
            "opening-section",
            "game-status-section",
        ];
        for (const elementId of requiredElements) {
            if (!domElements[elementId]) {
                throw new Error(`[GameDomManager] constructor: domElements.${elementId} is required.`);
            }
        }

        this.domElements = domElements;
        this.eventBus = eventBus; // EventBus のインスタンスをプロパティに格納

        // 各要素を取得し、プロパティに格納する
        this.scoreElement = this.domElements["game-score-value"]; // スコア表示要素
        this.timeLimitElement = this.domElements["game-time-limit-bar"]; // 残り時間表示要素
        this.comboElement = this.domElements["game-combo-value"]; // コンボ数表示要素
        this.livesElement = this.domElements["game-lives-value"]; // ライフ表示要素
        this.questionElement = this.domElements["game-mode-1-question-display"]; // 問題表示要素
        this.resultElement = this.domElements["result-symbol"]; // 結果表示要素
        this.highScoreElement = this.domElements["ending-high-score"]; // ハイスコア表示要素
        this.endingScoreElement = this.domElements["ending-score-value"]; // 最終スコア表示要素
        this.endingTimeElement = this.domElements["ending-time-value"]; // 最終タイム表示要素
        this.gameSectionElement = this.domElements["game-section"]; // ゲームセクション
        this.endingSectionElement = this.domElements["ending-section"]; // エンディングセクション
        this.openingSectionElement = this.domElements["opening-section"]; // オープニングセクション
        this.gameStatusSectionElement = this.domElements["game-status-section"]; // ゲームステータスセクション

        // TODO: コンストラクタで必要なDOM要素をすべて初期化するようにする。
        // 初期化処理
        this.reset();


        //ゲーム中の画面の表示・非表示を設定
        this.isGameSectionVisible = false; // ゲームセクションが表示されているかどうかの状態
    }


    /**
     * ゲーム画面を表示・非表示を切り替える。
     * @param {Object} options - 表示・非表示を切り替える要素の設定
     * @param {string} options.hide - 非表示にする要素のセレクタ
     * @param {string} options.show - 表示する要素のセレクタ
     */
    toggleElementVisibility(options) {
        const { hide, show } = options;
        if (typeof hide !== 'string' && typeof show !== 'string') {
            console.error(`[GameDomManager] toggleElementVisibility: Invalid arguments. Either hide or show must be a string.`);
            return;
        }
        if (hide) {
            const hideElement = document.querySelector(hide);
            if (!hideElement) {
                console.error(`[GameDomManager] toggleElementVisibility: Element not found: ${hide}`);
                return;
            }
            hideElement.classList.add('d-none');
        }
    
        if (show) {
            const showElement = document.querySelector(show);
            if (!showElement) {
                console.error(`[GameDomManager] toggleElementVisibility: Element not found: ${show}`);
                return;
            }
            showElement.classList.remove('d-none');
        }
    }
    

    showGameSection() {
        this.toggleElementVisibility({
            hide: "#opening-section",
            show: "#game-section"
        });
    }

    showEndingSection() {
        this.toggleElementVisibility({
            hide: "#game-section",
            show: "#ending-section"
        });
    }

    updateQuestions(noteName) {
        // TODO: noteName が不正な値だった場合のエラー処理を追加する。
        if (typeof noteName !== 'string') {
            console.error(`[GameDomManager] updateQuestions: Invalid noteName: ${noteName}`);
            return;
        }
        if (this.questionElement) {
            this.questionElement.textContent = noteName;
        }
    }

    updateScore(score) {
        // TODO: score が不正な値だった場合のエラー処理を追加する。
        if (typeof score !== 'number') {
            console.error(`[GameDomManager] updateScore: Invalid score type: ${typeof score}`);
            return;
        }
        if (score < 0) {
            console.warn(`[GameDomManager] updateScore: score is negative. Setting to 0.`);
            score = 0;
        }
        
        if (this.scoreElement) {
            this.scoreElement.textContent = `${score}`;

            // 通知
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_UPDATED, { detail: score })); // イベント発行
            this.eventBus.publish(GAME_EVENTS.SCORE_UPDATED, score); // EventBus を使ってイベントを発行
        }
    }

    updateTimeLimit(seconds) {
        // TODO: seconds が不正な値だった場合のエラー処理を追加する。
        if (typeof seconds !== 'number') {
            console.error(`[GameDomManager] updateTimeLimit: Invalid seconds type: ${typeof seconds}`);
            return;
        }
        if (seconds < 0) {
            console.warn(`[GameDomManager] updateTimeLimit: seconds is negative. Setting to 0.`);
            seconds = 0;
        }
        if (seconds > GameTimeLimitTimer.MAX_SECONDS) {
            console.warn(`[GameDomManager] updateTimeLimit: seconds is greater than MAX_SECONDS. Setting to MAX_SECONDS.`);
            seconds = GameTimeLimitTimer.MAX_SECONDS;
        }


        if (this.timeLimitElement) {
            this.timeLimitElement.style.width = `${(seconds / GameTimeLimitTimer.MAX_SECONDS) * 100}%`;

            // 通知
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.TIME_UPDATED, { detail: seconds })); // イベント発行
            this.eventBus.publish(GAME_EVENTS.TIME_UPDATED, seconds); // EventBus を使ってイベントを発行
        }
    }

    updateCombo(combo) {
        // TODO: combo が不正な値だった場合のエラー処理を追加する。
        if (typeof combo !== 'number') {
            console.error(`[GameDomManager] updateCombo: Invalid combo: ${combo}`);
            return;
        }
        if (this.comboElement) {
            this.comboElement.textContent = `${combo}`;
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.COMBO_UPDATED, { detail: combo })); // イベント発行
            this.eventBus.publish(GAME_EVENTS.COMBO_UPDATED, combo); // EventBus を使ってイベントを発行
        }
    }

    updateLives(lives) {
        // TODO: lives が不正な値だった場合のエラー処理を追加する。
        if (typeof lives !== 'number') {
            console.error(`[GameDomManager] updateLives: Invalid lives: ${lives}`);
            return;
        }
        if (this.livesElement) {
            this.livesElement.textContent = lives;
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.LIVES_UPDATED, { detail: lives }));
            this.eventBus.publish(GAME_EVENTS.LIVES_UPDATED, lives); // EventBus を使ってイベントを発行
        }
    }

    updateHighScore(highScore) {
        // TODO: highScore が不正な値だった場合のエラー処理を追加する。
        if (typeof highScore !== 'number') {
            console.error(`[GameDomManager] updateHighScore: Invalid highScore: ${highScore}`);
            return;
        }
        if (this.highScoreElement) {
            this.highScoreElement.textContent = highScore;
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.HIGH_SCORE_UPDATED, { detail: highScore }));
            this.eventBus.publish(GAME_EVENTS.HIGH_SCORE_UPDATED, highScore); // EventBus を使ってイベントを発行
        }
    }

    updateEndingScore(score) {
        // TODO: score が不正な値だった場合のエラー処理を追加する。
        if (typeof score !== 'number') {
            console.error(`[GameDomManager] updateEndingScore: Invalid score: ${score}`);
            return;
        }
        if (this.endingScoreElement) {
            this.endingScoreElement.textContent = score;
            // 通知
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.SCORE_UPDATED, { detail: score }));
            this.eventBus.publish(GAME_EVENTS.SCORE_UPDATED, score); // EventBus を使ってイベントを発行
        }
    }

    updateEndingTime(time) {
        // TODO: time が不正な値だった場合のエラー処理を追加する。
        if (typeof time !== 'number') {
            console.error(`[GameDomManager] updateEndingTime: Invalid time: ${time}`);
            return;
        }
        if (this.endingTimeElement) {
            this.endingTimeElement.textContent = time;
            // 通知
            //this.dispatchEvent(new CustomEvent(GAME_EVENTS.TIME_UPDATED, { detail: time }));
            this.eventBus.publish(GAME_EVENTS.TIME_UPDATED, time); // EventBus を使ってイベントを発行
        }
    }
    
    updateAllStatus() {
        // TODO: ここに、スコア、時間、コンボ、ライフ、問題、結果など、ゲームに必要なDOM要素を更新する処理を追加する。
        // 例：
        // this.updateScore(this.gameScoreManager.score);
        // this.updateTimeLimit(this.gameTimeLimitTimer.seconds);
        // this.updateCombo(this.gameScoreManager.combo);
        // this.updateLives(this.gameScoreManager.lives);
        // this.updateQuestions(this.gameQuestionGenerator.currentQuestion.noteName);
        // ...
    }
    

    reset() {
        this.updateScore(0);
        this.updateTimeLimit(GameTimeLimitTimer.MAX_SECONDS);
        this.updateCombo(0);
        this.updateLives(GameScoreManager.INITIAL_LIVES);
        this.updateQuestions("");
        this.updateHighScore(0);
        this.updateEndingScore(0);
        this.updateEndingTime(0);
        if (this.resultElement) {
            this.resultElement.textContent = "";
        }
        // ゲームセクションとエンディングセクションの表示状態を初期化
        if (this.gameSectionElement) {
            this.gameSectionElement.classList.add('d-none');
        }
        if (this.endingSectionElement) {
            this.endingSectionElement.classList.add('d-none');
        }
        if (this.openingSectionElement) {
            this.openingSectionElement.classList.remove('d-none');
        }
        if (this.gameStatusSectionElement) {
            this.gameStatusSectionElement.classList.remove('d-none');
        }
        console.log("GameDomManager reset");
    }
    
    // 他のDOM操作メソッド...
}
