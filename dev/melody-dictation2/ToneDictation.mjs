// ToneDictation.mjs
//import { createNote, createTie, trimNotes} from "./toneDictationUtil.js";

const EVENTS = {
  AUDIO_CONTEXT: {
    INITIALIZE: 'AUDIO_CONTEXT_INITIALIZE',
    INITIALIZED: 'AUDIO_CONTEXT_INITIALIZED',
  },
  SAMPLER: {
    CHANGED: 'SAMPLER_CHANGED',
    LOADED: 'SAMPLER_LOADED',
  },
  SCORE: {
    CHANGED: 'SCORE_CHANGED',
    LOADED: 'SCORE_LOADED',
  },
  PLAYBACK: {
    START: 'START_PLAYBACK',
    STARTED: 'PLAYBACK_STARTED',
    FINISHED: 'PLAYBACK_FINISHED',
    STOP: 'STOP_PLAYBACK',
    STOPPED: 'PLAYBACK_STOPPED',
  },
  PLAYBACK_SECTION: {
    PLAY_1_8: 'PLAY_1_8', // 1-8小節区間
    PLAY_1_4: 'PLAY_1_4', // 1-4小節区間
    PLAY_5_8: 'PLAY_5_8', // 5-8小節区間
    PLAY_1_2: 'PLAY_1_2', // 1-2小節区間
    PLAY_3_4: 'PLAY_3_4', // 3-4小節区間
    PLAY_5_6: 'PLAY_5_6', // 5-6小節区間
    PLAY_7_8: 'PLAY_7_8', // 7-8小節区間
    PLAY_1_1: 'PLAY_1_1', // 1小節区間
    PLAY_2_2: 'PLAY_2_2', // 2小節区間
    PLAY_3_3: 'PLAY_3_3', // 3小節区間
    PLAY_4_4: 'PLAY_4_4', // 4小節区間
    PLAY_5_5: 'PLAY_5_5', // 5小節区間
    PLAY_6_6: 'PLAY_6_6', // 6小節区間
    PLAY_7_7: 'PLAY_7_7', // 7小節区間
    PLAY_8_8: 'PLAY_8_8', // 8小節区間
  },
};

const SETTINGS = {
  DEFAULT_VOLUME: 0.8,
  KEYBOARD_RANGE: 12,
};

