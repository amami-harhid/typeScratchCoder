/**
 * いろいろ試そう-006
 *
 * 自由落下
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite, Bounds } from "@tscratch3/typescratcher";

// 【バーチャルパッド】
import { virtualPad } from "./sub/virtualPad";
virtualPad();

// 【画像読み込み】
import dogPng from "@Assets/front_01.svg";
const DogImage = new Ts.Image( dogPng );
import blockSvg from "@Assets/block.svg";
const BlockImage = new Ts.Image( blockSvg );
import WaterSvg from "@Assets/water.svg";
const WaterImage = new Ts.Image( WaterSvg );

// 【スプライト】(犬)
const dog = new Ts.Sprite( "shark" );
// 画像をスプライトへ追加
dog.Costume.add( DogImage );
dog.Looks.size.scale = [ 20, 20 ];
dog.Motion.position.xy = [ 0, 200 ];

// ステージの幅
const StageWidth = Ts.StageBounds.w;
const StageHeight = Ts.StageBounds.h;

// 【スプライト】(ブロック)
const block = new Ts.Sprite( "block" );
block.Costume.add( BlockImage );
block.Looks.visible.hide(); // 非表示にする
block.Looks.effect.set( Ts.ImageEffective.GHOST, 50 );
// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( WaterImage );

// 変数
const method = Ts.Variable.string( "" );
Ts.Variable.monitoring( { ジャンプ: method } );
method.hide(); // 隠す

dog.Event.flagPresser().func = function( this : Sprite ) {
    
    this.Motion.position.xy = [ 0, 250 ];
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転
    speed = 0;
    onFloor = false;
};

block.Event.flagPresser().func = function( this : Sprite ) {

    this.Motion.position.xy = [ 0, 0 ];
    const bounds = block.Looks.size.drawingSize;
    this.Looks.size.drawingSize = {
        w: StageWidth 
    };
    const blockY = bounds.height / 2 - StageHeight / 2;
    this.Motion.position.y = blockY;

    this.Looks.visible.show();

    this.Broadcast.send( "START", bounds );
};

const INIT_JUMP = 70;
const GRAVITY = 10;
let speed = 0;
let onFloor = false;
/**
 * moveSpeed の速さで移動したとき targetに衝突するかを判定する
 */
const isTouching = function( this : Sprite, target : Sprite, moveSpeed : number ) : boolean {

    // 自分自身の高さ
    const ownHeight = this.Looks.size.drawingSize.height;
    // ターゲットの上辺の座標位置
    const targetUpperY = target.Looks.size.drawingSize.top;
    // 次に予想される自分自身の位置
    const nextY = this.Motion.position.y + moveSpeed;
    // 次に予想される自分自身の底辺の座標位置
    const ownBottomY = nextY - ownHeight / 2;
    if ( ownBottomY > targetUpperY ) {
        return false;
    }
    return true;
};

let walkSpeed = 0;
// 犬がメッセージ(START)を受信したとき
dog.Broadcast.receiver( "START" ).func = function( this : Sprite, blockBound : Bounds ) {

    speed = 0;
    onFloor = false;
    const Bounds = this.Looks.size.drawingSize;
    const DogHeigth = Bounds.height;
    const _IsTouching = isTouching.bind( this );
    this.Pen.penDown(); // 自由落下中ペン描画をする

    // ずっと繰り返す
    for ( ;; ) {
        if ( _IsTouching( block, speed ) ) {
            // 次に衝突が予想されるとき
            this.Motion.position.y =
                blockBound.height - StageHeight / 2 + DogHeigth / 2;
            onFloor = true;
            speed = 0;
        }
        // 自由落下
        if ( onFloor === false ) {
            this.Motion.position.y += speed;
            this.Motion.move.steps( walkSpeed );
            speed -= GRAVITY;
        }
    }
};

// 犬がメッセージ(START)を受信したとき
dog.Broadcast.receiver( "START" ).func = function( this : Sprite ) {

    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転
    // ずっと繰り返す
    for ( ;; ) {
        if ( onFloor === true ) {
            // 進める
            if ( this.Sensing.keyboard.isDown( Ts.Keyboard.RIGHT ) ) {
                this.Motion.direction.degree = 90;
                walkSpeed = 10;
                this.Motion.move.steps( walkSpeed );

            } else if ( this.Sensing.keyboard.isDown( Ts.Keyboard.LEFT ) ) {
                this.Motion.direction.degree = -90;
                walkSpeed = 10;
                this.Motion.move.steps( walkSpeed );
            
            } else {
                // 地面についていないときはゼロにはならない
                walkSpeed = 0;
            }
            // 端についたら跳ね返る
            this.Motion.move.ifOnEdgeBounce();
        }
    }
};

// 犬がメッセージ(START)を受信したとき
dog.Broadcast.receiver( "START" ).func = function( this : Sprite ) {

    method.text = "放物風";
    method.show();

    for ( ;; ) {
        if ( onFloor === true &&this.Sensing.keyboard.isDown( Ts.Keyboard.SPACE ) ) {
            speed = INIT_JUMP;
            onFloor = false;
            // スペースキーが押されている間、待つ
            this.Control.waitWhile( () =>
                this.Sensing.keyboard.isDown( Ts.Keyboard.SPACE ),
            );
        }
    }
};

// 開始
Ts.engine.start();
