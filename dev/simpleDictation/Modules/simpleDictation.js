// simpleDictation.js
/* 
依存関係: simpleDictation.js 内で別のモジュールやライブラリ (例えば、Tone.js) を使用している場合、
それらのモジュールやライブラリが simpleDictation.js より前に読み込まれている必要があります。 


TODO:
validate メソッド: DataStore、DictationMetaDataStore、DictationScoreDataStore の validate メソッドはまだ空です。データの整合性を保つために、適切なバリデーションロジックを実装する必要があります。

エラー処理: エラーが発生した場合の処理 (例えば、エラーメッセージの表示、処理の中断など) がまだ実装されていません。

defaultSampler などのデータは、data.js で定義し、simpleDictation.js から参照するようにすると、データの管理がより一元化されます。



EventListenerManagerは単独のファイルにすると思う。
*/

//import { defaultSampler } from '../../modules/instruments.js';
import { DataStore } from '/./DataStore.js';
import { ToneJsPlayer } from './ToneJsPlayer.js';


// 次回以降のアップデートで反映します
/* const defaultSynth = {
    name: "シンセサイザー",
    type: "synth",
    config: {
        oscillator: {
            type: "sine"  // サイン波で柔らかな音色を作成
        },
        envelope: {
            attack: 0.005,   // 非常に短いアタック
            decay: 0.3,      // 適度なディケイ
            sustain: 0.5,    // 持続レベル
            release: 1.2     // ゆっくりとフェードアウト
        },
        filter: {
            Q: 1,            // フィルターの共鳴
            type: "lowpass",
            rolloff: -12     // 12dB/oct のロールオフ
        }
    }
}; */


class DictationMetaDataStore extends DataStore {
    validate(data) {
        if (!data || typeof data.title !== 'string' || typeof data.composer !== 'string' ||
            typeof data.bpm !== 'number' || !Array.isArray(data.timeSignature) ||
            data.timeSignature.length !== 2 || typeof data.timeSignature[0] !== 'number' ||
            typeof data.timeSignature[1] !== 'number' || typeof data.baseKey !== 'string' ||
            typeof data.hearingType !== 'string' || typeof data.level !== 'number' ||
            !Array.isArray(data.tags)) {
            console.error("❌ メタデータ形式エラー:", data);
            return false;
        }
        return true;
    }
}

class DictationScoreDataStore extends DataStore {
    validate(data) {
        if (!data || !data.meta || !data.parts || !Array.isArray(data.parts)) {
            return false;
        }
        for (const part of data.parts) {
            if (!part.notes || !Array.isArray(part.notes)) {
                return false;
            }
            for (const note of part.notes) {
                if (typeof note.absoluteBeat !== 'number' || typeof note.barNumber !== 'number' ||
                    typeof note.pitch !== 'string' || typeof note.duration !== 'number' ||
                    typeof note.velocity !== 'number') {
                    return false;
                }
            }
        }
        return true;
    }
}

/**
 * InstrumentDataStore は、楽器のデータ（例: 楽器名、種類、サンプルデータ、ベース URL など）
 * を管理するためのクラスです。
 * DataStore を拡張して、楽器データ特有のバリデーションロジックを実装します。
 */
class InstrumentDataStore extends DataStore {
    /**
     * 楽器データのバリデーションを行います。
     * 期待するデータ形式：
     * {
     *   name: string,          // 楽器の名称（必須）
     *   type: string,          // 楽器のタイプ（例: "sampler", "synth" 等）（必須）
     *   samples?: Object,      // サンプルデータ。キーが音名、値が音源ファイル名など（任意）
     *   baseUrl?: string       // サンプルファイルの基本URL（任意）
     * }
     *
     * @param {Object} data - 楽器データオブジェクト
     * @returns {boolean} データが有効であれば true、不正なら false
     */
    validate(data) {
        if (!data) {
            console.error("❌ Instrument data is empty");
            return false;
        }
        // name のチェック
        if (typeof data.name !== "string") {
            console.error("❌ Instrument data validation error: 'name' must be a string", data);
            return false;
        }
        // type のチェック
        if (typeof data.type !== "string") {
            console.error("❌ Instrument data validation error: 'type' must be a string", data);
            return false;
        }
        // samples があればオブジェクトであることをチェック
        if (data.samples !== undefined && typeof data.samples !== "object") {
            console.error("❌ Instrument data validation error: 'samples' must be an object", data);
            return false;
        }
        // baseUrl があれば文字列であることをチェック
        if (data.baseUrl !== undefined && typeof data.baseUrl !== "string") {
            console.error("❌ Instrument data validation error: 'baseUrl' must be a string", data);
            return false;
        }
        return true;
    }
}