const PIANO_SAMPLER = {
  name: "ピアノ",
  type: "sampler",
  samples: {
    A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3",
    A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3",
    A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3",
    A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3",
    A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3",
    A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3",
    A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3",
    A7: "A7.mp3", C8: "C8.mp3"
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/"
};


const ToneDictation = {};

ToneDictation.EVENTS = EVENTS;

// ==============================
// Player
// ==============================
ToneDictation.Player = class {
  constructor(scoreDataUrl) {
    this.audioContextInitialized = false;
    this.sampler = null;
    this.scoreData = null;
    this.part = null;

    // AudioContext 初期化イベントのリスナー設定
    document.addEventListener(EVENTS.AUDIO_CONTEXT.INITIALIZE, this.initializeAudioContext.bind(this));
    document.addEventListener(EVENTS.AUDIO_CONTEXT.INITIALIZED, () => {
      this.setSampler(PIANO_SAMPLER);
      import(scoreDataUrl)
        .then((module) => {
          const scoreData = module.default;
          this.setScore(scoreData);
        })
        .catch((error) => {
          console.error('スコアのインポートに失敗しました。', error);
        });
    });
    // 再生開始イベントリスナーを追加
    document.addEventListener(EVENTS.PLAYBACK.START, (event) => {
      if (this.scoreData) {
        // イベントオブジェクトから再生セクションを取得
        const playSection = event.detail.section;

        // 再生セクションに対応する音符データを取得
        const notes = this.getNotesBySection(playSection);

        if (notes) {
          this.startPlayback(notes);
        } else {
          console.error(`セクション ${playSection} に対応する音符データが見つかりません。`);
        }
      } else {
        console.error('スコアデータが設定されていません。');
      }
    });
  }

  async initializeAudioContext() {
    if (this.audioContextInitialized) {
      return; // 初期化済みなら何もしない
    }
    try {
      await Tone.start();
      this.audioContextInitialized = true;
      document.dispatchEvent(new Event(EVENTS.AUDIO_CONTEXT.INITIALIZED)); // 初期化完了イベントを発火
      console.log('dispatchEvent: ', EVENTS.AUDIO_CONTEXT.INITIALIZED, '\n AudioContext が初期化されました。');
    } catch (error) {
      console.error('AudioContext の初期化に失敗しました。', error);
    }
  }

  async setSampler(samplerConfig) {
    if (!this.audioContextInitialized) {
      await this.initializeAudioContext();
    }
    if (!this.audioContextInitialized) {
      console.error('AudioContext が初期化されていないため、Sampler を設定できません。');
      return;
    }
    try {
      const urls = {};
      for (const note in samplerConfig.samples) {
        urls[note] = samplerConfig.baseUrl + samplerConfig.samples[note];
      }
      this.sampler = new Tone.Sampler({
        urls: urls,
        onload: () => {
          document.dispatchEvent(new Event(EVENTS.SAMPLER.LOADED));
          console.log('dispatchEvent: ', EVENTS.SAMPLER.LOADED, `\n ${samplerConfig.name} Sampler がロードされました。`);
        }
      }).toDestination();
    } catch (error) {
      console.error(`${samplerConfig.name} Sampler の設定に失敗しました。`, error);
    }
  }

  setScore(scoreData) {
    if (!scoreData || !scoreData.notes || !scoreData.bpm || !scoreData.timeSignature) {
      console.error('無効なスコアデータです。');
      return;
    }

    this.scoreData = scoreData;
    Tone.Transport.bpm.value = scoreData.bpm;
    Tone.Transport.timeSignature = scoreData.timeSignature;

    const partEvents = [];
    for (const partName in scoreData.notes) {
      const part = scoreData.notes[partName];
      for (const barRange in part) {
        const notes = part[barRange];
        notes.forEach((note) => {
          if (note.note) { // 休符でない場合のみ
            partEvents.push({
              time: note.time,// ※ time プロパティは各ノートに合わせた計算が必要
              note: note.note,
              duration: note.duration,
              velocity: note.velocity,
            });
          }
        });
      }
    }

    this.part = new Tone.Part((time, event) => {
      this.sampler.triggerAttackRelease(event.note, event.duration, time, event.velocity); // time 引数を使用している
    }, partEvents).start(0);

    document.dispatchEvent(new Event(EVENTS.SCORE.LOADED));
    console.log('dispatchEvent: ', EVENTS.SCORE.LOADED, '\n スコアが設定されました。');

  }

  // 再生セクションに対応する音符データを取得するメソッド
  // TODO: 要検討 export function trimNotes(startBar, endBar) とキャラかぶり？
  getNotesBySection(section) {
    if (!this.scoreData || !this.scoreData.notes || !this.scoreData.notes.part1 || !this.scoreData.notes.part1[section]) {
      return null;
    }
    return this.scoreData.notes.part1[section];
  }

  startPlayback(notes) {
    if (!this.sampler) {
      console.error('Sampler がロードされていません。');
      return;
    }

    if (!notes || !Array.isArray(notes)) {
      console.error('無効な音符データです。');
      return;
    }

    // 休符（note が null）のイベントは除外する
    const partEvents = notes
      .filter(note => note.note !== null && note.note !== undefined)
      .map(note => ({
        time: note.time,       // ※ time プロパティの設定方法に注意
        note: note.note,
        duration: note.duration,
        velocity: note.velocity,
      }));

    const part = new Tone.Part((time, event) => {
      // 念のため、再度 event.note が有効か確認
      if (event.note) {
        this.sampler.triggerAttackRelease(event.note, event.duration, time, event.velocity);
      }
    }, partEvents).start(0);

    Tone.Transport.start();
    console.log('再生を開始します。');

    // 再生終了後にPartを破棄する
    Tone.Transport.on('stop', () => {
      part.dispose();
      Tone.Transport.off('stop');
      console.log('再生が終了しました。');
    });
  }
};

// ==============================
// Ui
// ==============================
ToneDictation.Ui = class {

}

export default ToneDictation;