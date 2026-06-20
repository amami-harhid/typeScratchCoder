/**
 * 基本-012
 * スプライトの色が、目的の色に触ったら「ニャー」と鳴く
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import AppleSvg from '@Assets/apple.svg';
import BlueskySvg from '@Assets/Blue Sky.svg';

// 【音 import】
import CatWav from '@Assets/Cat.wav';

// イメージ作成
const AppleImage = new Ts.Image({AppleSvg});
const BlueskyImage = new Ts.Image({BlueskySvg});

// サウンド作成
const CatSound = new Ts.Sound({CatWav});

// スプライト作成
const apple = new Ts.Sprite('apple');
apple.Costume.add( [AppleImage] ); // イメージを１個追加
apple.Sound.add( [CatSound] ); // サウンドを１個追加
// 大きさを小さくする( 横、縦のパーセンテージ )
apple.Looks.size.scale = [50, 50];

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BlueskyImage] ); // 背景を１個追加

// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // 回転を「回転しない」にする
    this.Motion.rotation.style = Ts.Rotation.DONT_ROTATE;
    // 角度を設定する
    this.Motion.direction.degree = 90;
    // 位置を中央にする
    this.Motion.position.xy = [0, 0]; 
    // 大きさを小さくする( 横、縦のパーセンテージ )
    this.Looks.size.scale = [50, 50];
}
// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // ずっと繰り返す
    for(;;){
        const mouse = { x: this.Sensing.mouse.x, y: this.Sensing.mouse.y };
        this.Motion.position.xy = [mouse.x, mouse.y];        
        yield;
    }
}

// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // ずっと繰り返す
    for(;;){
        // リンゴの芯が緑色に触れたら
        if(this.Sensing.color.isTouchingBy('#99661D','#00CC44')) {
            this.Sound.play(CatSound);
        }
        yield;
    }
}

// 開始
Ts.engine.start();