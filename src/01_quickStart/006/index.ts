/**
 * サンプル-006
 * コスチュームと背景を切り替えよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

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
cat.Event.flagPresser().func = async function* ( this : Sprite ) {
    // Looks: 「見た目」系
    // Looks.costume.next: 「次のコスチュームにする」
    // Looks.backdrop.next: 「次の背景にする」
    
    // Control: 「制御」
    // Control.wait : 指定した秒数だけ待つ。 awaitをつけること！
    
    for( ;; ) {
        this.Motion.move.steps( 10 );
        this.Motion.move.ifOnEdgeBounce();
        this.Looks.costume.next(); // 次のコスチュームにする
        this.Looks.backdrop.next(); // 次の背景にする
        await this.Control.wait( 0.1 ); // 0.1秒だけ待つ
        yield;
    }
};
// 【旗クリックされたとき】( 別スレッドにしてみる )
cat.Event.flagPresser().func = async function* ( this : Sprite ) {
    
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
            await this.Control.wait( 0.1 );
            boingSoundFlag = !boingSoundFlag;
        }
        yield;
    }
};

// 開始
Ts.engine.start();
