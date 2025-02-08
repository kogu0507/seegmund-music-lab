
class DataStore {
    constructor() {
        this.data = new Map();
    }

    add(id, data) {
        if (!this.validate(data)) {
            console.error(`❌ データ登録失敗: 無効なデータ (${id})`, " ( class: DataStore )");
            return;
        }
        if (this.data.has(id)) {
            console.error(`❌ 登録失敗: ID '${id}' は既に存在します`, " ( class: DataStore )");
            return;
        }
        this.data.set(id, data);
        console.log(`✅ データ登録: ${id}`, " ( class: DataStore )");
    }

    remove(id) {
        if (this.data.has(id)) {
            this.data.delete(id);
            console.log(`️ データ削除: ${id}`, " ( class: DataStore )");
        } else {
            console.warn(`⚠️ 削除失敗: データが存在しません (${id})`, " ( class: DataStore )");
        }
    }

    get(id) {
        if (!this.data.has(id)) {
            console.warn(`⚠️ データが見つかりません: ${id}`, " ( class: DataStore )");
            return null;
        }
        return this.data.get(id);
    }

    validate(data) {
        return true; // TODO: 実際のバリデーションロジックを実装
    }

    clear() {
        this.data.clear();
        console.log(" データストアをクリアしました。", " ( class: DataStore )");
    }

    forEach(callback) {
        this.data.forEach(callback);
    }
}

export default  DataStore ;