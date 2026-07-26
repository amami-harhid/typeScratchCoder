/**
 * いろいろ試そう-011
 *
 * 文字を音声にする
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

Ts.Env.debugMode = true;

// 【画像読み込み】
import catSvg from "@Assets/cat.svg";
const CatImage = new Ts.Image({ catSvg });
import WaterSvg from "@Assets/water.svg";
const WaterImage = new Ts.Image({ WaterSvg });

// 【スプライト】(Spriteネコ)
const cat = new Ts.Sprite("cat");

// 画像をスプライトへ追加
cat.Costume.add([CatImage]);
cat.Motion.position.xy = [0, 0];

// 大きさの設定
cat.Looks.size.scale = [250, 250];

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add([WaterImage]);

// 変数(タッチ)
const speechText = Ts.Variable.string("こら、触ったね");
Ts.Variable.monitoring({ text: speechText });

// 緑の旗が押されたときの「ねこ」のスレッド
cat.Event.flagPresser().func = async function* (this: Sprite) {
    this.Looks.size.scale = [250, 250];
    // Speech
    // 国をJAPANESEとし、
    // 声タイプ(ALTO)⇒声タイプ(FEMAIL)へ新規コピー
    // 声タイプ(FEMAIL)のピッチを 150 に変更する。
    this.Speech.locale(Ts.SpeechLocale.JAPANESE)
        .type(Ts.SpeechVoiceType.ALTO)
        .typeCopyTo("FEMAIL")
        .pitch(150);
    // Speech
    // 国をJAPANESEとし、
    // 声タイプ(TENOR)⇒声タイプ(MAIL)へ新規コピー
    // 声タイプ(MAIL)のピッチを 50 に変更する。
    this.Speech.locale(Ts.SpeechLocale.JAPANESE)
        .type(Ts.SpeechVoiceType.TENOR)
        .typeCopyTo("MAIL")
        .pitch(50);
    /** タッチ判定 */
    const _touch = () => {
        return this.Sensing.mouse.isTouching;
    };
    /** 声タイプ切り分けフラグ */
    let speechFlag = true;
    for (;;) {
        if (_touch()) {
            // タッチしているとき
            if (speechFlag) {
                // ピッチ加工したFEMAILの声
                await this.Speech.type("FEMAIL").speech(speechText.text);
            } else {
                // ピッチ加工したMAILの声
                await this.Speech.type("MAIL").speech(speechText.text);
            }
            // 声タイプ反転
            speechFlag = !speechFlag;
            // マウスが触っている間、待つ
            await this.Control.waitWhile(_touch);
        }
        yield;
    }
};

// 開始
Ts.engine.start();
