// NOTE_DATA.mjs

export const NOTE_DATA_KEYS = {
    // 音名データの構造:
    //   10の位: 幹音 (C=1, D=2, E=3, F=4, G=5, A=6, B=7)
    //   1の位: 変化記号 (bb=1, b=2, ♮=3, #=4, x=5)
    // 例: C_NATURAL = 13 (Cのナチュラル)
    // 例: D_SHARP = 24 (Dのシャープ)
    // 例: B_DOUBLE_FLAT = 71 (Bのダブルフラット)
    // 例: C_DOUBLE_SHARP = 15 (Cのダブルシャープ)
    // 例: B_DOUBLE_SHARP = 75 (Bのダブルシャープ)
    // 例: B_DOUBLE_FLAT = 71 (Bのダブルフラット)
    
    C_DOUBLE_FLAT: 11, C_FLAT: 12, C_NATURAL: 13, C_SHARP: 14, C_DOUBLE_SHARP: 15,
    D_DOUBLE_FLAT: 21, D_FLAT: 22, D_NATURAL: 23, D_SHARP: 24, D_DOUBLE_SHARP: 25,
    E_DOUBLE_FLAT: 31, E_FLAT: 32, E_NATURAL: 33, E_SHARP: 34, E_DOUBLE_SHARP: 35,
    F_DOUBLE_FLAT: 41, F_FLAT: 42, F_NATURAL: 43, F_SHARP: 44, F_DOUBLE_SHARP: 45,
    G_DOUBLE_FLAT: 51, G_FLAT: 52, G_NATURAL: 53, G_SHARP: 54, G_DOUBLE_SHARP: 55,
    A_DOUBLE_FLAT: 61, A_FLAT: 62, A_NATURAL: 63, A_SHARP: 64, A_DOUBLE_SHARP: 65,
    B_DOUBLE_FLAT: 71, B_FLAT: 72, B_NATURAL: 73, B_SHARP: 74, B_DOUBLE_SHARP: 75,

}
// グローバル定数（音名表）（最後はモジュール化）
export const NOTE_DATA = {
    // double flat
    [NOTE_DATA_KEYS.C_DOUBLE_FLAT]: { midiNumber: 70, naturalNote: "C", altered: "double flat", english: "C♭♭", japanese: "重変ハ", german: "Ceses" },//今回の音域指定のため
    [NOTE_DATA_KEYS.D_DOUBLE_FLAT]: { midiNumber: 60, naturalNote: "D", altered: "double flat", english: "D♭♭", japanese: "重変ニ", german: "Deses" },
    [NOTE_DATA_KEYS.E_DOUBLE_FLAT]: { midiNumber: 62, naturalNote: "E", altered: "double flat", english: "E♭♭", japanese: "重変ホ", german: "Eses" },
    [NOTE_DATA_KEYS.F_DOUBLE_FLAT]: { midiNumber: 63, naturalNote: "F", altered: "double flat", english: "F♭♭", japanese: "重変ヘ", german: "Feses" },
    [NOTE_DATA_KEYS.G_DOUBLE_FLAT]: { midiNumber: 65, naturalNote: "G", altered: "double flat", english: "G♭♭", japanese: "重変ト", german: "Geses" },
    [NOTE_DATA_KEYS.A_DOUBLE_FLAT]: { midiNumber: 67, naturalNote: "A", altered: "double flat", english: "A♭♭", japanese: "重変イ", german: "Ases" },
    [NOTE_DATA_KEYS.B_DOUBLE_FLAT]: { midiNumber: 69, naturalNote: "B", altered: "double flat", english: "B♭♭", japanese: "重変ロ", german: "Bes" },
    // flat
    [NOTE_DATA_KEYS.C_FLAT]: { midiNumber: 71, naturalNote: "C", altered: "flat", english: "C♭", japanese: "変ハ", german: "Ces" },//今回の音域指定のため
    [NOTE_DATA_KEYS.D_FLAT]: { midiNumber: 61, naturalNote: "D", altered: "flat", english: "D♭", japanese: "変ニ", german: "Des" },
    [NOTE_DATA_KEYS.E_FLAT]: { midiNumber: 63, naturalNote: "E", altered: "flat", english: "E♭", japanese: "変ホ", german: "Es" },
    [NOTE_DATA_KEYS.F_FLAT]: { midiNumber: 64, naturalNote: "F", altered: "flat", english: "F♭", japanese: "変ヘ", german: "Fes" },
    [NOTE_DATA_KEYS.G_FLAT]: { midiNumber: 66, naturalNote: "G", altered: "flat", english: "G♭", japanese: "変ト", german: "Ges" },
    [NOTE_DATA_KEYS.A_FLAT]: { midiNumber: 68, naturalNote: "A", altered: "flat", english: "A♭", japanese: "変イ", german: "As" },
    [NOTE_DATA_KEYS.B_FLAT]: { midiNumber: 70, naturalNote: "B", altered: "flat", english: "B♭", japanese: "変ロ", german: "B" },
    // natural
    [NOTE_DATA_KEYS.C_NATURAL]: { midiNumber: 60, naturalNote: "C", altered: "natural", english: "C", japanese: "ハ", german: "C" },
    [NOTE_DATA_KEYS.D_NATURAL]: { midiNumber: 62, naturalNote: "D", altered: "natural", english: "D", japanese: "ニ", german: "D" },
    [NOTE_DATA_KEYS.E_NATURAL]: { midiNumber: 64, naturalNote: "E", altered: "natural", english: "E", japanese: "ホ", german: "E" },
    [NOTE_DATA_KEYS.F_NATURAL]: { midiNumber: 65, naturalNote: "F", altered: "natural", english: "F", japanese: "ヘ", german: "F" },
    [NOTE_DATA_KEYS.G_NATURAL]: { midiNumber: 67, naturalNote: "G", altered: "natural", english: "G", japanese: "ト", german: "G" },
    [NOTE_DATA_KEYS.A_NATURAL]: { midiNumber: 69, naturalNote: "A", altered: "natural", english: "A", japanese: "イ", german: "A" },
    [NOTE_DATA_KEYS.B_NATURAL]: { midiNumber: 71, naturalNote: "B", altered: "natural", english: "B", japanese: "ロ", german: "H" },
    // sharp
    [NOTE_DATA_KEYS.C_SHARP]: { midiNumber: 61, naturalNote: "C", altered: "sharp", english: "C♯", japanese: "嬰ハ", german: "Cis" },
    [NOTE_DATA_KEYS.D_SHARP]: { midiNumber: 63, naturalNote: "D", altered: "sharp", english: "D♯", japanese: "嬰ニ", german: "Dis" },
    [NOTE_DATA_KEYS.E_SHARP]: { midiNumber: 65, naturalNote: "E", altered: "sharp", english: "E♯", japanese: "嬰ホ", german: "Eis" },
    [NOTE_DATA_KEYS.F_SHARP]: { midiNumber: 66, naturalNote: "F", altered: "sharp", english: "F♯", japanese: "嬰ヘ", german: "Fis" },
    [NOTE_DATA_KEYS.G_SHARP]: { midiNumber: 68, naturalNote: "G", altered: "sharp", english: "G♯", japanese: "嬰ト", german: "Gis" },
    [NOTE_DATA_KEYS.A_SHARP]: { midiNumber: 70, naturalNote: "A", altered: "sharp", english: "A♯", japanese: "嬰イ", german: "Ais" },
    [NOTE_DATA_KEYS.B_SHARP]: { midiNumber: 60, naturalNote: "B", altered: "sharp", english: "B♯", japanese: "嬰ロ", german: "His" },//今回の音域指定のため
    // double sharp
    [NOTE_DATA_KEYS.C_DOUBLE_SHARP]: { midiNumber: 62, naturalNote: "C", altered: "double sharp", english: "Cx", japanese: "重嬰ハ", german: "Cisis" },
    [NOTE_DATA_KEYS.D_DOUBLE_SHARP]: { midiNumber: 64, naturalNote: "D", altered: "double sharp", english: "Dx", japanese: "重嬰ニ", german: "Disis" },
    [NOTE_DATA_KEYS.E_DOUBLE_SHARP]: { midiNumber: 66, naturalNote: "E", altered: "double sharp", english: "Ex", japanese: "重嬰ホ", german: "Eisis" },
    [NOTE_DATA_KEYS.F_DOUBLE_SHARP]: { midiNumber: 67, naturalNote: "F", altered: "double sharp", english: "Fx", japanese: "重嬰ヘ", german: "Fisis" },
    [NOTE_DATA_KEYS.G_DOUBLE_SHARP]: { midiNumber: 69, naturalNote: "G", altered: "double sharp", english: "Gx", japanese: "重嬰ト", german: "Gisis" },
    [NOTE_DATA_KEYS.A_DOUBLE_SHARP]: { midiNumber: 71, naturalNote: "A", altered: "double sharp", english: "Ax", japanese: "重嬰イ", german: "Aisis" },
    [NOTE_DATA_KEYS.B_DOUBLE_SHARP]: { midiNumber: 61, naturalNote: "B", altered: "double sharp", english: "Bx", japanese: "重嬰ロ", german: "Hisis" },//今回の音域指定のため
}

