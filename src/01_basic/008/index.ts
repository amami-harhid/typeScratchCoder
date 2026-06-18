/**
 * 基本-008
 * ３００回繰返し、
 * ものすごい速さで「どこか」へ移動してクローンを作る。
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import CatSvg from '@Assets/cat.svg';
import Cat2Svg from '@Assets/cat2.svg';
import BluesskySvg from '@Assets/Blue Sky.svg';

// イメージ作成
const CatImage = new Ts.Image({CatSvg});
const Cat2Image = new Ts.Image({Cat2Svg});
const BlueskyImage = new Ts.Image({BluesskySvg});


// スプライト作成
const cat = new Ts.Sprite('apple');
cat.Costume.add( [CatImage, Cat2Image] ); // イメージを２個追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BlueskyImage] ); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function*(this:Sprite){
    // 回転を「回転しない」にする
    this.Motion.rotation.style = Ts.Rotation.DONT_ROTATE;
    // 角度を設定する
    this.Motion.direction.degree = 90;
    // 位置を中央にする
    this.Motion.position.xy = [0, 0]; 
}

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function*(this:Sprite){
    // 指定した回数分、繰り返す
    for(const _ of Ts.Loop.Iterator(300)){
        // どこかへいく
        this.Motion.move.toRandom();
        // クローンをつくる
        this.Control.clone();
        yield;
    }
}

// 開始
Ts.engine.start();