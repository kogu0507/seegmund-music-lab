// dictToneInstruments.js
// 楽器データとセットアップ処理を担当

// サンプラーの設定例（必要に応じて設定項目を追加）
export const PIANO_SAMPLER_1 = {  
    name: "PianoSampler1",
    url: "path/to/piano1.mp3",
    // 他のTone.jsの設定オプションをここに追加
  };
  
  export const PIANO_SAMPLER_2 = {  
    name: "PianoSampler2",
    url: "path/to/piano2.mp3",
    // 他のTone.jsの設定オプションをここに追加
  };
  
  /**
   * 楽器データのロードと Tone.js を使った初期化処理を行います。
   */
  export async function setupInstruments() {
    try {
      // 例：Tone.Sampler を使ってサンプラーを作成
      // ※ 実際のアプリケーションでは、複数のサンプラーを管理する仕組みにすることが望ましい
      const sampler1 = new Tone.Sampler({
        urls: { C4: PIANO_SAMPLER_1.url },
        // オプションなど
      }).toDestination();
  
      const sampler2 = new Tone.Sampler({
        urls: { C4: PIANO_SAMPLER_2.url },
        // オプションなど
      }).toDestination();
  
      console.log("Samplers have been initialized.");
      // 【アップデート候補】
      // - サンプラーごとにエフェクトの適用や音量調整を追加
  
    } catch (error) {
      console.error("Error during instrument setup:", error);
      throw error;
    }
  }