/**
 * イベントリスナーの登録・削除・発火を管理するクラス
 */
class EventListenerManager {
    constructor() {
        /** @private {Object<string, Array<Function>>} */
        this.listeners = {};
    }

    /**
     * 指定したイベントに対してリスナーを追加します。
     * @param {string} event - イベント名
     * @param {Function} callback - イベント発火時に呼ばれるコールバック関数
     */
    addListener(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * 指定したイベントからリスナーを削除します。
     * @param {string} event - イベント名
     * @param {Function} callback - 削除するコールバック関数
     */
    removeListener(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    }

    /**
     * 指定したイベントを発火し、登録されているすべてのコールバックを呼び出します。
     * @param {string} event - イベント名
     * @param {*} data - コールバックに渡すデータ
     */
    triggerEvent(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                this.onError(error);
            }
        });
    }

    /**
     * すべてのリスナーを削除します。
     */
    clearListeners() {
        this.listeners = {};
    }

    /**
     * 指定したイベントに関連するリスナーを取得します。
     * @param {string} event - イベント名
     * @returns {Array<Function>} リスナーの配列
     */
    getListeners(event) {
        return this.listeners[event] || [];
    }

    /**
     * 指定したイベントにリスナーが登録されているか確認します。
     * @param {string} event - イベント名
     * @returns {boolean} リスナーが存在する場合 true
     */
    hasListener(event) {
        return (this.listeners[event] && this.listeners[event].length > 0);
    }

    /**
     * イベントリスナーの処理でエラーが発生した場合のハンドリング
     * @param {Error} error - 発生したエラー
     */
    onError(error) {
        console.error("EventListenerManager encountered an error:", error);
        // 必要に応じてグローバルなエラー通知などの処理を追加
    }
}



/**
 * シングルの聴音課題に対応するプレイヤー
 * ToneJsPlayer を継承し、楽譜データの読み込みや再生制御、イベント通知を実装
 */
class SingleDictationPlayer extends ToneJsPlayer {
    constructor() {
        super();
        /** @private {Object|null} */
        this.scoreData = null;
        /** @private {boolean} */
        this.playing = false;
        /** @private {number|null} 自動停止用タイマーID */
        this.autoStopTimeout = null;
        /** @private {number} 現在の再生位置（ミリ秒） */
        this.currentTime = 0;
    }

    /**
     * 楽譜データ（スコアデータ）を読み込みます。
     * @param {Object} scoreData - 楽譜データ（例: { notes: [{ time: 0, pitch: 60 }, ...] }）
     */
    loadScoreData(scoreData) {
        this.scoreData = scoreData;
        console.log("Score data loaded:", scoreData);
    }

    /**
     * 現在読み込まれている楽譜データを返します。
     * @returns {Object|null} 楽譜データ
     */
    getScoreData() {
        return this.scoreData;
    }

    /**
     * 現在再生中かどうかを返します。
     * @returns {boolean} 再生中なら true
     */
    isPlaying() {
        return this.playing;
    }

    /**
     * 再生を開始します。
     * 楽譜データがない場合は警告を出します。
     */
    play() {
        if (!this.scoreData) {
            console.warn("No score data loaded.");
            return;
        }
        this.playing = true;
        this.currentTime = 0;
        console.log("Playback started.");

        // 楽譜データ内のノート情報に基づいて noteStart イベントを発火（シミュレーション）
        if (this.scoreData.notes && Array.isArray(this.scoreData.notes)) {
            this.scoreData.notes.forEach(note => {
                // 各ノートの開始時間に合わせてイベントを発火
                setTimeout(() => {
                    this.eventManager.triggerEvent("noteStart", note);
                    console.log("Note started:", note);
                }, note.time);
            });
        }

        // 楽譜データの再生終了をシミュレーションするため、全体の再生時間後に playbackEnd イベントを発火
        const duration = this.getDuration();
        setTimeout(() => {
            this.stop();
            this.eventManager.triggerEvent("playbackEnd", { duration });
            console.log("Playback ended.");
        }, duration);
    }

    /**
     * 再生を停止します。
     */
    stop() {
        this.playing = false;
        if (this.autoStopTimeout) {
            clearTimeout(this.autoStopTimeout);
            this.autoStopTimeout = null;
        }
        console.log("Playback stopped.");
    }

