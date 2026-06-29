/**
 * いろいろ試そう-006
 * 
 * 自由落下
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import dogPng from '@Assets/front_01.svg';
const DogImage = new Ts.Image( {dogPng} );
import blockSvg from '@Assets/block.svg';
const BlockImage = new Ts.Image({blockSvg});
import WaterSvg from '@Assets/water.svg';
const WaterImage = new Ts.Image({WaterSvg});

// 【スプライト】(犬)
const dog = new Ts.Sprite('shark');
// 画像をスプライトへ追加
dog.Costume.add( [DogImage] );
dog.Looks.size.scale = [20, 20];
dog.Motion.position.xy = [ 0, 180 ];

// ステージの幅
const StageWidth = Ts.StageBounds.w;
const StageHeight = Ts.StageBounds.h;

// 【スプライト】(ブロック)
const block = new Ts.Sprite('block');
block.Costume.add( [ BlockImage ] );
block.Looks.hide(); // 非表示にする
block.Looks.effect.set(Ts.ImageEffective.GHOST, 50);
// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( [WaterImage] );

// 変数
const method = Ts.Variable.string(''); 
Ts.Variable.monitoring({'ジャンプ': method});
method.hide(); // 隠す

dog.Event.flagPresser().func = async function*(this:Sprite){
    this.Motion.position.xy = [ 0, 180 ];
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転

};

block.Event.flagPresser().func = async function*(this:Sprite){
    this.Motion.position.xy = [0,0];
    const bounds = block.Looks.size.drawingSize;
    const scaleWidth = StageWidth/(bounds.right-bounds.left);
    const boundsHeight = bounds.top - bounds.bottom;
    this.Looks.size.w = scaleWidth*100;
    const blockY = boundsHeight/2 -StageHeight/2
    this.Motion.position.y = blockY;

    this.Looks.show();

    this.Broadcast.send('START', boundsHeight);
};

block.Event.cloned().func = async function*(this: Sprite) {
    this.Looks.show();
}

const INIT_JUMP = 50;
const GRAVITY = 2;
let speed = 0;
let onFloor = false;

// 旗が押されたとき
dog.Broadcast.receiver("START").func = async function*(this: Sprite, blockBoundsHeight: number) {
    console.log(`blockBoundsHeight=${blockBoundsHeight}`)
    const Bounds = this.Looks.size.drawingSize;
    const scaleH = this.Looks.size.h;
    console.log(`scaleH=${scaleH}`)
    const DogHeigth = (Bounds.top-Bounds.bottom);
    console.log(`DogHeight=${DogHeigth}`);


    // ずっと繰り返す
    for(;;){
        console.log('this.Looks.size.drawingSize=', this.Looks.size.drawingSize)
        // 自由落下
        if(onFloor === false ) {
            this.Motion.position.y += speed;
        }
        if(this.Sensing.sprite.isTouching([block])){
            this.Motion.position.y = blockBoundsHeight - StageHeight/2 + (DogHeigth/2);
            console.log(`this.Motion.position.y`, this.Motion.position.y);
            onFloor = true;
            speed = 0;
            //break;
        }
        speed -= GRAVITY;
        yield;
    }
    console.log('Dog down owari')
}

// 旗が押されたとき
dog.Broadcast.receiver("START").func = async function*(this: Sprite) {

    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転
    // ずっと繰り返す
    for(;;){
        if( onFloor === true){
            // 進める
            //this.Motion.move.steps(10);
            // 端についたら跳ね返る
            //this.Motion.move.ifOnEdgeBounce();
        }
        yield;
    }
}

// 旗が押されたとき
dog.Broadcast.receiver("START").func = async function*(this: Sprite) {

    method.text = '放物風';
    method.show();
    for(;;) {
        if(onFloor === true && this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE)){
            speed = INIT_JUMP;
            onFloor = false;
            await this.Control.waitWhile(()=>this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE));
        }
        yield;
    }

}

// 開始
Ts.engine.start();
