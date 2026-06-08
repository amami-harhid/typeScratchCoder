import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite, Stage } from '@tscratch3/typescratcher';

// 【Apple画像】
import AppleSvg from '@Assets/Apple.svg'; // OK：Vite流の書き方
//import AppleSvg2 from 'https://amami-harhid.github.io/tscratch3assets/assets/Apple.svg'; // この書き方はブラウザ制約により動作しない
const Ballerina_a = 'https://amami-harhid.github.io/tscratch3assets/assets/Ballerina-a.svg';
const Ballerina_b = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/4ccb1752a43f48aafe490c9c08e58c27.svg/get';
/**
 * https://github.com/scratchfoundation/scratch-gui/blob/develop/src/lib/libraries/costumes.json
 * ここにある md5ext を使って、URLを組み立てる
 * https://cdn.assets.scratch.mit.edu/internalapi/asset/[md5ext]/get
 */
// 画像定義
const appleImage = new Ts.Image({AppleSvg});
const ballerina_a = new Ts.Image({Ballerina_a});
const ballerina_b = new Ts.Image({Ballerina_b});
// 【apple】スプライト作成
const apple = new Ts.Sprite('apple');
// 【apple】イメージ追加
apple.Image.add( [appleImage, ballerina_a, ballerina_b] );
apple.Looks.Size.scale = [500, 500];

// 【stage】作成
const stage = new Ts.Stage();

// 【apple】旗押されたときのイベント定義
apple.Event.flagPresser().func = async function*(this: Sprite) {
    this.Motion.Direction.degree = 90;
    // ずっと繰り返す
    for(;;) {
        this.Motion.Direction.degree += 5;
        this.Costume.next();
        await Ts.Timer.wait(0.1);
        yield;
    }
}
// 【stage】キー(SPACE)押されたときのイベント定義
stage.Event.keyPresser(Ts.KEYBOARD_KEYS.SPACE).func = async function*(this: Stage) {
    this.Control.stopAll();
}

// 開始
Ts.playground.start();