    /**
     * 再生を一時停止します。
     * 次回以降のアップデートで反映します
     */
    /* pause() {
        if (!this.playing) {
            console.warn("Playback is not active.");
            return;
        }
        this.playing = false;
        console.log("Playback paused.");
    } */

    /**
     * 一時停止した再生を再開します。
     * 次回以降のアップデートで反映します
     */
    /* resume() {
        if (this.playing) {
            console.warn("Playback is already active.");
            return;
        }
        this.playing = true;
        console.log("Playback resumed.");
    } */

    /**
     * 楽譜データから再生終了時間を計算して返します。
     * @returns {number} 再生時間（ミリ秒）
     */
    getDuration() {
        if (!this.scoreData || !this.scoreData.notes) return 0;
        // 最後のノートの開始時刻 + ノートの仮の長さ（ここでは500ms）
        const lastNote = this.scoreData.notes[this.scoreData.notes.length - 1];
        return lastNote.time + 500;
    }

    /**
     * 指定した時間後に再生を自動停止するタイマーを設定します。
     * @param {number} time - 自動停止するまでの時間（ミリ秒）
     */
    setAutoStop(time) {
        if (this.autoStopTimeout) {
            clearTimeout(this.autoStopTimeout);
        }
        this.autoStopTimeout = setTimeout(() => {
            this.stop();
            console.log("Auto-stopped playback after", time, "ms");
        }, time);
    }

    /**
     * 指定したタイミングにシークします。
     * @param {number} time - シークする時間（ミリ秒）
     * 次回以降のアップデートで反映します
     */
    /* seek(time) {
        this.currentTime = time;
        console.log("Seeked to time:", time);
        this.eventManager.triggerEvent("seek", { time });
    } */
}

/**
 * 複数の SingleDictationPlayer を管理し、一括再生・制御するクラス
 */
class MultiDictationPlayer {
    constructor() {
        /** @private {Map<string, SingleDictationPlayer>} */
        this.players = new Map();
        // マルチプレイヤー用のイベント管理
        this.eventManager = new EventListenerManager();
    }

    /**
     * 新しい SingleDictationPlayer を生成し、楽譜データをロードします。
     * @param {string} id - プレイヤーの識別子
     * @param {Object} scoreData - 楽譜データ
     * @returns {SingleDictationPlayer} 生成したプレイヤー
     */
    createPlayer(id, scoreData) {
        const player = new SingleDictationPlayer();
        player.loadScoreData(scoreData);
        this.players.set(id, player);
        console.log(`Player created with ID: ${id}`);
        return player;
    }

    /**
     * 指定した ID の SingleDictationPlayer を取得します。
     * @param {string} id - プレイヤーの識別子
     * @returns {SingleDictationPlayer|null} プレイヤーまたは存在しない場合 null
     */
    getPlayer(id) {
        return this.players.get(id) || null;
    }

    /**
     * 指定した ID の SingleDictationPlayer を削除し、リソースを解放します。
     * @param {string} id - プレイヤーの識別子
     */
    removePlayer(id) {
        if (this.players.has(id)) {
            const player = this.players.get(id);
            player.dispose();
            this.players.delete(id);
            console.log(`Player removed with ID: ${id}`);
        }
    }

    /**
     * 複数のプレイヤーに対して楽譜データをまとめてロードします。
     * @param {Array<{id: string, scoreData: Object}>} scoreDataArray - 楽譜データの配列
     */
    loadAllScores(scoreDataArray) {
        scoreDataArray.forEach(item => {
            let player = this.getPlayer(item.id);
            if (!player) {
                player = this.createPlayer(item.id, item.scoreData);
            } else {
                player.loadScoreData(item.scoreData);
            }
        });
        console.log("All scores loaded.");
    }

    /**
     * すべてのプレイヤーを同時に再生開始します。
     */
    playAll() {
        this.players.forEach(player => {
            player.play();
        });
        this.eventManager.triggerEvent("allNotesStart", {});
        console.log("All players started.");
    }

    /**
     * すべてのプレイヤーの再生を停止します。
     */
    stopAll() {
        this.players.forEach(player => {
            player.stop();
        });
        this.eventManager.triggerEvent("allPlaybackEnd", {});
        console.log("All players stopped.");
    }

    /**
     * すべてのプレイヤーの再生を一時停止します。
     * 次回以降のアップデートで反映します
     */
    /* pauseAll() {
        this.players.forEach(player => {
            player.pause();
        });
        console.log("All players paused.");
    } */

