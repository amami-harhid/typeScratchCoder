/**
 * いろいろ試そう-012
 * 
 * 文字を表示する
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite, SvgImageAttributes } from "@tscratch3/typescratcher";

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

// 文字列イメージ化
const HELLO = 'Hello world';
const attribute : SvgImageAttributes = {
    fill: '#f0f0f0', // 文字色
    font_family: Ts.ScratchFontFamily.Scratch
};
const helloImage = new Ts.FontImage(attribute);
await helloImage.textToSvg(HELLO);

const moji = new Ts.Sprite('moji');
moji.Costume.add( [helloImage] );
moji.Looks.layer.gotoBack();


// 変数
const touch = Ts.Variable.string( '' ); // タッチ
Ts.Variable.monitoring( { touch } );

cat.Event.flagPresser().func = async function*(this:Sprite){
    this.Looks.size.scale = [250, 250];
    touch.text = '' // 初期化

};

// 【旗】が押されたとき
cat.Event.flagPresser().func = async function*(this:Sprite){
    /** 色の変化量 */
    const changeColor = 15;
    for(;;) {
        if( this.Sensing.mouse.isTouching ) {
            // マウスが触れたとき
            this.Looks.effect.change(Ts.ImageEffective.COLOR, changeColor); // 色の効果を変える
            touch.text = '触れた';

        }else{

            touch.text = '';
        }
        yield;
    }
};


// 開始
Ts.engine.start();
