/**
 * 基本-011
 * スプライトが色に触ったら「ニャー」と鳴く
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import CatSvg from '@Assets/cat.svg';
import ArrowSvg from '@Assets/Arrow1-a.svg';
import BasketballPng from '@Assets/Basketball 2.png';

// 【音 import】
import CatWav from '@Assets/Cat.wav';

// イメージ作成
const CatImage = new Ts.Image({CatSvg});
const ArrowImage = new Ts.Image({ArrowSvg});
const BasketballImage = new Ts.Image({BasketballPng});

// サウンド作成
const CatSound = new Ts.Sound({CatWav});

// スプライト作成
const cat = new Ts.Sprite('cat');
cat.Costume.add( [CatImage] );
cat.Looks.size.scale = [500, 500];

const arrow = new Ts.Sprite('arrow');
arrow.Costume.add([ArrowImage]);
arrow.Sound.add([CatSound]);
arrow.Looks.size.scale = [20,20];

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BasketballImage] ); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function*(this:Sprite){
    // 回転を「回転しない」にする
    this.Motion.rotation.style = Ts.Rotation.DONT_ROTATE;
    // 角度を設定する
    this.Motion.direction.degree = 90;
    // 位置を中央にする
    this.Motion.position.xy = [0, 0]; 
    // 大きさを大きくする( 横、縦のパーセンテージ )
    this.Looks.size.scale = [500, 500];
}

// 旗を押したときのイベント定義
arrow.Event.flagPresser().func = async function*(this:Sprite) {
    this.Motion.position.xy = [0,0];
    for(;;){
        const mouse = { x: this.Sensing.mouse.x, y: this.Sensing.mouse.y };
        this.Motion.position.xy = [mouse.x, mouse.y];
        yield;
    }
}


// 旗を押したときのイベント定義
arrow.Event.flagPresser().func = async function*(this:Sprite) {
    for(;;){
        if(this.Sensing.color.isTouching('#FFAB19')) {
            this.Sound.play(CatSound);
        }
        yield;
    }
}

// 開始
Ts.engine.start();