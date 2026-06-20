/**
 * 基本-005
 * 音を読み込んでサウンド設定、端に触れたら音を鳴らす。
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import AppleSvg from '@Assets/Apple.svg';
import BluesskySvg from '@Assets/Blue Sky.svg';
import CatWav from '@Assets/Cat.wav';

// イメージ作成
const AppleImage = new Ts.Image({AppleSvg});
const BlueskyImage = new Ts.Image({BluesskySvg});

// サウンド作成
const CatSound = new Ts.Sound({CatWav});

// スプライト作成
const apple = new Ts.Sprite('cat');
apple.Costume.add( [AppleImage] ); // イメージを１個追加
apple.Sound.add( [CatSound] ); // サウンドを１個追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BlueskyImage] ); // 背景を１個追加

// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // 回転を左右のみにする
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT;
    // 角度を設定する
    this.Motion.direction.degree = 45; // 少しだけ斜めにする
}

// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // 位置を中央にする
    this.Motion.position.xy = [0, 0]; 
    // ずっと 繰り返す
    for(;;){
        // １０進む
        this.Motion.move.steps(10);
        // 端に触れたら跳ね返る
        this.Motion.move.ifOnEdgeBounce();
        yield;
    }
}

// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // ずっと 繰り返す
    for(;;){
        // 端に触れたとき
        if(this.Sensing.edge.isTouching) {
            // 端に触れたら音を鳴らす
            this.Sound.play(CatSound)
        }
        yield;
    }
}
// 開始
Ts.engine.start();