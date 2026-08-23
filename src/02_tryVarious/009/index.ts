/**
 * いろいろ試そう-009
 *
 * マウスとの距離
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import catSvg from "@Assets/cat.svg";
const CatImage = new Ts.Image( catSvg );
import WaterSvg from "@Assets/water.svg";
const WaterImage = new Ts.Image( WaterSvg );

// 【スプライト】(Spriteネコ)
const cat = new Ts.Sprite( "cat" );

// 画像をスプライトへ追加
cat.Costume.add( CatImage );
cat.Motion.position.xy = [ 0, 0 ];

// 大きさの設定
cat.Looks.size.scale = [ 250, 250 ];

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( WaterImage );

// 変数
const distance = Ts.Variable.number( 'distance' ); //距離
distance.value = 100;
const radius = Ts.Variable.number( 'radius' ); // 半径
radius.value = 0;
const ghost = Ts.Variable.number( 'ghost' ); // 幽霊効果の値
ghost.value = 0;
const pixelate = Ts.Variable.number( 'pixelate' ); // ピクセル効果の値
pixelate.value = 0;

cat.Event.flagPresser().func = function( this : Sprite ) {
    this.Looks.size.scale = [ 250, 250 ];
    // スプライトを囲む矩形の情報を取り出す
    const bounds = this.Looks.size.drawingSize;
    // スプライトを囲む円の半径を計算しておく（参考値として）
    radius.value = Math.floor( Math.max( bounds.width / 2, bounds.height / 2 ) ); // 半径
};
cat.Event.flagPresser().func = function( this : Sprite ) {
    for ( ;; ) {
        const _distance = this.Sensing.mouse.distance;
        distance.value = Math.floor( _distance );
        if ( distance.value < radius.value ) {
            const _ghost = ( 1 - distance.value / radius.value ) * 100;
            ghost.value = Math.floor( _ghost );
            const _pixelate = ( 1 - distance.value / radius.value ) * 100;
            pixelate.value = Math.floor( _pixelate );
            this.Looks.effect.set( Ts.ImageEffective.GHOST, ghost.value );
            this.Looks.effect.set( Ts.ImageEffective.PIXELATE, pixelate.value );
        } else {
            this.Looks.effect.clear();
        }
    }
};

// 開始
Ts.engine.start();
