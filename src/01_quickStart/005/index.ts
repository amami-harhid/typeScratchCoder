/**
 * サンプル-005
 * コスチュームと背景を切り替えよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像 URL 】
// ここではScratch財団が公開してる画像URLを使います
// URLを探すビューアー :  https://amami-harhid.github.io/typescratcherAssets/web/
const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const CatBSvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/0fb9be3e8397c983338cb71dc84d0b25.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';
const CanyonPng = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/c7c0b27b959193a0b570a9639cfe8158.png/get';

// イメージ作成
const CatAImage = new Ts.Image({ CatASvg });
const CatBImage = new Ts.Image({ CatBSvg });
const BlueskyImage = new Ts.Image({ BlueskySvg });
const CanyonImage = new Ts.Image({CanyonPng});

// スプライト作成
const cat = new Ts.Sprite( "cat" );
cat.Costume.add( [ CatAImage, CatBImage ] ); // イメージを追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [ BlueskyImage, CanyonImage ] ); // 背景を追加

// 【旗クリックされたとき】
cat.Event.flagPresser().func = async function*(this: Sprite) {
    // Looks: 「見た目」系
    // costume.next: 「次のコスチュームにする」
    // backdrop.next: 「次の背景にする」
    
    // Control: 「制御」
    // wait : 指定した秒数だけ待つ。 awaitをつけること！
    
    for(;;) {
        this.Motion.move.steps(5);
        this.Motion.move.ifOnEdgeBounce();
        this.Looks.costume.next(); // 次のコスチュームにする
        this.Looks.backdrop.next(); // 次の背景にする
        //await this.Control.wait(0.1); // 0.1秒だけ待つ
        yield;
    }
}


// 開始
Ts.engine.start();
