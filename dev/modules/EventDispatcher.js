// EventDispatcher.js
class EventDispatcher {
    constructor() {
        this.events = {};  // イベントごとのコールバックを保持
    }

    // イベントを発火させる
    dispatch(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    // イベントにリスナーを登録
    addEvent(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    removeEvent(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== listener);
        }
    }
}

export default EventDispatcher;