    /**
     * すべてのプレイヤーの再生を再開します。
     * 次回以降のアップデートで反映します
     */
    /* resumeAll() {
        this.players.forEach(player => {
            player.resume();
        });
        console.log("All players resumed.");
    } */

    /**
     * すべてのプレイヤーの再生位置を同時に変更します。
     * @param {number} time - シークする時間（ミリ秒）
     * 次回以降のアップデートで反映します
     */
    /* seekAll(time) {
        this.players.forEach(player => {
            player.seek(time);
        });
        this.eventManager.triggerEvent("seek", { time });
        console.log("All players seeked to", time);
    } */

    /**
     * すべてのプレイヤーの音量を一括で設定します。
     * @param {number} volume - 音量レベル（0～1）
     * 次回以降のアップデートで反映します
     */
    /* setVolumeAll(volume) {
        this.players.forEach(player => {
            player.setVolume(volume);
        });
        console.log("Volume set for all players to", volume);
    } */

    /**
     * 特定のプレイヤーの音量を設定します。
     * @param {string} id - プレイヤーの識別子
     * @param {number} volume - 音量レベル（0～1）
     * 次回以降のアップデートで反映します
     */
    /* setVolume(id, volume) {
        const player = this.getPlayer(id);
        if (player) {
            player.setVolume(volume);
            console.log(`Volume set for player ${id} to ${volume}`);
        }
    } */

    /**
     * すべてのプレイヤーのピッチ（移調）を一括で設定します。
     * @param {number} semitones - 移調する半音の数
     */
    transposeAll(semitones) {
        this.players.forEach(player => {
            player.setPitch(semitones);
        });
        console.log(`All players transposed by ${semitones} semitones.`);
    }

    /**
     * 複数のプレイヤーの中で最も長い再生時間を返します。
     * @returns {number} 最大再生時間（ミリ秒）
     */
    getMaxDuration() {
        let maxDuration = 0;
        this.players.forEach(player => {
            const duration = player.getDuration();
            if (duration > maxDuration) {
                maxDuration = duration;
            }
        });
        return maxDuration;
    }

    /**
     * すべてのプレイヤーが再生中かどうかを確認します。
     * @returns {boolean} すべて再生中なら true
     */
    isAllPlaying() {
        let allPlaying = true;
        this.players.forEach(player => {
            if (!player.isPlaying()) {
                allPlaying = false;
            }
        });
        return allPlaying;
    }

    /**
     * 指定した時間後にすべてのプレイヤーの再生を停止します。
     * @param {number} time - 停止までの時間（ミリ秒）
     */
    stopAllAfter(time) {
        setTimeout(() => {
            this.stopAll();
            console.log("All players auto-stopped after", time, "ms");
        }, time);
    }

    /**
     * すべてのプレイヤーでノートの再生が開始されたときのイベントを登録します。
     * @param {Function} callback - コールバック関数
     */
    onAllNotesStart(callback) {
        this.eventManager.addListener("allNotesStart", callback);
    }

    /**
     * すべてのプレイヤーの再生終了時のイベントを登録します。
     * @param {Function} callback - コールバック関数
     */
    onAllPlaybackEnd(callback) {
        this.eventManager.addListener("allPlaybackEnd", callback);
    }

    /**
     * 特定のプレイヤーの再生終了時のイベントを登録します。
     * @param {string} id - プレイヤーの識別子
     * @param {Function} callback - コールバック関数
     */
    onPartPlaybackEnd(id, callback) {
        const player = this.getPlayer(id);
        if (player) {
            player.on("playbackEnd", callback);
        }
    }

    /**
     * シークイベントのコールバックを登録します。
     * @param {Function} callback - コールバック関数
     */
    onSeek(callback) {
        this.eventManager.addListener("seek", callback);
    }

    /**
     * 複数のプレイヤーで発生したエラーを集約して通知するコールバックを登録します。
     * @param {Function} callback - コールバック関数
     */
    onError(callback) {
        this.eventManager.addListener("error", callback);
        // 各プレイヤーのエラーも監視
        this.players.forEach(player => {
            player.on("error", callback);
        });
    }

    /**
     * すべての SingleDictationPlayer インスタンスを削除し、リソースを解放します。
     */
    clearAllPlayers() {
        this.players.forEach((player, id) => {
            player.dispose();
        });
        this.players.clear();
        console.log("All players cleared.");
    }
}


/**
 * DictationUIController は、画面上の UI 要素（楽譜選択、スタート・ストップボタン、ステータスバー）
 * を操作し、ユーザーの操作に応じた処理（再生開始、停止、スコア変更）を行います。
 */
