/**
 * いろいろ試そう-005
 * いろいろなジャンプを試そう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import dogPng from '@Assets/front_01.svg';
const DogImage = new Ts.Image( {dogPng} );
import WaterSvg from '@Assets/water.svg';
const WaterImage = new Ts.Image({WaterSvg});

// 【スプライト】(犬)
const dog = new Ts.Sprite('shark');
// 画像をスプライトへ追加
dog.Costume.add( [DogImage] );
dog.Looks.size.scale = [30, 30];
dog.Motion.position.xy = [ 0, -130 ];

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( [WaterImage] );

// 変数
const method = Ts.Variable.string(''); 
Ts.Variable.monitoring({'ジャンプ': method});
method.hide(); // 隠す

// 旗が押されたとき
dog.Event.flagPresser().func = async function*(this: Sprite) {

    this.Motion.position.xy = [ 0, -130 ];
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT; // 左右のみ反転

    // ずっと繰り返す
    for(;;){        
        // 進める
        this.Motion.move.steps(10);
        // 端についたら跳ね返る
        this.Motion.move.ifOnEdgeBounce();
        yield;
    }
}
// A キーが押されたとき(等速ジャンプ)
dog.Event.keyPresser('a').func = async function*(this:Sprite) {
    method.text = '等速';
    method.show();
    const JUMP = 10;
    for(const _ of Ts.Loop.Iterator(10)) {
        this.Motion.position.y += JUMP;
        yield;
    }
    for(const _ of Ts.Loop.Iterator(10)) {
        this.Motion.position.y -= JUMP;
        yield;
    }
    method.hide();
    method.text = '';
}
// B キーが押されたとき(放物風ジャンプ)
dog.Event.keyPresser('b').func = async function*(this:Sprite) {
    method.text = '放物風';
    method.show();
    const INIT_JUMP = 30;
    const GRAVITY = 4;
    let speed = INIT_JUMP;

    for(;;) {
        this.Motion.position.y += speed;
        speed -= GRAVITY;
        if(this.Motion.position.y < -130) {
            break;
        }
        yield;
    }
    this.Motion.position.y = -130;
    method.hide();
    method.text = '';

}

// 開始
Ts.engine.start();
