// SettingsManager.mjs
import localStorageManager from './LocalStorageManager.mjs';

class SettingsManager {
    constructor() {
        this.defaults = {
            theme: 'light',
            fontSize: 16,
            notificationsEnabled: true,
        };
        this.settings = this.loadSettings();
    }

    apply() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        document.documentElement.style.fontSize = `${this.settings.fontSize}px`;
        // 他の設定を適用する処理...
    }

    get(key) {
        return this.settings[key] || this.defaults[key];
    }

    update(key, value) {
        this.settings[key] = value;
        this.saveSettings();
        this.apply();
    }

    reset() {
        this.settings = { ...this.defaults };
        this.saveSettings();
        this.apply();
    }

    saveSettings() {
        localStorageManager.save('settings', this.settings);
    }

    loadSettings() {
        return localStorageManager.load('settings') || { ...this.defaults };
    }
}

export default new SettingsManager();