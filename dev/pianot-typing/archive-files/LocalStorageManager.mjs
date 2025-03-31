// LocalStorageManager.mjs
class LocalStorageManager {
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('localStorageへの保存に失敗しました:', error);
        }
    }

    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('localStorageからの読み込みに失敗しました:', error);
            return null;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('localStorageからの削除に失敗しました:', error);
        }
    }

    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('localStorageのクリアに失敗しました:', error);
        }
    }
}

export default new LocalStorageManager();