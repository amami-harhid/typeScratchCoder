/**
 * サンプル-003
 * スプライトを移動させてみよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// スプライト作成
import { cat } from "./sub/cat";

// ステージ作成
import "./sub/stage";

// 【旗クリックされたとき】
cat.Event.flagPresser().func = async function*(this: Sprite) {
    // Motion: 「動き」系
    // move: 「動かす」系
    // steps: 指定した数だけ動かす
    this.Motion.move.steps(5);
}

// 開始
Ts.engine.start();
