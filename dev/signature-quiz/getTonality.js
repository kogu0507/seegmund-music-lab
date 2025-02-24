// data.js 

// 調号数から調名を取得する関数

/* 
function getTonality(id, mode, lang) {
    const data = answer[id];
    if (data && data[mode] && data[mode][lang]) {
        return data[mode][lang];
    } else {
        return "該当する調名が見つかりません。";
    }
}

// 例: 変ハ長調 (id: -7) の情報をコンソールに出力

const cbMajorJa = getTonality("-7", "major", "ja");
console.log("変ハ長調:", cbMajorJa);

const cbMajorEn = getTonality("-7", "major", "en");
console.log("Cb major:", cbMajorEn);

const cbMajorDe = getTonality("-7", "major", "de");
console.log("Ces-Dur:", cbMajorDe);
*/

(function () {
    const answer = {
        "-7": {
            "major": { "ja": "変ハ長調", "en": "Cb major", "de": "Ces-Dur" },
            "minor": { "ja": "変イ短調", "en": "Ab minor", "de": "as-Moll" }
        },
        "-6": {
            "major": { "ja": "変ト長調", "en": "Gb major", "de": "Ges-Dur" },
            "minor": { "ja": "変ホ短調", "en": "Eb minor", "de": "es-Moll" }
        },
        "-5": {
            "major": { "ja": "変ニ長調", "en": "Db major", "de": "Des-Dur" },
            "minor": { "ja": "変ロ短調", "en": "Bb minor", "de": "b-Moll" }
        },
        "-4": {
            "major": { "ja": "変イ長調", "en": "Ab major", "de": "As-Dur" },
            "minor": { "ja": "ヘ短調", "en": "F minor", "de": "f-Moll" }
        },
        "-3": {
            "major": { "ja": "変ホ長調", "en": "Eb major", "de": "Es-Dur" },
            "minor": { "ja": "ハ短調", "en": "C minor", "de": "c-Moll" }
        },
        "-2": {
            "major": { "ja": "変ロ長調", "en": "Bb major", "de": "B-Dur" },
            "minor": { "ja": "ト短調", "en": "G minor", "de": "g-Moll" }
        },
        "-1": {
            "major": { "ja": "ヘ長調", "en": "F major", "de": "F-Dur" },
            "minor": { "ja": "ニ短調", "en": "D minor", "de": "d-Moll" }
        },
        "0": {
            "major": { "ja": "ハ長調", "en": "C major", "de": "C-Dur" },
            "minor": { "ja": "イ短調", "en": "A minor", "de": "a-Moll" }
        },
        "+1": {
            "major": { "ja": "ト長調", "en": "G major", "de": "G-Dur" },
            "minor": { "ja": "ホ短調", "en": "E minor", "de": "e-Moll" }
        },
        "+2": {
            "major": { "ja": "ニ長調", "en": "D major", "de": "D-Dur" },
            "minor": { "ja": "ロ短調", "en": "B minor", "de": "h-Moll" }
        },
        "+3": {
            "major": { "ja": "イ長調", "en": "A major", "de": "A-Dur" },
            "minor": { "ja": "嬰ヘ短調", "en": "F# minor", "de": "fis-Moll" }
        },
        "+4": {
            "major": { "ja": "ホ長調", "en": "E major", "de": "E-Dur" },
            "minor": { "ja": "嬰ハ短調", "en": "C# minor", "de": "cis-Moll" }
        },
        "+5": {
            "major": { "ja": "ロ長調", "en": "B major", "de": "H-Dur" },
            "minor": { "ja": "嬰ト短調", "en": "G# minor", "de": "gis-Moll" }
        },
        "+6": {
            "major": { "ja": "嬰ヘ長調", "en": "F# major", "de": "Fis-Dur" },
            "minor": { "ja": "嬰ニ短調", "en": "D# minor", "de": "dis-Moll" }
        },
        "+7": {
            "major": { "ja": "嬰ハ長調", "en": "C# major", "de": "Cis-Dur" },
            "minor": { "ja": "嬰イ短調", "en": "A# minor", "de": "ais-Moll" }
        }
    };

    window.getTonality = function (id, mode, lang) {
        const data = answer[id];
        if (data && data[mode] && data[mode][lang]) {
            return data[mode][lang];
        } else {
            return "該当する調名が見つかりません。";
        }
    };
})();