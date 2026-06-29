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

// 【スプライト】(ブロック)
const block = new Ts.Sprite('block');
block.Costume.add( [ BlockImage ] );
block.Looks.hide(); // 非表示にする

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( [WaterImage] );

// 変数
const method = Ts.Variable.string(''); 
Ts.Variable.monitoring({'ジャンプ': method});
method.hide(); // 隠す

block.Event.flagPresser().func = async function*(this:Sprite){
    const bounds = block.Looks.size.drawingSize
    console.log(bounds.bottom, bounds.top, bounds.left, bounds.right);
    const W = bounds.right - bounds.left + 5;
    console.log(W);
    const H = 20;

    const X = -200;
    const Y = -180;

    for(const _xIdx of Ts.Loop.Iterator(7)) {
        this.Motion.position.x = W * _xIdx + X; 
        for(const _yIdx of Ts.Loop.Iterator(3)) {
            this.Motion.position.y = H * _yIdx + Y;
            this.Control.clone();
            yield;
        }
        yield;
    }

    this.Broadcast.send('START');
};

block.Event.cloned().func = async function*(this: Sprite) {
    this.Looks.show();
}

const INIT_JUMP = 100;
const GRAVITY = 2;
let speed = 0;
let onFloor = false;

// 旗が押されたとき
dog.Broadcast.receiver("START").func = async function*(this: Sprite) {

    this.Motion.position.xy = [ 0, 180 ];
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転


    // ずっと繰り返す
    for(;;){        
        // 自由落下
        this.Motion.position.y += speed;
        speed -= GRAVITY;
        this.Motion.position.y -= 5;
        if( this.Sensing.sprite.isTouching([block])){
            console.log('ON FLOOR');
            onFloor = true;
            for(;;) {
                if( this.Sensing.sprite.isTouching([block])){
                    this.Motion.position.y -= speed;
                }else{
                    break;
                }
                yield;
            }
            speed = 0;
        }
        this.Motion.position.y += 5;
        yield;
    }
}

// 旗が押されたとき
dog.Broadcast.receiver("START").func = async function*(this: Sprite) {

    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転
    // ずっと繰り返す
    for(;;){
        if( onFloor === true){
            // 進める
            this.Motion.move.steps(10);
        }   
        // 端についたら跳ね返る
        this.Motion.move.ifOnEdgeBounce();
        yield;
    }
}

// 旗が押されたとき
dog.Broadcast.receiver("START").func = async function*(this: Sprite) {

    method.text = '放物風';
    method.show();
    for(;;) {
        if(onFloor === true && this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE)){
            speed = -INIT_JUMP;
            onFloor = false;
            await this.Control.waitWhile(()=>this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE));
        }
        yield;
    }

}

// 開始
Ts.engine.start();
