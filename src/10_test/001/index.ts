/**
 * コード変換-001
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite, Stage } from "@tscratch3/typescratcher";

const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';
const AElecBass =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/5cb46ddd903fc2c9976ff881df9273c9.wav/get";

// イメージ作成
const CatAImage = new Ts.Image( {
    CatASvg 
} );
const BlueskyImage = new Ts.Image( {
    BlueskySvg 
} );
const AElecBassSound = new Ts.Sound( {
    AElecBass 
} );

const sprite = new Ts.Sprite( 'test' );
sprite.Costume.add( CatAImage );
sprite.Sound.add( AElecBassSound );

const stage = new Ts.Stage();
stage.Backdrop.add( BlueskyImage );
stage.Sound.add( AElecBassSound );

const test : boolean = false;

const spriteFlagPresser = function( this : Sprite ) {
    this.Control.wait( 2 );
    this.Control.waitUntil( ()=>test );
    this.Control.waitWhile( ()=>test );
    this.Broadcast.sendAndWait( 'TEST' );
    this.Looks.bubble.sayForSecs( 'TEST', 2 );
    this.Looks.bubble.thinkForSecs( 'TEST', 2 );
    this.Motion.move.glideTo( 2, [ 0, 0 ] );
    this.Motion.move.glideToRandom( 2 );
    this.Motion.move.glideToMouse( 2 );
    this.Sensing.askAndWait( 'TEST' );
    this.Sound.playUntilDone( AElecBassSound );
    this.Speech.speech( 'TEST' );
};

sprite.Event.flagPresser().func = spriteFlagPresser;

const stageFlagPresser = function( this : Stage ) {
    this.Looks.backdrop.nextAndWait();
    this.Looks.backdrop.previousAndWait();
    this.Looks.backdrop.switchRandomAndWait();
    this.Looks.backdrop.switchAndWait( BlueskyImage );
    this.Control.wait( 2 );
    this.Control.waitUntil( ()=>test );
    this.Control.waitWhile( ()=>test );
    this.Broadcast.sendAndWait( 'TEST' );
    this.Sensing.askAndWait( 'TEST' );
    this.Sound.playUntilDone( AElecBassSound );
    this.Speech.speech( 'TEST' );

};

stage.Event.flagPresser().func = stageFlagPresser;

// 開始
Ts.engine.start();