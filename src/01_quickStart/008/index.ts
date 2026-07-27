/**
 * サンプル-008
 * クローンを作ってみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像 import 】
import CatASvg from "@Assets/cat.svg";
import BlueskySvg from "@Assets/Blue Sky.svg";

// イメージ作成
const CatAImage = new Ts.Image( { CatASvg } );
const BlueskyImage = new Ts.Image( { BlueskySvg } );

// スプライト作成(ネコ)
const cat = new Ts.Sprite( "catA" );
cat.Costume.add( CatAImage ); // イメージを追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage ); // 背景を追加

// 【旗クリックされたとき】( ネコ )
cat.Event.flagPresser().func = async function* ( this : Sprite ) {
    // ずっと繰り返す
    for ( ;; ) {
        await this.Control.wait( 1 );
        this.Control.clone();
        yield;
    }
};
cat.Event.cloned().func = async function* ( this : Sprite ) {
    this.Looks.size.scale = [ 20, 20 ]; // 横・縦 20% にする
    this.Motion.point.toRandom();
    for ( ;; ) {
        this.Motion.move.steps( 10 );
        if ( this.Sensing.edge.isTouching ) {
            break; // 繰り返しを抜ける
        }
        yield;
    }
    this.Control.removeClone();
};

// 開始
Ts.engine.start();
