// DictationUIController.js
import * as events from './events.js';

class DictationUIController {
    constructor(eventManager, elements) {

        this.eventManager = eventManager; // イベントの購読・発送
        this.elements = elements;  // HTMLエレメント
        if (!this.elements.scoreSelect || !this.elements.startBtn || !this.elements.stopBtn) {
            throw new Error("UI elements are missing.");
        }
        this.statusMessages = {
            ERROR: "エラーが発生しました",
            PREPARING: "準備中...",
            READY: "準備完了",
            PLAYING: "再生中...",
            STOPPED: "停止中"
        };
        this.isPlaying = false;

        this.initEventListeners();
    }

    initEventListeners() {
        // UI初期化
        this.registerScoreSelectListener();// 楽譜選択時の処理
        this.registerStartButtonListener();
        this.registerStopButtonListener();

        //準備完了時（プレイヤーから発送される）
        this.registerReadyListener();

    }

    // 楽譜選択時の処理
    registerScoreSelectListener() {
        this.elements.scoreSelect.addEventListener('change', () => {
            const selectedScore = this.elements.scoreSelect.value;
            try {
                if (!this.isValidScore(selectedScore)) {
                    throw new Error(events.errors.score.CHANGE.message); // エラーメッセージをthrow
                }
                console.log('楽譜が変更されました');
                this.eventManager.dispatchEvent(events.score.CHANGE); // イベント発火
            } catch (error) {
                console.error('楽譜変更時にエラーが発生しました:', error);
                this.updateStatus(this.statusMessages.ERROR, events.errors.score.CHANGE.code, error.message); // エラーコードとメッセージを渡す
                throw error;
            }
        });
    }

    isValidScore(score) {
        // 楽譜の形式をチェックする
        if (!score || typeof score !== 'string') {
            return false; // スコアが存在しない、または文字列でない場合は無効
        }

        // 例: 拡張子チェック
        if (!score.endsWith('.musicxml')) { // 例: MusicXML ファイル
            return false;
        }

        // 他のチェック (ファイル内容の解析など) を追加
        return true;
    }

    registerStartButtonListener() {
        this.registerButtonListener(this.elements.startBtn, events.player.START_PLAYBACK, events.errors.player.START_PLAYBACK.code, true);
    }

    registerStopButtonListener() {
        this.registerButtonListener(this.elements.stopBtn, events.player.STOP_PLAYBACK, events.errors.player.STOP_PLAYBACK.code, false);
    }

    // 再生/停止ボタンクリック時の処理
    registerButtonListener(button, eventType, errorCode, isStartButton) {
        button.addEventListener('click', () => {
            this.handleButtonClick(eventType, errorCode, isStartButton);
        });
    }

    handleButtonClick(eventType, errorCode, isStartButton) {
        try {
            console.log(`${eventType}ボタンがクリックされました`);
            this.togglePlayButtons(isStartButton);
            this.eventManager.dispatchEvent(eventType);
        } catch (error) {
            console.error(`${eventType}処理中にエラーが発生しました:`, error);
            this.updateStatus(this.statusMessages.ERROR, errorCode, error.message); // エラーコードを渡す
            this.togglePlayButtons(!isStartButton);
            // throw error; // 上位に伝播させる場合はthrow
        }
    }




    // 準備完了時の処理
    registerReadyListener() {
        this.eventManager.addEventListener(events.player.READY, () => {
            try {
                console.log('準備完了: スタートボタンを有効化');
                this.togglePlayButtons(false);
            } catch (error) {
                console.error('準備完了処理中にエラーが発生しました:', error);
                this.updateStatus(this.statusMessages.ERROR, events.errors.player.READY.code, error.message); // エラーコードを渡す
                // throw error; // 上位に伝播させる場合はthrow
            }
        });
    }

    /**
     * ステータスバーのテキストを更新します。
     * @param {string} message - 表示するメッセージ
     */
    updateStatus(message, errorCode, errorMessage) {
        this.statusText.textContent = message;
        if (errorMessage) { // errorMessage が存在する場合のみアラートを表示
            switch (errorCode) {
                case events.errors.score.CHANGE.code:
                    alert(errorMessage);
                    break;
                case events.errors.player.START_PLAYBACK.code:
                    alert(errorMessage);
                    break;
                case events.errors.player.STOP_PLAYBACK.code:
                    alert(errorMessage);
                    break;
                case events.errors.player.READY.code:
                    alert(errorMessage);
                    break;
                default:
                    // その他のエラー
                    break;
            }
        }
    }

    // CSS クラスと aria-disabled 属性を組み合わせる例
    togglePlayButtons(isPlaying) {
        this.isPlaying = isPlaying;
        this.elements.startBtn.classList.toggle("disabled", isPlaying);
        this.elements.stopBtn.classList.toggle("disabled", !isPlaying);
        this.elements.startBtn.setAttribute("aria-disabled", isPlaying);
        this.elements.stopBtn.setAttribute("aria-disabled", !isPlaying);
    }

    // 他のUI更新が必要ならここに追加
}

export default DictationUIController;