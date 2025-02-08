// events.js
// TODO: フラットな形にした方が良いかも？エラーでてる。そしたらDictationUIControllerも修正かな
export const events = {
    player: { // player 名前空間
        READY: "player.ready",
        START_PLAYBACK: "player.startPlayback",
        STOP_PLAYBACK: "player.stopPlayback"
    },
    score: { // score 名前空間
        CHANGE: 'score.change',
        // ...
    },
    errors: {
        SCORE_CHANGE: {
            code: "SCORE_CHANGE_CODE",
            message: "楽譜の変更に失敗しました。別の楽譜を選択してください。"
        },
        START_PLAYBACK: {
            code: "START_PLAYBACK_CODE",
            message: "再生を開始できませんでした。"
        },
        STOP_PLAYBACK: {
            code: "STOP_PLAYBACK_CODE",
            message: "再生を停止できませんでした。" // STOP_PLAYBACKのエラーメッセージを追加
        },
        READY: {
            code: "READY_CODE",
            message: "準備が完了できませんでした。" // READYのエラーメッセージを追加
        }
    }
};