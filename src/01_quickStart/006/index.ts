/**
 * サンプル-006
 * 端についたら音を鳴らす
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// イメージ作成
import { CatAImage, CatBImage, BlueskyImage, CanyonImage } from './sub/images';

// サウンド作成
import { BoingSound, AElecGuitarSound } from "./sub/sounds";

// スプライト作成
const cat = new Ts.Sprite( "cat" );
cat.Costume.add( CatAImage, CatBImage ); // イメージを追加
cat.Sound.add( AElecGuitarSound, BoingSound ); // 音を追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage, CanyonImage ); // 背景を追加

// 【旗クリックされたとき】
cat.Event.flagPresser().func = function ( this : Sprite ) {
    // Looks: 「見た目」系
    // Looks.costume.next: 「次のコスチュームにする」
    // Looks.backdrop.next: 「次の背景にする」
    
    // Control: 「制御」
    // Control.wait : 指定した秒数だけ待つ。 
    
    for( ;; ) {
        this.Motion.move.steps( 10 );
        this.Motion.move.ifOnEdgeBounce();
        this.Looks.costume.next(); // 次のコスチュームにする
        this.Looks.backdrop.next(); // 次の背景にする
        this.Control.wait( 0.1 ); // 0.1秒だけ待つ
    }
};
// 【旗クリックされたとき】( 別スレッドにしてみる )
cat.Event.flagPresser().func = function ( this : Sprite ) {
    
    // Sensing: 「調べる」系
    // edge: 「端」に関するもの
    // isTouching:  端にふれていたら true を返す
    
    // Sound: 「音」系
    // play :  指定したサウンドを鳴らす
    let boingSoundFlag = true;
    for( ;; ){
        if( this.Sensing.edge.isTouching === true ) {
            if( boingSoundFlag === true ){
                this.Sound.play( BoingSound );
            }else{
                this.Sound.play( AElecGuitarSound );
            }
            this.Control.wait( 0.1 );
            boingSoundFlag = !boingSoundFlag;
        }
    }
};

// 開始
Ts.engine.start();
