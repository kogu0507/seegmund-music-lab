// ToneKeyboard.mjs

class ToneKeyboard {
    constructor(Tone, keyboardElement, presetName = 'triangle') {
        this.Tone = Tone;
        this.keyboardElement = keyboardElement;
        this.activeNotes = {}; // 複数のノートを追跡
        this.synth = new Tone.Synth(SYNTH_PRESETS[presetName]).toDestination();
        this.setupEventListeners();
    }
    /*     constructor(Tone, keyboardElement, synthOptions = {}) {
            this.Tone = Tone;
            this.keyboardElement = keyboardElement;
            this.currentNote = null;
            this.synth = new Tone.Synth(synthOptions).toDestination(); // シンセサイザーの初期化
            this.setupEventListeners();
        }
     */
    setupEventListeners() {
        this.keyboardElement.querySelectorAll('.key').forEach(key => { // セレクタを修正
            key.addEventListener('mousedown', (e) => this.startSound(e, key));
            key.addEventListener('mouseup', (e) => this.stopSoundHandler(e, key));
            key.addEventListener('mouseleave', (e) => this.stopSoundHandler(e, key));
            key.addEventListener('touchstart', (e) => this.startSound(e, key));
            key.addEventListener('touchend', (e) => this.stopSoundHandler(e, key));
            key.addEventListener('touchcancel', (e) => this.stopSoundHandler(e, key));
        });
    }
    startSound(e, key) {
        e.preventDefault();
        const note = parseInt(key.dataset.note);
        this.activeNotes[note] = true; // ノートをアクティブにする
        this.playSound(note);
    }

    stopSoundHandler(e, key) {
        e.preventDefault();
        const note = parseInt(key.dataset.note);
        if (this.activeNotes[note]) { // ノートがアクティブな場合のみ停止
            this.stopSound(note);
            delete this.activeNotes[note]; // ノートを非アクティブにする
        }
    }

    playSound(note) {
        this.synth.triggerAttack(this.Tone.Frequency(note, 'midi')); // シンセサイザーを使用
    }

    stopSound(note) {
        this.synth.triggerRelease(this.Tone.Frequency(note, 'midi')); // シンセサイザーを使用
    }
}

// 音色のオプションを定数として定義
const SYNTH_PRESETS = {
    'triangle': {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
    },
    'square': {
        oscillator: { type: 'square' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.5 }
    },
    'sawtooth': {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.001, decay: 0.3, sustain: 0.4, release: 0.8 }
    },
    'sine': {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.02, decay: 0.15, sustain: 0.5, release: 1.2 }
    },
    'custom1': { // カスタム設定の例
        oscillator: { type: 'fatsawtooth', count: 3, spread: 30 },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.6, release: 1 }
    },
    // 他のプリセットもここに追加できます
};

export { ToneKeyboard, SYNTH_PRESETS };



/* 
<!-- tone-keyboard -->
<section class="tone-keyboard-section container d-flex overflow-auto my-3 opacity-25">
    <div class="key white-key" data-note="53"></div>
    <div class="key black-key" data-note="54"></div>
    <div class="key white-key" data-note="55"></div>
    <div class="key black-key" data-note="56"></div>
    <div class="key white-key" data-note="57"></div>
    <div class="key black-key" data-note="58"></div>
    <div class="key white-key" data-note="59"></div>
    <div class="key white-key" data-note="60">C4</div>
    <div class="key black-key" data-note="61"></div>
    <div class="key white-key" data-note="62"></div>
    <div class="key black-key" data-note="63"></div>
    <div class="key white-key" data-note="64"></div>
    <div class="key white-key" data-note="65"></div>
    <div class="key black-key" data-note="66"></div>
    <div class="key white-key" data-note="67"></div>
    <div class="key black-key" data-note="68"></div>
    <div class="key white-key" data-note="69"></div>
    <div class="key black-key" data-note="70"></div>
    <div class="key white-key" data-note="71"></div>
    <div class="key white-key" data-note="72">C5</div>
    <div class="key black-key" data-note="73"></div>
    <div class="key white-key" data-note="74"></div>
    <div class="key black-key" data-note="75"></div>
    <div class="key white-key" data-note="76"></div>
    <div class="key white-key" data-note="77"></div>
    <div class="key black-key" data-note="78"></div>
    <div class="key white-key" data-note="79"></div>
    <div class="key black-key" data-note="80"></div>
    <div class="key white-key" data-note="81"></div>
    <div class="key black-key" data-note="82"></div>
    <div class="key white-key" data-note="83"></div>
</section>

*/