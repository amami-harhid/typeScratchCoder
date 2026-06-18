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
const cat = new Ts.Sprite("apple");
cat.Costume.add([CatImage, Cat2Image]); // イメージを追加
cat.Sound.add([CatSound]); // サウンドを１個追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add([BasketballImage]); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // 回転を「左右のみ」にする
    this.Motion.rotation.style = Ts.Rotation.LEFT_RIGHT;
    // 角度を設定する
    this.Motion.direction.degree = 90;
    // 位置を中央にする
    this.Motion.position.xy = [0, -120];
    // 大きさを大きくする( 横、縦のパーセンテージ )
    this.Looks.size.scale = [100, 100];
};

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // ずっと繰り返す
    for (;;) {
        if (this.Sensing.keyboard.isDown(Ts.Keyboard.SPACE)) {
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
        } else if (this.Sensing.keyboard.isDown(Ts.Keyboard.RIGHT)) {
            // 右を向く
            this.Motion.direction.degree = 90;
            this.Motion.move.steps(5);
            this.Looks.costume.next();
        } else if (this.Sensing.keyboard.isDown(Ts.Keyboard.LEFT)) {
            // 左を向く
            this.Motion.direction.degree = -90;
            this.Motion.move.steps(5);
            this.Looks.costume.next();
        }
        yield;
    }
};

stage.Event.flagPresser().func = async function* (this: Stage) {
    throw "STAGE ERROR";
};

try {
    // 開始
    Ts.engine.start();
} catch (e) {
    console.log("start でキャッチしたよ");
    throw e;
}
