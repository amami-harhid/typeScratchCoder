/**
 * いろいろ試そう-003
 * ペンで線を引いてみよう。
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";
import { SharkImage, WaterImage } from "./sub/image";
// 【スプライト】(さめ)
const shark = new Ts.Sprite( "shark" );
// さめイメージをスプライトへ追加
shark.Costume.add( SharkImage );
shark.Looks.size.scale = [ 30, 30 ];
// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( WaterImage );
shark.Event.flagPresser().func = function( this : Sprite ) {
    // 初期位置 ( 中央 )
    this.Motion.position.xy = [ 0, 0 ];
    // 初期の大きさ ( 30% )
    this.Looks.size.scale = [ 30, 30 ];
    // 画像効果初期化
    this.Looks.effect.clear();
    // 少しまつ
    this.Control.wait( 1 );
    // ペンをクリアする
    this.Pen.penClear();

    // ずっと繰り返す
    for ( ;; ) {
        this.Looks.bubble.say( "ペンをひく" );
        this.Pen.HSVColor.hue = 0; // 色相 [0 - 360]
        //this.Pen.HSVColor.saturation = 0;
        this.Pen.HSVColor.transparency = 0; // 透明度
        // ペンの太さ=1
        this.Pen.size.thickness = 1;
        this.Pen.penDown();
        // 20回繰り返す
        for ( const _ of Ts.Loop.Iterator( 20 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.COLOR, +25 );
            // どこかに行く
            this.Motion.move.toRandom();
            // ペン太さを太くしていく
            this.Pen.size.thickness += 1;
            // ペンの色を変える
            this.Pen.HSVColor.hue += 15; // 色相 [0 - 360]
            //this.Pen.HSVColor.saturation += 5; // 彩度
            //this.Pen.HSVColor.brightness += 5; // 明度
            this.Pen.HSVColor.transparency += 10; // 透明度
            console.log(
                `hue=${this.Pen.HSVColor.hue}, saturation=${this.Pen.HSVColor.saturation}, brightness=${this.Pen.HSVColor.brightness}, transparency=${this.Pen.HSVColor.transparency}`,
            );
            // すこし待つ
            this.Control.wait( 0.5 );
        }
        this.Pen.penUp();
        this.Pen.penClear();
        this.Looks.bubble.say( "スタンプ" );
        // 20回繰り返す
        for ( const _ of Ts.Loop.Iterator( 20 ) ) {
            this.Looks.effect.change( Ts.ImageEffective.COLOR, +25 );
            // どこかに行く
            this.Motion.move.toRandom();
            // スタンプする
            this.Pen.stamp();
            // すこし待つ
            this.Control.wait( 0.5 );
        }
        // ペンをクリアする
        this.Pen.penClear();
    }
};
// 開始
Ts.engine.start();
