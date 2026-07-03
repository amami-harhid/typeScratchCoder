/**
 * いろいろ試そう-011
 * 
 * 文字を音声にする
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

Ts.Env.debugMode = true;

// 【画像読み込み】
import catSvg from '@Assets/cat.svg';
const CatImage = new Ts.Image( {catSvg} );
import WaterSvg from '@Assets/water.svg';
const WaterImage = new Ts.Image({WaterSvg});

// 【スプライト】(Spriteネコ)
const cat = new Ts.Sprite('cat');

// 画像をスプライトへ追加
cat.Costume.add( [CatImage] );
cat.Motion.position.xy = [ 0, 0 ];

// 大きさの設定
cat.Looks.size.scale = [250, 250];

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( [WaterImage] );

// 変数
const speechText = Ts.Variable.string( 'こら、触ったね' ); // タッチ
Ts.Variable.monitoring( { text: speechText } );

cat.Event.flagPresser().func = async function*(this:Sprite){
    this.Looks.size.scale = [250, 250];
    this.Speech.locale(Ts.SpeechLocale.JAPANESE).type(Ts.SpeechGender.FEMALE).pitch(50);
    this.Speech.locale(Ts.SpeechLocale.JAPANESE).type(Ts.SpeechGender.MALE).pitch(-50);
    const _touch = () => {
        return this.Sensing.mouse.isTouching;
    }
    let speechFlag = true;
    for(;;) {
        if(_touch()){
            // スピーチする
            if(speechFlag){
                // ピッチ加工したFEMAILの声
                console.log('FEMAIL')
                await this.Speech.type(Ts.SpeechGender.FEMALE).speech(speechText.text);

            }else{
                // ピッチ加工したMAILの声
                console.log('MAIL')
                await this.Speech.type(Ts.SpeechGender.MALE).speech(speechText.text);

            }
            speechFlag = !speechFlag;
            // 触っている間、待つ
            await this.Control.waitWhile(_touch);
        }
        yield;
    }

};



// 開始
Ts.engine.start();
