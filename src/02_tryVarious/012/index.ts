/**
 * いろいろ試そう-012
 *
 * 文字を表示する
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite, SvgImageAttributes } from "@tscratch3/typescratcher";

// 【画像読み込み】
import BluSkySvg from "@Assets/Blue Sky.svg";
const BlueSkyImage = new Ts.Image( { BluSkySvg } );

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( BlueSkyImage );

// 文字列イメージ化
const HELLO = "Ohoo my typescratcher";
const attribute : SvgImageAttributes = {
    fill: "#f00000", // 文字色
    font_family: Ts.ScratchFontFamily.Scratch,
};
const helloImage = new Ts.FontImage( attribute );
await helloImage.textToSvg( HELLO );

// 文字スプライトを作成
const moji = new Ts.Sprite( "moji" );
moji.Costume.add( helloImage );
moji.Looks.size.scale = [ 50, 50 ];

// 旗が押されたときの「文字」のスレッド
moji.Event.flagPresser().func = async function* ( this : Sprite ) {
    // 中心座標
    this.Motion.position.xy = [ 0, 0 ];
    // 右90度
    this.Motion.direction.degree = 90;
    // 回転方法は自由に回転
    this.Motion.rotation.style = Ts.Rotation.ALL_AROUND;
    // ずっと繰り返す
    for ( ;; ) {
        // 向いている方向へ進む
        this.Motion.move.steps( 2 );
        // 向きを変える
        this.Motion.direction.degree += 1;
        // もし端に触れたら跳ね返る
        this.Motion.move.ifOnEdgeBounce();
        yield;
    }
};

// 開始
Ts.engine.start();
