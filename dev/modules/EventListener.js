// EventListener.js
class EventListener {
    constructor() {
        this.listeners = {};  // イベントごとのリスナーを保持する
    }

    // イベントにリスナーを追加
    addListener(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    removeListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }

    // イベントが発生したときにリスナーを呼び出す
    notify(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}

export default EventListener;