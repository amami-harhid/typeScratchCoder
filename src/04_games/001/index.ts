/**
 * いろいろ試そう-012
 * 
 * 文字を表示する
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite, SvgImageAttributes } from "@tscratch3/typescratcher";

// 【MAP読み込み】
import { Map01 } from "./sub/map";

// 【画像読み込み】
import wallPng  from '../assets/wall.png';
const WallImage = new Ts.Image({wallPng});

import SlimeSvg from '../assets/slime_a.svg';
const SlimeImage = new Ts.Image({SlimeSvg});
import WaterSvg from '@Assets/water.svg';
const WaterImage = new Ts.Image({WaterSvg});

// 【スプライト】壁
const wall = new Ts.Sprite('wall');
wall.Costume.add( [WallImage] );
wall.Looks.hide();

wall.Event.flagPresser().func = async function*(this:Sprite){
    const w = 30;
    const h = 30;
    let x = 0;
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const _row of Map01) {
        let y = 0; 
        //console.log(_row);
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for(const _elem of _row) {
            console.log(x,y)
            if(_elem == 1) {
                //const pos: number[] = [ w*x,  h*y ];
                //console.log( pos);
                this.Motion.position.xy =  [ w*x,  h*y ];
                this.Control.clone();
            }
            y+=1;
        }
        x+=1;
    }

}
wall.Event.cloned().func = async function*(this:Sprite) {
    this.Looks.show();
}

// 【スプライト】(Spriteスライム)
const slime = new Ts.Sprite('slime');

// 画像をスプライトへ追加
slime.Costume.add( [SlimeImage] );
slime.Motion.position.xy = [ 0, 0 ];

// 大きさの設定
slime.Looks.size.scale = [50, 50];

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

slime.Event.flagPresser().func = async function*(this:Sprite){
    this.Looks.size.scale = [250, 250];
    touch.text = '' // 初期化

};

// 【旗】が押されたとき
slime.Event.flagPresser().func = async function*(this:Sprite){
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
