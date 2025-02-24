// constants.js

// イベント名を定義する定数オブジェクトです。
// このオブジェクトを使うことで、イベント名を文字列で直接記述する代わりに、
// `EVENTS.PIANO_SAMPLER_LOADED` のように参照できるようになり、
// コードの可読性や保守性が向上します。

export const EVENTS = {
    // ピアノサンプラーのロードが完了したことを示すイベント
    PIANO_SAMPLER_LOADED: 'pianoSamplerLoaded',

    // 楽譜の特定の小節を再生するためのイベント。
    // 例えば、PLAY_1_8 は1小節の8分音符分を再生するイベントを表します。
    // PLAY_1_4 は1小節の4分音符分、PLAY_1_2 は1小節の2分音符分、
    // PLAY_1_1 は1小節全体を再生するイベントを表します。
    // 同様に、PLAY_2_2, PLAY_3_3...PLAY_8_8 は、それぞれ2小節目、3小節目...8小節目全体を
    // 再生するイベントを表します。
    PLAY_1_8:     'play1-8',
    PLAY_1_4:     'play1-4',
    PLAY_5_8:     'play5-8',
    PLAY_1_2:     'play1-2',
    PLAY_3_4:     'play3-4',
    PLAY_5_6:     'play5-6',
    PLAY_7_8:     'play7-8',
    PLAY_1_1:     'play1-1',
    PLAY_2_2:     'play2-2',
    PLAY_3_3:     'play3-3',
    PLAY_4_4:     'play4-4',
    PLAY_5_5:     'play5-5',
    PLAY_6_6:     'play6-6',
    PLAY_7_7:     'play7-7',
    PLAY_8_8:     'play8-8',

    // お試し再生を行うためのイベント
    TRIAL:        'play-trial',

    // 再生を停止するイベント
    STOP:         'stop'
};