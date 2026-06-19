/**
 * 練習-001
 * スペースキーで等速ジャンプをする
 * 左右矢印キーで左右に歩く
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite, Stage } from "@tscratch3/typescratcher";

// 【画像 import 】
import CatSvg from "@Assets/cat.svg";
import Cat2Svg from "@Assets/cat2.svg";
import BasketballPng from "@Assets/Basketball 2.png";

// 【音 import】
import CatWav from "@Assets/Cat.wav";
// イメージ作成
const CatImage = new Ts.Image({ CatSvg });
const Cat2Image = new Ts.Image({ Cat2Svg });
const BasketballImage = new Ts.Image({ BasketballPng });

// サウンド作成
const CatSound = new Ts.Sound({ CatWav });

// スプライト作成
const cat = new Ts.Sprite("cat");
cat.Costume.add([CatImage, Cat2Image]); // イメージを追加
cat.Sound.add([CatSound]); // サウンドを１個追加
cat.Motion.position.xy = [0, -120]; // 位置を中央下にする
cat.Looks.size.scale = [50, 50];

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add([BasketballImage]); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // 回転を「左右のみ」にする
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT;
    // 角度を設定する
    this.Motion.direction.degree = 90;
};

let jumping = false;
// 旗を押したときのイベント定義( 上矢印キーでジャンプする )
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // ずっと繰り返す
    for (;;) {
        if (this.Sensing.keyboard.isDown(Ts.Keyboard.UP)) {
            jumping = true;
            // ジャンプ・等速
            for (const _ of Ts.Loop.Iterator(10)) {
                // 上昇
                this.Motion.position.y += 5;
                yield;
            }
            for (const _ of Ts.Loop.Iterator(10)) {
                // 下降
                this.Motion.position.y -= 5;
                yield;
            }
            jumping = false;
        }
        yield;
    }
};

let _steps = 0; // 最初は進まない
const STEPS_MAX = 20;

// 旗を押したときのイベント定義(スペースキーで左右に動く、ジャンプ中は歩きの動作をしない)
// スペースキーを押し続けると横移動速度がだんだんと速くなる（上限＝STEPS_MAX）
cat.Event.flagPresser().func = async function* (this: Sprite) {
    let _degree = 90; // 最初は右向き
    // ずっと繰り返す
    for (;;) {
        if(jumping === true) {
            // ジャンプ中は、スペースキーで横向き動作をスタートしない。
            // 横向き動作中にジャンプしたときは 横向きの速さは維持したまま
            this.Motion.direction.degree = _degree;
            this.Motion.move.steps(_steps);
        }else{
            // ジャンプ中でないときにスペースキーを押すと横向き動作を始める
            if(this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE)) {
                _steps = Math.min(STEPS_MAX, _steps+0.1);
            }else{
                if(_steps > 0) {
                    _steps = Math.max( 0,  _steps-0.5);
                }
            }
            if(_steps > 0){
                this.Motion.direction.degree = _degree;
                this.Motion.move.steps(_steps);
                this.Looks.costume.next();
            }
        }
        // 端にふれたときは
        if(this.Sensing.edge.isTouching) {
            _degree *= -1; // 反転させる
        }
        yield;
    }
};

// 旗を押したときのイベント定義(音を鳴らす)
cat.Event.flagPresser().func = async function* (this: Sprite) {
    const MAX_PITCH = 120;
    const MIN_PITCH = -100;
    let _pitch = 0;
    this.Sound.setPitch(CatSound, MIN_PITCH+_pitch);
    // ずっと繰り返す
    for (;;) {
        if(_steps > 0) {
            this.Sound.play(CatSound);
        }else{
            if(_pitch > 0) {
                // ピッチが
                this.Sound.play(CatSound);
            }
        }
        if(this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE)) {
            _pitch = Math.min(MAX_PITCH-MIN_PITCH, _pitch+0.5); // 徐々にピッチ速くする
        }else{
            _pitch = Math.max(0, _pitch-5.0); // 急激にピッチ遅くする
        }
        this.Sound.setPitch(CatSound, MIN_PITCH+_pitch);
        yield;
    }
};

// 旗を押したときのイベント定義（ステージ）
stage.Event.flagPresser().func = async function* (this: Stage) {
    // 何もしない
};

// 開始
Ts.engine.start();
