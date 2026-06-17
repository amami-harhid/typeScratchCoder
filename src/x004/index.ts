/**
 * サンプル 04
 * １秒ごとに「〇秒」とスピーチする。
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite, Stage } from '@tscratch3/typescratcher';

// 【Apple画像】
import AppleSvg from '@Assets/Apple.svg'; // OK：Vite流の書き方
import Bluesky from '@Assets/Blue Sky.svg';
import Basketball from '@Assets/Basketball 2.png';

/**
 * https://github.com/scratchfoundation/scratch-gui/blob/develop/src/lib/libraries/costumes.json
 * ここにある md5ext を使って、URLを組み立てる
 * https://cdn.assets.scratch.mit.edu/internalapi/asset/[md5ext]/get
 */
// 画像生成
const appleImage = new Ts.Image({AppleSvg});
const blueskyImage = new Ts.Image({Bluesky});
const basketballImage = new Ts.Image({Basketball});

// 【apple】スプライト作成
const apple = new Ts.Sprite('apple');
// 【apple】イメージ追加, サウンド追加、スケール設定
apple.Costume.add( [appleImage] );
apple.Looks.size.scale = [500, 500];

// 【stage】作成
const stage = new Ts.Stage();
stage.Backdrop.add([blueskyImage, basketballImage]);

// 【apple】旗押されたときのイベント定義
// 右回り回転
apple.Event.flagPresser().func = async function*(this: Sprite) {
    let counter = 0;
    // ずっと繰り返す
    for(;;) {
        const text = `${counter%5+1}秒`;
        this.Motion.direction.degree += 5;
        await this.Control.wait(1);
        this.Broadcast.send('TEXT', text);
        counter += 1;
        yield;
    }
}
apple.Broadcast.receiver('TEXT').func = async function*(this: Sprite, text:string ) {
    this.Looks.bubble.say(text);
    this.Speech.speech(text);
}

// 【stage】旗押されたときのイベント定義
// １秒間隔で背景を切り替える
stage.Event.flagPresser().func = async function*(this: Stage) {
    this.Backdrop.name = blueskyImage.name;
    for(;;) {
        await this.Control.wait(1);
        this.Backdrop.next();
        yield;
    }
}

// 開始
Ts.engine.start();