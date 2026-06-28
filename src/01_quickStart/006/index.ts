/**
 * サンプル-006
 * ふきだし（言う・考える）を表示してみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像 URL 】
// ここではScratch財団が公開してる画像URLを使います
// URLを探すビューアー :  https://amami-harhid.github.io/typescratcherAssets/web/
const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const CatBSvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/0fb9be3e8397c983338cb71dc84d0b25.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';

// イメージ作成
const CatAImage = new Ts.Image({ CatASvg });
const CatBImage = new Ts.Image({ CatBSvg });
const BlueskyImage = new Ts.Image({ BlueskySvg });

// スプライト作成(左のネコ)
const catA = new Ts.Sprite( "catA" );
catA.Costume.add( [ CatAImage ] ); // イメージを追加
catA.Motion.position.xy = [-100, -100];

// スプライト作成(右のネコ)
const catB = new Ts.Sprite( "catB" );
catB.Costume.add( [ CatBImage ] ); // イメージを追加
catB.Motion.position.xy = [ 100, -100];
catB.Looks.size.w = -100;  // 幅をマイナスとすることで 反対に向く

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [ BlueskyImage ] ); // 背景を追加

// 【旗クリックされたとき】( 左のネコ )
catA.Event.flagPresser().func = async function*(this: Sprite) {
    this.Looks.bubble.say('やあ、こんにちは');
    await this.Control.wait(4);
    this.Looks.bubble.say('');

}
// 【旗クリックされたとき】( 右のネコ )
catB.Event.flagPresser().func = async function*(this: Sprite) {
    await this.Control.wait(2);
    this.Looks.bubble.think('こんにちは');
    await this.Control.wait(2);
    this.Looks.bubble.say('');
}

// 開始
Ts.engine.start();
