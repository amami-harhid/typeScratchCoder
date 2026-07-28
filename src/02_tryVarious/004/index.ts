/**
 * いろいろ試そう-004
 * 色に触れたとき
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import sharkPng from '@Assets/shark.png';
const SharkImage = new Ts.Image( { sharkPng } );
const ColorfulCityPng = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/04d18ddd1b85f0ea30beb14b8da49f60.png/get';
const ColorfulCityImage = new Ts.Image( { ColorfulCityPng } );

// 【スプライト】(さめ)
const shark = new Ts.Sprite( 'shark' );
// さめイメージをスプライトへ追加
shark.Costume.add( SharkImage );
shark.Looks.size.scale = [ 10, 10 ];
shark.Looks.size.scale.w *= -1;

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( ColorfulCityImage );

// 変数
const Touching = Ts.Variable.string( '' ); 
Ts.Variable.monitoring( { Touching } );

// 旗が押されたとき
shark.Event.flagPresser().func = async function* ( this : Sprite ) {

    this.Motion.position.xy = [ 0, 0 ];
    // ずっと繰り返す
    for( ;; ){
        // マウスに向ける
        this.Motion.point.toMouse();
        // 進める
        this.Motion.move.steps( 5 );
        yield;
    }
};

// 旗が押されたとき
shark.Event.flagPresser().func = async function* ( this : Sprite ) {

    // ずっと繰り返す
    for( ;; ){
        if( this.Sensing.color.isTouching( '#ffffff' ) ) {
            Touching.text = '雲の色に触れた';
        }else if( this.Sensing.color.isTouching( '#FFED9C' ) ) {
            Touching.text = '道路の色に触れた';
        }else{
            Touching.text = '';
        }

        yield;
    }
};

// 開始
Ts.engine.start();
