/**
 * いろいろ試そう-010
 *
 * マウスが触れた
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import catSvg from "@Assets/cat.svg";
const CatImage = new Ts.Image( { catSvg } );
import WaterSvg from "@Assets/water.svg";
const WaterImage = new Ts.Image( { WaterSvg } );

// 【スプライト】(Spriteネコ)
const cat = new Ts.Sprite( "cat" );

// 画像をスプライトへ追加
cat.Costume.add( CatImage );
cat.Motion.position.xy = [0, 0];

// 大きさの設定
cat.Looks.size.scale = [250, 250];

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( WaterImage );

// 変数
const touch = Ts.Variable.string( "" ); // タッチ
Ts.Variable.monitoring( { touch } );

// 旗が押されたときの「ねこ」のスレッド
cat.Event.flagPresser().func = async function* ( this: Sprite ) {
    this.Looks.size.scale = [250, 250];
    touch.text = ""; // 変数の値を初期化
};

// 旗が押されたときの「ねこ」のスレッド
cat.Event.flagPresser().func = async function* ( this: Sprite ) {
    /** 色の変化量 */
    const changeColor = 15;
    for ( ;; ) {
        if ( this.Sensing.mouse.isTouching ) {
            // マウスが触れたとき
            this.Looks.effect.change( Ts.ImageEffective.COLOR, changeColor ); // 色の効果を変える
            touch.text = "触れた";
        } else {
            touch.text = "";
        }
        yield;
    }
};

// 開始
Ts.engine.start();
