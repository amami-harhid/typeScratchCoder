/**
 * 練習-002
 * スプライトをクリックしたらクローンを作る
 * クローンされたとき、ランダムな方向へ動き出す
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';

// 【画像 import 】
import CatSvg from '@Assets/cat.svg';
import BasketballPng from '@Assets/Basketball 2.png';

// 【音 import】
import CatWav from '@Assets/Cat.wav';

// イメージ作成
const CatImage = new Ts.Image({CatSvg});
const BasketballImage = new Ts.Image({BasketballPng});

// サウンド作成
const CatSound = new Ts.Sound({CatWav});

// スプライト作成
const cat = new Ts.Sprite('cat');
cat.Costume.add( [CatImage] ); // イメージを１個追加
cat.Sound.add( [CatSound] ); // サウンドを１個追加
cat.Looks.effect.set(Ts.ImageEffective.GHOST, 50);
// 角度を設定する
cat.Motion.direction.degree = 90;
// 位置を中央にする
cat.Motion.position.xy = [0, 0]; 
// 大きさを大きくする( 横、縦のパーセンテージ )
cat.Looks.size.scale = [200, 200];

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BasketballImage] ); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function*(this:Sprite){
    // 回転を「回転しない」にする
    this.Motion.rotation.style = Ts.Rotation.DONT_ROTATE;
}

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function*(this:Sprite){
    // ずっと繰り返す
    for(;;){
        // クリックしたとき(スプライトの上でないとに限る)
        if(!this.Sensing.mouse.isTouching){
            if(this.Sensing.mouse.isDown) {
                this.Sound.play(CatSound);
                this.Control.clone();
            }
        }
        yield;
    }
}
// クローンされたとき(端に触れたら跳ね返る)
cat.Event.cloned().func = async function*(this:Sprite) {
    this.Looks.effect.set(Ts.ImageEffective.GHOST, 0);
    this.Motion.rotation.style = Ts.Rotation.ALL_AROUND;// 自由に回転
    this.Looks.size.scale = [20, 20];
    const mouse = { x: this.Sensing.mouse.x, y: this.Sensing.mouse.y };
    this.Motion.position.xy = [mouse.x, mouse.y];
    this.Motion.point.toRandom(); // ランダムな向き
    for(;;) {
        this.Motion.move.steps(10);
        this.Motion.move.ifOnEdgeBounce();
        if(this.Sensing.sprite.isTouching([cat])) {
            // ネコスプライト（本体）にクローンが触ったら
            // ステージから隠す（見えなくする）
            this.Looks.hide();
            break; // ループを抜ける
        }
        yield;
    }
    // クローンを削除する
    this.Control.removeClone();
}

// 開始
Ts.engine.start();