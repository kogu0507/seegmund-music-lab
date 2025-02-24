// data.js
// 楽譜データを定義するファイル（現段階は 1 曲分）
const SCORES = {
    score1: {
      meta: {
        id: 1,
        title: "聴音課題サンプル",
        composer: "H. K.",
        bpm: 80,
        timeSignature: [4, 4],
        baseKey: "C",
        hearingType: "複旋律",
        level: 1,
        tags: ["聴音", "複旋律", "ソプラノ", "バス"]
      },
      parts: [
        {
          part: 1,
          partName: "ソプラノ",
          notes: [
            { absoluteBeat: 0.000, barNumber: 1, pitch: "C4", duration: 480, velocity: 0.80 },
            { absoluteBeat: 1.000, barNumber: 1, pitch: "E4", duration: 160, velocity: 0.80 },
            { absoluteBeat: 1.333, barNumber: 1, pitch: "E4", duration: 160, velocity: 0.80 },
            { absoluteBeat: 1.667, barNumber: 1, pitch: "E4", duration: 160, velocity: 0.80 },
            { absoluteBeat: 2.000, barNumber: 1, pitch: "C4", duration: 480, velocity: 0.80 },
            { absoluteBeat: 3.000, barNumber: 1, pitch: "C4", duration: 320, velocity: 0.80 },
            { absoluteBeat: 3.667, barNumber: 1, pitch: "C4", duration: 160, velocity: 0.80 }
          ]
        },
        {
          part: 2,
          partName: "バス",
          notes: [
            { absoluteBeat: 0.000, barNumber: 1, pitch: "E3", duration: 1920, velocity: 0.80 },
            { absoluteBeat: 1.000, barNumber: 1, pitch: "C3", duration: 1920, velocity: 0.80 }
          ]
        }
      ]
    }
    // 他のスコアデータも必要に応じて追加可能
  };
  