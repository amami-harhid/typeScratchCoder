/**
 * サンプル-007
 * ふきだし（言う・考える）を表示してみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// イメージ作成
import { CatAImage, CatBImage, BlueskyImage } from "./sub/images";

// スプライト作成(左のネコ)
const catA = new Ts.Sprite( "catA" );
catA.Costume.add( [ CatAImage ] ); // イメージを追加
catA.Motion.position.xy = [-100, -100]; // 座標の位置[X座標、Y座標]

// スプライト作成(右のネコ)
const catB = new Ts.Sprite( "catB" );
catB.Costume.add( [ CatBImage ] ); // イメージを追加
catB.Motion.position.xy = [ 100, -100]; // 座標の位置[X座標、Y座標]
catB.Looks.size.scale.w = -100;  // 幅をマイナスとすることで 反対に向く

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [ BlueskyImage ] ); // 背景を追加

// 【旗クリックされたとき】( 左のネコ )
catA.Event.flagPresser().func = async function*(this: Sprite) {
    this.Looks.bubble.say('やあ、こんにちは');
    await this.Control.wait(4); // 4秒間待つ
    this.Looks.bubble.say(''); // 空 ( ふきだしを消す )

}
// 【旗クリックされたとき】( 右のネコ )
catB.Event.flagPresser().func = async function*(this: Sprite) {
    await this.Control.wait(2); // 2秒間待つ
    this.Looks.bubble.think('こんにちは');
    await this.Control.wait(2); // 2秒間待つ
    this.Looks.bubble.say(''); // 空 ( ふきだしを消す )
}

// 開始
Ts.engine.start();
