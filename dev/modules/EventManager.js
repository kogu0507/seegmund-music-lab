// EventManager.js
import EventListener from './EventListener.js';
import EventDispatcher from './EventDispatcher.js';

class EventManager {
    constructor() {
        this.eventListener = new EventListener();  // イベントリスナーを管理
        this.eventDispatcher = new EventDispatcher();  // イベント発火を管理
    }

    // イベントリスナーを登録するメソッド
    registerListener(event, callback) {
        this.eventListener.addListener(event, callback);
    }

    // イベントを発火するメソッド
    triggerEvent(event, data) {
        this.eventDispatcher.dispatch(event, data);
    }

    // イベントを通知するメソッド
    notifyEvent(event, data) {
        this.eventListener.notify(event, data);
    }

    removeListener(event, callback) {
        this.eventListener.removeListener(event, callback);
        this.eventDispatcher.removeEvent(event, callback); // EventDispatcherにも対応
    }
}

export default EventManager;