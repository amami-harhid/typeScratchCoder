/**
 * 基本-004
 * スプライトをずっと動し続ける
 * 端に触れたら跳ね返る
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import AppleSvg from '@Assets/front_01.svg';
import BluesskySvg from '@Assets/Blue Sky.svg';

// イメージ作成
const AppleImage = new Ts.Image({AppleSvg});
const BlueskyImage = new Ts.Image({BluesskySvg});

// スプライト作成
const apple = new Ts.Sprite('apple');
apple.Costume.add( [AppleImage] ); // イメージを１個追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BlueskyImage] ); // 背景を１個追加

// 旗を押したときのイベント定義
apple.Event.flagPresser().func = async function*(this:Sprite){
    // 回転を左右のみにする
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT;
    // 角度を設定する
    this.Motion.direction.degree = 90;
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

// 開始
Ts.engine.start();