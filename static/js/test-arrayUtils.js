import {
    findElement, removeElement, insertElement, filterArray, sortArray,
    mapArray, reverseArray, uniqueArray, shuffleArray, chunkArray, flattenArray,
    groupBy, concatArrays, sliceArray
} from './arrayUtils.js';

// 🔍 テスト用データ
const numbers = [1, 2, 3, 4, 5];
const duplicateNumbers = [1, 2, 2, 3, 4, 4, 5];
const nestedArray = [1, [2, [3, 4]], 5];
const objects = [
    { id: 1, name: 'Alice', group: 'A' },
    { id: 2, name: 'Bob', group: 'B' },
    { id: 3, name: 'Charlie', group: 'A' }
];

// ✅ 各関数のテスト実行
console.log("🔍 findElement:", findElement(numbers, num => num === 3)); // 3
console.log("🗑 removeElement:", removeElement(numbers, num => num === 2)); // [1, 3, 4, 5]
console.log("📌 insertElement:", insertElement(numbers, 10, 2)); // [1, 2, 10, 3, 4, 5]
console.log("🎯 filterArray:", filterArray(numbers, num => num > 2)); // [3, 4, 5]
console.log("🔄 sortArray:", sortArray(numbers, (a, b) => b - a)); // [5, 4, 3, 2, 1]
console.log("🔁 mapArray:", mapArray(numbers, num => num * 2)); // [2, 4, 6, 8, 10]
console.log("🔄 reverseArray:", reverseArray(numbers)); // [5, 4, 3, 2, 1]
console.log("✅ uniqueArray:", uniqueArray(duplicateNumbers)); // [1, 2, 3, 4, 5]
console.log("🔀 shuffleArray:", shuffleArray(numbers)); // ランダムな順番
console.log("📦 chunkArray:", chunkArray(numbers, 2)); // [[1, 2], [3, 4], [5]]
console.log("🔄 flattenArray:", flattenArray(nestedArray)); // [1, 2, 3, 4, 5]
console.log("🧑‍🤝‍🧑 groupBy:", groupBy(objects, 'group')); // { A: [...], B: [...] }
console.log("🔗 concatArrays:", concatArrays([1, 2, 3], [4, 5, 6])); // [1, 2, 3, 4, 5, 6]
console.log("✂ sliceArray:", sliceArray(numbers, 1, 3)); // [2, 3]


// ✅ Fisher-Yates方式の `shuffleArray` の動作確認
console.log("🔀 shuffleArray (1回目):", shuffleArray(numbers));
console.log("🔀 shuffleArray (2回目):", shuffleArray(numbers));
console.log("🔀 shuffleArray (3回目):", shuffleArray(numbers));

// ✅ `chunkArray` のエラーハンドリング確認
try {
    console.log("❌ chunkArray with size 0:", chunkArray(numbers, 0));
} catch (error) {
    console.log("✅ chunkArray error:", error.message); // "Size must be greater than 0"
}
