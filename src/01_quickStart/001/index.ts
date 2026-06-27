/**
 * サンプル-001
 * スプライトとステージを表示してみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";

// 【画像 URL 】
// ここではScratch財団が公開してる画像URLを使います
// URLを探すビューアー :  https://amami-harhid.github.io/typescratcherAssets/web/
const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';

// イメージ作成
const CatAImage = new Ts.Image({ CatASvg });
const BlueskyImage = new Ts.Image({ BlueskySvg });

// スプライト作成
const cat = new Ts.Sprite( "cat" );
cat.Costume.add( [CatAImage] ); // イメージを追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add([BlueskyImage]); // 背景を追加

// 開始
Ts.engine.start();
