/**
 * 基本-002
 * スプライトを横に動かす
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import AppleSvg from '@Assets/Apple.svg';
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
    // 旗を押すと 10 進む。
    this.Motion.move.steps(10);
}

// 開始
Ts.engine.start();