export const NOTE_GROUPS = {
    // 白鍵
    WHITE_KEYS: [
        NOTE_DATA_KEYS.C_NATURAL,
        NOTE_DATA_KEYS.D_NATURAL,
        NOTE_DATA_KEYS.E_NATURAL,
        NOTE_DATA_KEYS.F_NATURAL,
        NOTE_DATA_KEYS.G_NATURAL,
        NOTE_DATA_KEYS.A_NATURAL,
        NOTE_DATA_KEYS.B_NATURAL
    ],
    //♮♭♯全部
    ALL_ALTERED_FLAT_SHARP: [
        NOTE_DATA_KEYS.C_FLAT, NOTE_DATA_KEYS.C_NATURAL, NOTE_DATA_KEYS.C_SHARP,
        NOTE_DATA_KEYS.D_FLAT, NOTE_DATA_KEYS.D_NATURAL, NOTE_DATA_KEYS.D_SHARP,
        NOTE_DATA_KEYS.E_FLAT, NOTE_DATA_KEYS.E_NATURAL, NOTE_DATA_KEYS.E_SHARP,
        NOTE_DATA_KEYS.F_FLAT, NOTE_DATA_KEYS.F_NATURAL, NOTE_DATA_KEYS.F_SHARP,
        NOTE_DATA_KEYS.G_FLAT, NOTE_DATA_KEYS.G_NATURAL, NOTE_DATA_KEYS.G_SHARP,
        NOTE_DATA_KEYS.A_FLAT, NOTE_DATA_KEYS.A_NATURAL, NOTE_DATA_KEYS.A_SHARP,
        NOTE_DATA_KEYS.B_FLAT, NOTE_DATA_KEYS.B_NATURAL, NOTE_DATA_KEYS.B_SHARP
    ],
    // bb, b, ♮, #, x全部
    ALL_ALTERED_DOUBLE_FLAT_SHARP: [
        NOTE_DATA_KEYS.C_DOUBLE_FLAT, NOTE_DATA_KEYS.C_FLAT, NOTE_DATA_KEYS.C_NATURAL, NOTE_DATA_KEYS.C_SHARP, NOTE_DATA_KEYS.C_DOUBLE_SHARP,
        NOTE_DATA_KEYS.D_DOUBLE_FLAT, NOTE_DATA_KEYS.D_FLAT, NOTE_DATA_KEYS.D_NATURAL, NOTE_DATA_KEYS.D_SHARP, NOTE_DATA_KEYS.D_DOUBLE_SHARP,
        NOTE_DATA_KEYS.E_DOUBLE_FLAT, NOTE_DATA_KEYS.E_FLAT, NOTE_DATA_KEYS.E_NATURAL, NOTE_DATA_KEYS.E_SHARP, NOTE_DATA_KEYS.E_DOUBLE_SHARP,
        NOTE_DATA_KEYS.F_DOUBLE_FLAT, NOTE_DATA_KEYS.F_FLAT, NOTE_DATA_KEYS.F_NATURAL, NOTE_DATA_KEYS.F_SHARP, NOTE_DATA_KEYS.F_DOUBLE_SHARP,
        NOTE_DATA_KEYS.G_DOUBLE_FLAT, NOTE_DATA_KEYS.G_FLAT, NOTE_DATA_KEYS.G_NATURAL, NOTE_DATA_KEYS.G_SHARP, NOTE_DATA_KEYS.G_DOUBLE_SHARP,
        NOTE_DATA_KEYS.A_DOUBLE_FLAT, NOTE_DATA_KEYS.A_FLAT, NOTE_DATA_KEYS.A_NATURAL, NOTE_DATA_KEYS.A_SHARP, NOTE_DATA_KEYS.A_DOUBLE_SHARP,
        NOTE_DATA_KEYS.B_DOUBLE_FLAT, NOTE_DATA_KEYS.B_FLAT, NOTE_DATA_KEYS.B_NATURAL, NOTE_DATA_KEYS.B_SHARP, NOTE_DATA_KEYS.B_DOUBLE_SHARP
    ],
};

export function pushArray(arr, elements) {
    const copyedArray = arr.slice();
    if (!Array.isArray(elements)) {
        elements = [elements];
    }
    elements.forEach(element => {
        copyedArray.push(element);
    });
    return copyedArray;
}

export function removeArray(arr, elements) {
    if (!Array.isArray(elements)) {
        elements = [elements];
    }
    return arr.filter(element => !elements.includes(element));
}
