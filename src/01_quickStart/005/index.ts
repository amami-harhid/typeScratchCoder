/**
 * サンプル-005
 * コスチュームと背景を切り替えよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// イメージ作成
import { CatAImage, CatBImage, BlueskyImage, CanyonImage } from './sub/images';

// スプライト作成
const cat = new Ts.Sprite( "cat" );
cat.Costume.add( CatAImage, CatBImage ); // イメージを追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage, CanyonImage ); // 背景を追加

// 【旗クリックされたとき】
cat.Event.flagPresser().func = async function* ( this : Sprite ) {
    // Looks: 「見た目」系
    // Looks.costume.next: 「次のコスチュームにする」
    // Looks.backdrop.next: 「次の背景にする」
    
    // Control: 「制御」
    // Control.wait : 指定した秒数だけ待つ。 awaitをつけること！
    
    for( ;; ) {
        this.Motion.move.steps( 5 );
        this.Motion.move.ifOnEdgeBounce();
        this.Looks.costume.next(); // 次のコスチュームにする
        this.Looks.backdrop.next(); // 次の背景にする
        await this.Control.wait( 0.1 ); // 0.1秒だけ待つ
        yield;
    }
};


// 開始
Ts.engine.start();
