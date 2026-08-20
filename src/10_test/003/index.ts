/**
 * コード変換-003
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite, Stage } from "@tscratch3/typescratcher";

const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';
const AElecBass =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/5cb46ddd903fc2c9976ff881df9273c9.wav/get";
// イメージ作成
export const CatAImage = new Ts.Image( CatASvg );
export const BlueskyImage = new Ts.Image( BlueskySvg );
// サウンド作成
const AElecBassSound = new Ts.Sound( AElecBass );

const sprite = new Ts.Sprite( 'test' );
sprite.Costume.add( CatAImage );
sprite.Sound.add( AElecBassSound );

const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage ); 

// 【変数モニターを定義】
const distance = Ts.Variable.number( 0 ); // 初期値ゼロ
Ts.Variable.monitoring( distance ); // モニター表示登録

const spriteFlagPresser = function( this : Sprite ) {
    for( ;; ){
        console.log( "xxx" );
    }
};

sprite.Event.flagPresser().func = spriteFlagPresser;

const stageFlagPresser = function( this : Stage ) {
    //for( ;; )
    //    ;
};

stage.Event.flagPresser().func = stageFlagPresser;

// 開始
Ts.engine.start();