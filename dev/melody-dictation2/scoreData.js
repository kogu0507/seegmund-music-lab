// scoreData.js
// スコアのデータだけを定義するファイル
import { createNote, createTie, trimNotes} from "./toneDictationUtil.js";

// 例: oneBeatSeconds を計算して、ノートデータを生成
const oneBeatSeconds = Tone.Time("4n").toSeconds();

const part1Notes = [
    // 1小節目 四分・二分音符テスト
    createNote(1, "C4", 1/1, oneBeatSeconds), // 四分音符
    createNote(1, "C4", 1/1, oneBeatSeconds), // 四分音符
    createNote(1, "C4", 2/1, oneBeatSeconds), // 二分音符

    // 2小節目 八分音符テスト
    createNote(2, "C4", 1/1, oneBeatSeconds), // 四分音符
    createNote(2, "D4", 1/2, oneBeatSeconds), // 八分音符
    createNote(2, "D4", 1/2, oneBeatSeconds), // 八分音符
    createNote(2, "D4", 1/2, oneBeatSeconds), // 八分音符
    createNote(2, "D4", 1/2, oneBeatSeconds), // 八分音符
    createNote(2, "C4", 1/1, oneBeatSeconds), // 四分音符

    // 3小節目 付点、シンコペーションテスト
    createNote(3, "C4", 1.5, oneBeatSeconds), // 付点四分音符
    createNote(3, "C4", 1/2, oneBeatSeconds), // 八分音符
    createNote(3, "C4", 1/2, oneBeatSeconds), // 八分音符
    createNote(3, "C4", 1/1, oneBeatSeconds), // 四分音符
    createNote(3, "C4", 1/2, oneBeatSeconds), // 八分音符

    // 4小節目 休符テスト
    createNote(4, null, 1/2, oneBeatSeconds), // 八分休符
    createNote(4, "C4", 1/2, oneBeatSeconds), // 八分音符
    createNote(4, null, 1/2, oneBeatSeconds), // 八分休符
    createNote(4, "C4", 1/2, oneBeatSeconds), // 八分音符
    createNote(4, "C4", 1/1, oneBeatSeconds), // 四分音符
    createNote(4, null, 1/1, oneBeatSeconds), // 四分休符

    // 5小節目 三連符テスト
    createNote(5, "C4", 1/2, oneBeatSeconds), // 八分音符
    createNote(5, "C4", 1/2, oneBeatSeconds), // 八分音符
    // ---
    createNote(5, "C4", 1/3, oneBeatSeconds), // 三連符
    createNote(5, "C4", 1/3, oneBeatSeconds), // 三連符
    createNote(5, "C4", 1/3, oneBeatSeconds), // 三連符
    // ---
    createNote(5, "C4", 2/3, oneBeatSeconds), // 三連符
    createNote(5, "C4", 1/3, oneBeatSeconds), // 三連符
    // ---
    createNote(5, "C4", 1/3, oneBeatSeconds), // 三連符
    createNote(5, null, 1/3, oneBeatSeconds), // 三連符休符
    createNote(5, "C4", 1/3, oneBeatSeconds), // 三連符

    // 6小節目 十六分音符テスト
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    // ---
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, null, 1/4, oneBeatSeconds), // 16分休符
    // ---
    createNote(6, null, 1/4, oneBeatSeconds), // 16分休符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, null, 1/4, oneBeatSeconds), // 16分休符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    // ---
    createNote(6, null, 1/4, oneBeatSeconds), // 16分休符
    createNote(6, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(6, "C4", 1/2, oneBeatSeconds),  // 8分音符

    // 7小節目 タイテスト
    createTie(
        createNote(7, "C4", 1/1, oneBeatSeconds), // タイで繋がれた四分音符
        createNote(7, "C4", 1/4, oneBeatSeconds)  // 16分音符
    ),
    createNote(7, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(7, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(7, "C4", 1/4, oneBeatSeconds), // 16分音符
    // ---
    createNote(7, "C4", 1/1, oneBeatSeconds), // 四分音符
    // ---
    createTie(
        createNote(7, "C4", 1/2, oneBeatSeconds), // タイで繋がれた8分音符
        createNote(7, "C4", 1/2, oneBeatSeconds)  // 8分音符
    ),

    // 8小節目 タイテスト
    createNote(8, "C4", 1/2, oneBeatSeconds), // 8分音符
    createNote(8, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(8, "C4", 1/4, oneBeatSeconds), // 16分音符

    createNote(8, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(8, "C4", 1/4, oneBeatSeconds), // 16分音符
    createNote(8, "C4", 1/2, oneBeatSeconds), // 8分音符

    createNote(8, "C4", 1/2, oneBeatSeconds), // 8分音符
    createNote(8, "C4", 1/2, oneBeatSeconds), // 8分音符
    createNote(8, "C4", 1/2, oneBeatSeconds), // 8分音符
    createNote(8, "C4", 1/2, oneBeatSeconds), // 8分音符
];

let notes = {
    part1: {
        bar1to8: part1Notes, // 1～8小節
        bar1to4: trimNotes(part1Notes, 1, 4), // 1～4小節
        bar5to8: trimNotes(part1Notes, 5, 8), // 5～8小節
        bar1to2: trimNotes(part1Notes, 1, 2), // 1～2小節
        bar3to4: trimNotes(part1Notes, 3, 4), // 3～4小節
        bar5to6: trimNotes(part1Notes, 5, 6), // 5～6小節
        bar7to8: trimNotes(part1Notes, 7, 8), // 7～8小節
        bar1to1: trimNotes(part1Notes, 1, 1), // 1小節目
        bar2to2: trimNotes(part1Notes, 2, 2), // 2小節目
        bar3to3: trimNotes(part1Notes, 3, 3), // 3小節目
        bar4to4: trimNotes(part1Notes, 4, 4), // 4小節目
        bar5to5: trimNotes(part1Notes, 5, 5), // 5小節目
        bar6to6: trimNotes(part1Notes, 6, 6), // 6小節目
        bar7to7: trimNotes(part1Notes, 7, 7), // 7小節目
        bar8to8: trimNotes(part1Notes, 8, 8)  // 8小節目
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

const scoreData = {
  notes,
  bpm: 80,
  timeSignature: [4, 4],
};

export default scoreData;

