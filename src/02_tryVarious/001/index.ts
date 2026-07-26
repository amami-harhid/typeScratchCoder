/**
 * いろいろ試そう-001
 * 大きくなったり小さくなったり
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import ObakeSvg from '../../../assets/obake.svg';
const ObakeImage = new Ts.Image( { ObakeSvg } );
import BasketballPng from '../../../assets/Basketball 2.png';
const BasketballImage = new Ts.Image( { BasketballPng } );


// 【スプライト】(おばけ)
const obake = new Ts.Sprite( 'obake' );
// おばけ画像をスプライトへ追加
obake.Costume.add( ObakeImage ); 

// 【ステージ】(BlueSky)
const stage = new Ts.Stage();
stage.Backdrop.add( BasketballImage );


obake.Event.flagPresser().func = async function*( this: Sprite ) {
    // 初期位置 ( 中央 )
    this.Motion.position.xy = [ 0, 0 ];
    // 初期の大きさ ( 100% )
    this.Looks.size.scale = [ 100, 100 ];

    // ずっと繰り返す
    for( ;; ){
        // 10回繰り返す(横に大きくする)
        for( const _ of Ts.Loop.Iterator( 10 ) ) {
            this.Looks.size.scale.w += 5;
            //console.log('w + 5 ', this.Looks.size.scale)
            yield;
        }
        // 10回繰り返す(縦に大きくする)
        for( const _ of Ts.Loop.Iterator( 10 ) ) {
            this.Looks.size.scale.h += 5;
            //console.log('h + 5 ', this.Looks.size.scale)
            yield;
        }
        // 10回繰り返す(横に小さくする)
        for( const _ of Ts.Loop.Iterator( 10 ) ) {
            this.Looks.size.scale.w -= 5;
            //console.log('w - 5 ', this.Looks.size.scale)
            yield;
        }
        // 10回繰り返す(縦に小さくする)
        for( const _ of Ts.Loop.Iterator( 10 ) ) {
            this.Looks.size.scale.h -= 5;
            //console.log('h - 5 ', this.Looks.size.scale)
            yield;
        }
        yield;
    }
}


// 開始
Ts.engine.start();
