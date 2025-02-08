import * as events from './events.js';
import { EventManager } from './EventManager.js';


class DictationEventManager extends EventManager {
    constructor(parentEventManager) { // 引数名を変更
        super();
        this.parentEventManager = parentEventManager; // プロパティ名を変更
        this.init();
    }

    init() {
        this.parentEventManager.removeListener(events.SCORE_CHANGE, this.handleScoreChange);
        this.parentEventManager.addListener(events.SCORE_CHANGE, this.handleScoreChange.bind(this));

        this.parentEventManager.removeListener(events.START_PLAYBACK, this.handleStartPlayback);
        this.parentEventManager.addListener(events.START_PLAYBACK, this.handleStartPlayback.bind(this));

        this.parentEventManager.removeListener(events.STOP_PLAYBACK, this.handleStopPlayback);
        this.parentEventManager.addListener(events.STOP_PLAYBACK, this.handleStopPlayback.bind(this));
    }

    handleScoreChange() {
        console.log('DictationEventManager: 楽譜変更');
        // 楽譜変更処理 (例: 楽譜データを更新)
    }

    handleStartPlayback() {
        console.log('DictationEventManager: 再生開始');
        // 再生開始処理 (例: 音楽再生を開始)
    }

    handleStopPlayback() {
        console.log('DictationEventManager: 停止');
        // 停止処理 (例: 音楽再生を停止)
    }
}

export default DictationEventManager;