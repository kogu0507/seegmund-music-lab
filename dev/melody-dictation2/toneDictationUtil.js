// ToneDictationUtil.js
// 共通のユーティリティ関数を定義するファイル


// ==============================
// createNote 関数
// ==============================
// ※ durationRatio を oneBeatSeconds で掛け合わせて秒単位の duration を計算
export function createNote(bar, note, durationRatio, oneBeatSeconds, velocity = 0.8, tie = false) {
    const durationSeconds = durationRatio * oneBeatSeconds; // 秒単位のduration計算
    return { bar, note, duration: durationSeconds, velocity, tie };
}

// ==============================
// createTie 関数
// ==============================
// 複数の音符をタイで繋げる関数
export function createTie(...notes) {
    // tie には最低2つの音符が必要
    if (notes.length < 2) {
        throw new Error("createTie requires at least two notes");
    }
    const firstNote = notes[0];
    // 各音符の duration（秒）を合算（注意：ここでは既に秒単位になっている前提）
    const tiedDuration = notes.reduce((sum, note) => {
        if (note.note !== firstNote.note) {
            throw new Error("Cannot tie notes with different pitches");
        }
        return sum + note.duration;
    }, 0);
    // createNote を使わず、直接 tiedNote オブジェクトを作成することで
    // oneBeatSeconds の乗算を防ぐ
    const tiedNote = {
        bar: firstNote.bar,
        note: firstNote.note,
        duration: tiedDuration, // 既に秒単位の合計値
        velocity: firstNote.velocity,
        tie: true,
    };
    return tiedNote;
}

export function trimNotes(notes, startBar, endBar) {
    const trimmedNotes = [];
    for (const note of notes) {
        if (note.bar >= startBar && note.bar <= endBar) {
            // タイ処理: タイで繋がれた音符の場合、開始小節にある音符のみ追加
            if (note.tie) {
                if (note.bar === startBar) {
                    trimmedNotes.push(note);
                }
            } else {
                trimmedNotes.push(note);
            }
        }
    }
    return trimmedNotes;
}
