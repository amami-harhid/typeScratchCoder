/**
 * サンプル 09
 * スプライトに触ったら「ニャー」と鳴く
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import CatSvg from '@Assets/cat.svg';
import BasketballPng from '@Assets/Basketball 2.png';

// 【音 import】
import CatWav from '@Assets/Cat.wav';

// イメージ作成
const CatImage = new Ts.Image({CatSvg});
const BasketballImage = new Ts.Image({BasketballPng});

// サウンド作成
const CatSound = new Ts.Sound({CatWav});

// スプライト作成
const cat = new Ts.Sprite('apple');
cat.Costume.add( [CatImage] ); // イメージを１個追加
cat.Sound.add( [CatSound] ); // サウンドを１個追加

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
cat.Event.flagPresser().func = async function*(this:Sprite){
    // ずっと繰り返す
    for(;;){
        // マウスが触れたとき
        if(this.Sensing.mouse.isTouching) {
            console.log('isTouch')
            await this.Sound.playUntilDone(CatSound);
        }
        yield;
    }
}

// 開始
Ts.engine.start();