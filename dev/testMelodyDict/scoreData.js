// scoreData.js
console.log("scoreData.js");

const bpm = 120;
const timeSignature = [4, 4];

// 基準の拍を定義 (曲に合わせて変更可能)
const oneBeat = Tone.Time("4n"); // 4/4拍子の場合
// const oneBeat = Tone.Time("8n"); // 6/8拍子


// メロディの作成（4/4拍子の例）
const part1Notes = [
    // 1小節目 四分音符テスト
    createNote(1, "C4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    createNote(1, "C#4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    createNote(1, "D4", createDuration(oneBeat, [2.00])),      // 二分音符（四分音符の2倍）

    // 2小節目 八分音符テスト　ラーメンパクチー
    createNote(2, "D4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    createNote(2, "Db4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(2, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(2, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(2, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(2, "C4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    // 3小節目 付点、シンコペーションテスト　たーんとクリーム
    createNote(3, "C4", createDuration(oneBeat, [1.50])),      // 付点四分音符（四分音符の1.5倍）
    createNote(3, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(3, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(3, "C4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    createNote(3, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    // 4小節目 休符テスト
    createNote(4, null, createDuration(oneBeat, [0.50])),      // 8分休符（四分休符を2等分）
    createNote(4, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(4, null, createDuration(oneBeat, [0.50])),      // 8分休符（四分休符を2等分）
    createNote(4, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(4, "C4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    createNote(4, null, createDuration(oneBeat, [1.00])),      // 四分休符（基準休符）
    // 5小節目 テスト: 三連符
    createNote(5, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(5, "C4", createDuration(oneBeat, [0.50])),      // 8分音符（四分音符を2等分）
    createNote(5, "C4", createDuration(oneBeat, [1 / 3])),      // 三連符 1
    createNote(5, "C4", createDuration(oneBeat, [1 / 3])),      // 三連符 1
    createNote(5, "C4", createDuration(oneBeat, [1 / 3])),      // 三連符 1
    createNote(5, "C4", createDuration(oneBeat, [2 / 3])),      // 三連符 2
    createNote(5, "C4", createDuration(oneBeat, [1 / 3])),      // 三連符 1
    createNote(5, "C4", createDuration(oneBeat, [1 / 3])),      // 三連符 1
    createNote(5, null, createDuration(oneBeat, [1 / 3])),      // 三連符 1休符
    createNote(5, "C4", createDuration(oneBeat, [1 / 3])),      // 三連符 1
    // 6小節目 テスト: 十六分音符
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）

    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, null, createDuration(oneBeat, [0.25])),      // 16分休符（四分休符を4等分）

    createNote(6, null, createDuration(oneBeat, [0.25])),      // 16分休符（四分休符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, null, createDuration(oneBeat, [0.25])),      // 16分休符（四分休符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）

    createNote(6, null, createDuration(oneBeat, [0.25])),      // 16分休符（四分休符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(6, "C4", createDuration(oneBeat, [0.50])),
    // 7小節目 テスト: タイ            
    createTie(
        createNote(7, "C4", createDuration(oneBeat, [1.00])), // タイで繋がれた四分音符と16分音符
        createNote(7, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    ),
    createNote(7, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(7, "C4", createDuration(oneBeat, [0.25])),      // 16分音符（四分音符を4等分）
    createNote(7, "C4", createDuration(oneBeat, [1.00])),      // 四分音符（基準音符）
    createNote(7, "C4", createDuration(oneBeat, [1.00])), // タイで繋がれた2つの8分音符
    // 8小節目 テスト: タイ
    createNote(8, "C4", createDuration(oneBeat, [1 / 2])),      // 8分音符（四分音符を2等分）
    createNote(8, "C4", createDuration(oneBeat, [1 / 2])),      // 8分音符（四分音符を2等分）
    createNote(8, "C4", createDuration(oneBeat, [1 / 2])),      // 8分音符（四分音符を2等分）
];

let notes = {
    part1: {
        bar1to8: part1Notes, // 1～8小節
        bar1to4: trimNotes(1,4), // 1～4小節
        bar5to8: trimNotes(5,8), // 5～8小節
        bar1to2: trimNotes(1,2), // 1～2小節
        bar3to4: trimNotes(3,4), // 3～4小節
        bar5to6: trimNotes(5,6), // 5～6小節
        bar7to8: trimNotes(7,8), // 7～8小節
        bar1to1: trimNotes(1,1), // 1小節目
        bar2to2: trimNotes(2,2), // 2小節目
        bar3to3: trimNotes(3,3), // 3小節目
        bar4to4: trimNotes(4,4), // 4小節目
        bar5to5: trimNotes(5,5), // 5小節目
        bar6to6: trimNotes(6,6), // 6小節目
        bar7to7: trimNotes(7,7), // 7小節目
        bar8to8: trimNotes(8,8)  // 8小節目
    },
    part2: {}
};

/* 
console.log("bar1to4: ", notes.part1.bar1to4);
console.log("bar5to8: ", notes.part1.bar5to8);
console.log("bar1to2: ", notes.part1.bar1to2);
console.log("bar3to4: ", notes.part1.bar3to4);
console.log("bar5to6: ", notes.part1.bar5to6);
console.log("bar7to8: ", notes.part1.bar7to8);
console.log("bar1to1: ", notes.part1.bar1to1);
console.log("bar2to2: ", notes.part1.bar2to2);
console.log("bar3to3: ", notes.part1.bar3to3);
console.log("bar4to4: ", notes.part1.bar4to4);
console.log("bar5to5: ", notes.part1.bar5to5);
console.log("bar6to6: ", notes.part1.bar6to6);
console.log("bar7to7: ", notes.part1.bar7to7);
console.log("bar8to8: ", notes.part1.bar8to8);
 */
// ==============================
// モジュール内関数
// ==============================
function trimNotes(startBar, endBar) {
    const trimmedNotes = [];

    for (const note of part1Notes) {
        if (note.bar >= startBar && note.bar <= endBar) {
            // タイ処理: タイで繋がれた音符の場合、開始小節にある音符のみを追加
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

function createDuration(oneBeat, ratioArr) {
    if (!Array.isArray(ratioArr) || ratioArr.length === 0) {
        throw new Error("Invalid ratioArr: ratioArr must be a non-empty array");
    }

    let totalDuration = 0;
    for (const ratio of ratioArr) {
        if (typeof ratio !== 'number') {
            throw new Error(`Invalid ratio: ${ratio}`);
        }
        totalDuration += oneBeat * ratio;
    }
    return totalDuration;
}

function createTie(...notes) {
    if (notes.length < 2) {
        throw new Error("createTie requires at least two notes");
    }

    const firstNote = notes[0];
    const tiedDuration = notes.reduce((sum, note) => {
        if (note.note !== firstNote.note) {
            throw new Error("Cannot tie notes with different pitches");
        }
        return sum + note.duration;
    }, 0);

    return createNote(firstNote.note, tiedDuration);
}

// 音符を作成する関数（音符、長さ、タイ、速度）
function createNote(bar, note, duration, velocity = 0.8) {
    return { bar, note, duration: duration, velocity };
}


const scoreData = {
    notes,
    bpm,
    timeSignature
}

export default scoreData;