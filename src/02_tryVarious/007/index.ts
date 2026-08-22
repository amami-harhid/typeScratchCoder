/**
 * いろいろ試そう-007
 *
 * 質問する
 * ・スペースを押すと スプライトが質問をする
 * ・Ａキーを押すと、ステージが質問をする
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite, Stage } from "@tscratch3/typescratcher";

// 【バーチャルパッド】
import { virtualPad } from "./sub/virtualPad";
virtualPad();

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

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( WaterImage );

// 変数
const answer = Ts.Variable.string( "" );
Ts.Variable.monitoring( {
    答え: answer 
} );
answer.hide(); // 隠す

let askingNow = false;
cat.Event.flagPresser().func = function( this : Sprite ) {
    answer.hide();
    askingNow = false;
    this.Motion.position.xy = [ 0, 0 ];
};

const ASKING = "ASKING";
cat.Event.keyPresser( Ts.Keyboard.SPACE ).func = function( this : Sprite ) {
    if ( askingNow === true ) return;
    this.Broadcast.send( ASKING );
};
cat.Broadcast.receiver( ASKING ).func = function( this : Sprite ) {
    askingNow = true;
    this.Sensing.askAndWait( "今日はご機嫌よろしいですか？" );
    answer.text = this.Sensing.answer;
    answer.show();

    if ( answer.text == "はい" ) {
        this.Looks.bubble.say( "YES" );
    } else if ( answer.text == "いいえ" ) {
        this.Looks.bubble.think( "no...." );
    } else {
        this.Looks.bubble.say( "" );
        askingNow = false;
        // 質問をする
        console.log( "RE ASKING" );
        this.Broadcast.send( ASKING );
    }
};
const ASKING_STAGE = "ASKING_STAGE";
stage.Event.keyPresser( "A" ).func = function( this : Stage ) {
    if ( askingNow === false ) {
        askingNow = true;
        this.Broadcast.sendAndWait( ASKING_STAGE );
        askingNow = false;
    }
};
stage.Broadcast.receiver( ASKING_STAGE ).func = function( this : Sprite ) {
    answer.hide();
    this.Sensing.askAndWait(
        "ステージだよ。「はい」か「いいえ」で答えて",
    );
    answer.text = this.Sensing.answer;
    answer.show();
    if ( answer.text == "はい" || answer.text == "いいえ" ) {
        return;
    }
    // 質問をする
    this.Broadcast.send( ASKING_STAGE );
};
// 開始
Ts.engine.start();
