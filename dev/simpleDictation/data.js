// data.js

const scoreMeta = {
    id: 1,
    title: "聴音課題サンプル",
    composer: "H. K.",
    bpm: 80,
    timeSignature: [4, 4],
    baseKey: "C",
    hearingType: "複旋律",
    level: 1,
    tags: ["聴音", "複旋律", "ソプラノ", "バス"]
};

const scoreParts01 = {
    "meta": scoreMeta,
    "parts": [
        {
            "part": 1,
            "partName": "ソプラノ",
            "notes": [
                { "absoluteBeat": 0.000, "barNumber": 1, "pitch": "C4", "duration": 480, "velocity": 0.80 },
                { "absoluteBeat": 1.000, "barNumber": 1, "pitch": "D4", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 1.333, "barNumber": 1, "pitch": "E4", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 1.667, "barNumber": 1, "pitch": "F4", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 2.000, "barNumber": 1, "pitch": "G4", "duration": 480, "velocity": 0.80 },
                { "absoluteBeat": 3.000, "barNumber": 1, "pitch": "A4", "duration": 320, "velocity": 0.80 },
                { "absoluteBeat": 3.667, "barNumber": 1, "pitch": "B4", "duration": 160, "velocity": 0.80 }
            ]
        },
        {
            "part": 2,
            "partName": "バス",
            "notes": [
                { "absoluteBeat": 0.000, "barNumber": 1, "pitch": "E3", "duration": 1920, "velocity": 0.80 },
                { "absoluteBeat": 1.000, "barNumber": 1, "pitch": "C3", "duration": 1920, "velocity": 0.80 }
            ]
        }
    ]
};

const scoreParts02 = {
    "meta": scoreMeta,
    "parts": [
        {
            "part": 1,
            "partName": "ソプラノ",
            "notes": [
                { "absoluteBeat": 0.000, "barNumber": 1, "pitch": "C5", "duration": 480, "velocity": 0.80 },
                { "absoluteBeat": 1.000, "barNumber": 1, "pitch": "D5", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 1.333, "barNumber": 1, "pitch": "E5", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 1.667, "barNumber": 1, "pitch": "F5", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 2.000, "barNumber": 1, "pitch": "G5", "duration": 480, "velocity": 0.80 },
                { "absoluteBeat": 3.000, "barNumber": 1, "pitch": "A5", "duration": 320, "velocity": 0.80 },
                { "absoluteBeat": 3.667, "barNumber": 1, "pitch": "B5", "duration": 160, "velocity": 0.80 }
            ]
        },
        {
            "part": 2,
            "partName": "バス",
            "notes": [
                { "absoluteBeat": 0.000, "barNumber": 1, "pitch": "E3", "duration": 1920, "velocity": 0.80 },
                { "absoluteBeat": 1.000, "barNumber": 1, "pitch": "C3", "duration": 1920, "velocity": 0.80 }
            ]
        }
    ]
}

const scorePartsExam = {
    "meta": scoreMeta,
    "parts": [
        {
            "part": 1,
            "partName": "ソプラノ",
            "notes": [
                { "absoluteBeat": 0.000, "barNumber": 1, "pitch": "C6", "duration": 480, "velocity": 0.80 },
                { "absoluteBeat": 1.000, "barNumber": 1, "pitch": "D6", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 1.333, "barNumber": 1, "pitch": "E6", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 1.667, "barNumber": 1, "pitch": "F6", "duration": 160, "velocity": 0.80 },
                { "absoluteBeat": 2.000, "barNumber": 1, "pitch": "G6", "duration": 480, "velocity": 0.80 },
                { "absoluteBeat": 3.000, "barNumber": 1, "pitch": "A6", "duration": 320, "velocity": 0.80 },
                { "absoluteBeat": 3.667, "barNumber": 1, "pitch": "B6", "duration": 160, "velocity": 0.80 }
            ]
        },
        {
            "part": 2,
            "partName": "バス",
            "notes": [
                { "absoluteBeat": 0.000, "barNumber": 1, "pitch": "E3", "duration": 1920, "velocity": 0.80 },
                { "absoluteBeat": 1.000, "barNumber": 1, "pitch": "C3", "duration": 1920, "velocity": 0.80 }
            ]
        }
    ]
}

export {    scoreMeta,    scoreParts01,    scoreParts02,    scorePartsExam};
