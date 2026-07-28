/**
 * サンプル-004
 * ずっと繰り返す、に挑戦しよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// イメージ作成
import { CatAImage, BlueskyImage } from './sub/images';

// スプライト作成
const cat = new Ts.Sprite( "cat" );
cat.Costume.add( CatAImage ); // イメージを追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage ); // 背景を追加

// 【旗クリックされたとき】のイベント定義
cat.Event.flagPresser().func = async function* ( this : Sprite ) {
    // Motion: 「動き」系
    // move: 「動かす」系
    // Motion.move.ifOnEdgeBounce: もし端についていたら跳ね返る
    for( ;; ) {
        this.Motion.move.steps( 5 );
        this.Motion.move.ifOnEdgeBounce();
        // フレームごとに休止
        yield;
    }
};


// 開始
Ts.engine.start();