class DictationUIController {
    /**
     * コンストラクタ
     * @param {MultiDictationPlayer} multiPlayer - 複数プレイヤーを管理するインスタンス
     * @param {DictationScoreDataStore} scoreStore - 楽譜データを管理するストア
     */
    constructor(multiPlayer, scoreStore, ids, useCamelCase = false) {
        this.multiPlayer = multiPlayer;
        this.scoreStore = scoreStore;
        this.useCamelCase = useCamelCase;
        this.elements = this.getElementsByIds(ids);
        this.constants = { // constants を定義
            events: {
                PLAY: "play",
                STOP: "stop",
                INSTRUMENT_CHANGE: "instrumentChange",
            },
            statusMessages: {
                ERROR: "エラーが発生しました",
                PREPARING: "準備中...",
                READY: "準備完了",
                PLAYING: "再生中...",
                STOPPED: "停止中",
            },
        };

        this.initEventListeners();
    }

    camelCaseToHyphen(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    hyphenToCamelCase(str) {
        return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    }

    getElementsByIds(ids) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        const elements = {};

        ids.forEach(id => {
            const targetId = this.useCamelCase ? this.camelCaseToHyphen(id) : id;
            const element = document.getElementById(targetId);

            if (element) {
                elements[id] = element;
            } else {
                console.error(`Element with ID '${targetId}' not found.`);
            }
        });

        return ids.length === 1 ? elements[ids[0]] : elements;
    }
    /**
     * UI イベントの初期設定を行います。
     */
    initEventListeners() {
        // 再生ボタンのクリックイベント
        this.startBtn.addEventListener('click', async () => {
            // ユーザー操作で AudioContext を再開
            await Tone.start();
            await Tone.context.resume();
            console.log("AudioContext is running:", Tone.context.state);

            // プレイヤーの準備確認（checkPlayers() メソッドが true を返す前提）
            if (typeof this.multiPlayer.checkPlayers === 'function' && !this.multiPlayer.checkPlayers()) {
                this.updateStatus("プレイヤーが準備できていません");
                return;
            }

            // 楽譜選択に応じたスコアデータの設定
            const selectedScore = this.scoreStore.get(this.scoreSelect.value);
            if (selectedScore) {
                if (typeof this.multiPlayer.setScore === 'function') {
                    this.multiPlayer.setScore(selectedScore);
                }
                // 全プレイヤーの再生開始（playAll() メソッドが実装されている前提）
                if (typeof this.multiPlayer.playAll === 'function') {
                    this.multiPlayer.playAll();
                }
                this.updateStatus("再生中...");
                this.togglePlayButtons(true);
            } else {
                this.updateStatus("スコアデータの読み込みに失敗しました");
            }
        });

        // 停止ボタンのクリックイベント
        this.stopBtn.addEventListener('click', () => {
            if (typeof this.multiPlayer.stopAll === 'function') {
                this.multiPlayer.stopAll();
            }
            this.updateStatus("停止しました");
            this.togglePlayButtons(false);
        });

        // 楽譜選択の変更イベント
        this.scoreSelect.addEventListener('change', () => {
            const selectedScore = this.scoreStore.get(this.scoreSelect.value);
            if (selectedScore) {
                if (typeof this.multiPlayer.setScore === 'function') {
                    this.multiPlayer.setScore(selectedScore);
                }
                this.updateStatus("スコアが更新されました");
                this.togglePlayButtons(true);
            } else {
                this.updateStatus("スコアデータの読み込みに失敗しました");
                this.togglePlayButtons(false);
            }
        });
    }

    /**
     * ステータスバーのテキストを更新します。
     * @param {string} message - 表示するメッセージ
     */
    updateStatus(message) {
        this.statusText.textContent = message;
    }

    /**
     * 再生開始・停止ボタンの活性状態を切り替えます。
     * @param {boolean} isPlaying - 再生中なら true、停止中なら false
     */
    togglePlayButtons(isPlaying) {
        if (isPlaying) {
            this.startBtn.classList.add("disabled");
            this.stopBtn.classList.remove("disabled");
        } else {
            this.startBtn.classList.remove("disabled");
            this.stopBtn.classList.add("disabled");
        }
    }
}

export {
    DataStore,
    DictationMetaDataStore,
    DictationScoreDataStore,
    InstrumentDataStore,
    ToneJsPlayer,
    SingleDictationPlayer,
    MultiDictationPlayer,
    DictationUIController,
    defaultSampler
};
