/**
 * 基本-006
 * マウスポインターを追いかけるネコ
 * コスチュームを切り替える
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// 【画像 import 】
import CatSvg from "@Assets/cat.svg";
import Cat2Svg from "@Assets/cat2.svg";
import BluesskySvg from "@Assets/Blue Sky.svg";

// イメージ作成
const CatImage = new Ts.Image({ CatSvg });
const Cat2Image = new Ts.Image({ Cat2Svg });
const BlueskyImage = new Ts.Image({ BluesskySvg });

// スプライト作成
const cat = new Ts.Sprite("cat");
cat.Costume.add([CatImage, Cat2Image]); // イメージを２個追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add([BlueskyImage]); // 背景を１個追加

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // 回転を「自由に回転」にする
    this.Motion.rotation.style = Ts.Rotation.ALL_AROUND;
    // 角度を設定する
    this.Motion.direction.degree = 90;
    // 位置を中央にする
    this.Motion.position.xy = [0, 0];
};

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // ずっと 繰り返す
    for (;;) {
        // 進む
        this.Motion.move.steps(5);
        // マウスポインターに向ける
        this.Motion.point.toMouse();
        yield;
    }
};

// 旗を押したときのイベント定義
cat.Event.flagPresser().func = async function* (this: Sprite) {
    // ずっと 繰り返す
    for (;;) {
        // 次のコスチュームにする
        this.Looks.costume.next();
        // 少しだけ待つ。
        await this.Control.wait(0.2);
        yield;
    }
};
// 開始
Ts.engine.start();
