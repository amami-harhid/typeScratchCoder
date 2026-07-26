/**
 * サンプル-002
 * スプライトとステージを表示してみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";

// イメージ作成
import { CatAImage, BlueskyImage } from './sub/images';

// スプライト作成
export const cat = new Ts.Sprite( "cat" );
cat.Costume.add( CatAImage ); // イメージを追加

// ステージ作成
export const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage ); // 背景を追加

// 開始
Ts.engine.start();
