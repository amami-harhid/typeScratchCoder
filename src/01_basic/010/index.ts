/**
 * 基本-010
 * スプライトをクリックしたらクローンを作る
 * クローンされたとき、ランダムな方向へ動き出す
 * クローンは 本体のイメージ・サウンドを引き継ぐ
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

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
cat.Costume.add([CatImage, Cat2Image]); // イメージを１個追加
cat.Sound.add([CatSound]); // サウンドを１個追加
cat.Sound.setVolume(CatSound, 15);
cat.Sound.setPitch(CatSound, -50);

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add([BasketballImage]); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // 回転を「回転しない」にする
    this.Motion.rotation.style = Ts.Rotation.DONT_ROTATE;
    // 角度を設定する
    this.Motion.direction.degree = 90;
    // 位置を中央にする
    this.Motion.position.xy = [0, 0];
    // 大きさを大きくする( 横、縦のパーセンテージ )
    this.Looks.size.scale = [200, 200];
    // 透明度を50%にする
    this.Looks.effect.set(Ts.ImageEffective.GHOST, 50);
};

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // ずっと繰り返す
    for (;;) {
        // クリックしたとき
        if (this.Sensing.mouse.isDown) {
            this.Sound.play(CatSound);
            this.Control.clone();
        }
        yield;
    }
};
// クローンされたとき
cat.Event.cloned().func = async function* (this: Sprite) {
    const mouse = { x: this.Sensing.mouse.x, y: this.Sensing.mouse.y };
    this.Motion.position.xy = [mouse.x, mouse.y];
    this.Looks.effect.set(Ts.ImageEffective.GHOST, 0);
    this.Looks.size.scale = [10, 10];
    this.Motion.rotation.style = Ts.Rotation.ALL_AROUND;
    const random = Ts.RandomValue(0, 360);
    this.Motion.direction.degree = random;
    for (;;) {
        this.Motion.move.steps(20);
        this.Motion.direction.degree += Ts.RandomValue(-5, 5);
        if (this.Sensing.edge.isTouching) {
            //this.Sound.play(CatSound);
            const _random = Ts.RandomValue(-30, 30);
            this.Motion.direction.degree = _random;
        }
        this.Motion.move.ifOnEdgeBounce();
        this.Looks.costume.next();
        if (this.Sensing.sprite.isTouching([cat])) {
            this.Looks.hide();
            break;
        }
        yield;
    }
    this.Control.removeClone();
};

// 開始
Ts.engine.start();
