/**
 * サンプル-009
 * 変数を表示してみよう( ネコとマウスポインターの距離を表示する)
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// 【変数モニターを定義】
const distance = Ts.Variable.number( 0 ); // 初期値ゼロ
Ts.Variable.monitoring( { distance } ); // モニター表示登録

// 【画像 import 】
import CatASvg from '@Assets/cat.svg';
import BlueskySvg from '@Assets/Blue Sky.svg';

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
cat.Event.flagPresser().func = function( this : Sprite ) {

    // ずっと繰り返す
    for( ;; ) {
        const _distance = this.Sensing.mouse.distance;
        distance.value = Math.floor( _distance );
    }
};

// 開始
Ts.engine.start();
