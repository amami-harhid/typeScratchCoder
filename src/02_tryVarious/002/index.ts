/**
 * いろいろ試そう-002
 * 画像効果を変化させてみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import sharkPng from '@Assets/shark.png';
const SharkImage = new Ts.Image( sharkPng );
import WaterSvg from '@Assets/water.svg';
const WaterImage = new Ts.Image( WaterSvg );


// 【スプライト】(さめ)
const shark = new Ts.Sprite( 'shark' );
// さめイメージをスプライトへ追加
shark.Costume.add( SharkImage ); 

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( WaterImage );


shark.Event.flagPresser().func = function( this : Sprite ) {
    // 初期位置 ( 中央 )
    this.Motion.position.xy = [ 0, 0 ];
    // 初期の大きさ ( 100% )
    this.Looks.size.scale = [ 100, 100 ];
    // 画像効果初期化
    this.Looks.effect.clear();
    // 少しまつ
    this.Control.wait( 1 );

    // ずっと繰り返す
    for( ;; ){
        // 50回繰り返す
        this.Looks.bubble.say( '色の効果を変えるよ' );
        for( const _ of Ts.Loop.Iterator( 50 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.COLOR, +25 );
        }
        this.Looks.bubble.say( '' );
        // 画像効果クリア
        this.Looks.effect.clear();
        // 少しまつ
        this.Control.wait( 1 );

        // 50回繰り返す
        this.Looks.bubble.say( '魚眼レンズの効果を変えるよ' );
        for( const _ of Ts.Loop.Iterator( 50 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.FISHEYE, +25 );
        }
        this.Looks.bubble.say( '' );
        // 画像効果クリア
        this.Looks.effect.clear();
        // 少しまつ
        this.Control.wait( 1 );

        // 50回繰り返す
        this.Looks.bubble.say( 'モザイクの効果を変えるよ' );
        for( const _ of Ts.Loop.Iterator( 50 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.MOSAIC, +5 );
        }
        this.Looks.bubble.say( '' );
        // 画像効果クリア
        this.Looks.effect.clear();
        // 少しまつ
        this.Control.wait( 1 );

        // 50回繰り返す
        this.Looks.bubble.say( 'ピクセルの効果を変えるよ' );
        for( const _ of Ts.Loop.Iterator( 50 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.PIXELATE, +5 );
        }
        this.Looks.bubble.say( '' );
        // 画像効果クリア
        this.Looks.effect.clear();
        // 少しまつ
        this.Control.wait( 1 );

        // 50回繰り返す
        this.Looks.bubble.say( '幽霊の効果を変えるよ' );
        for( const _ of Ts.Loop.Iterator( 50 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.GHOST, +2 );
        }
        this.Looks.bubble.say( '' );
        // 画像効果クリア
        this.Looks.effect.clear();
        // 少しまつ
        this.Control.wait( 1 );
    }
};


// 開始
Ts.engine.start();
