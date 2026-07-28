/**
 * サンプル-003
 * スプライトを移動させてみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// イメージ作成
import { CatAImage, BlueskyImage } from './sub/images';

// スプライト作成
export const cat = new Ts.Sprite( "cat" );
cat.Costume.add( CatAImage ); // イメージを追加

// ステージ作成
export const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage ); // 背景を追加

// スプライト【旗クリックされたとき】のイベント定義
cat.Event.flagPresser().func = async function* ( this : Sprite ) {
    // Motion: 「動き」系
    // move: 「動かす」系
    // Motion.move.steps: 指定した数だけ動かす
    this.Motion.move.steps( 5 );
};

// 開始
Ts.engine.start();
