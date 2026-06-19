/**
 * 練習 03
 * 背景がBasketBallになったら、
 * メッセージを送信する
 * メッセージを受信したスプライトは、ニャーと鳴く
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite, Stage } from '@tscratch3/typescratcher';

// 【画像】
import AppleSvg from '@Assets/Apple.svg'; // OK：Vite流の書き方
import BasketBall2 from '@Assets/Basketball 2.png';
import Bluesky from '@Assets/Blue Sky.svg'
import CatWav from '@Assets/Cat.wav'; 

// 画像生成
const appleImage = new Ts.Image({AppleSvg});
const basketballImage = new Ts.Image( {BasketBall2} );
const blueskyImage = new Ts.Image({Bluesky});

// サウンド生成
const catSound = new Ts.Sound({CatWav});

// 【apple】スプライト作成
const apple = new Ts.Sprite('apple');
// 【apple】イメージ追加, サウンド追加、スケール設定
apple.Costume.add( [appleImage] );
apple.Sound.add( [catSound] );
apple.Looks.size.scale = [500, 500];

// 【stage】作成
const stage = new Ts.Stage();
stage.Backdrop.add([basketballImage,blueskyImage]);

// 【apple】旗押されたときのイベント定義
// 右回り回転
apple.Event.flagPresser().func = async function*(this: Sprite) {
    this.Motion.direction.degree = 90;
    // ずっと繰り返す
    for(;;) {
        this.Motion.direction.degree += 5;
        await this.Control.wait(0.01);
        yield;
    }
}
// 【apple】旗押されたときのイベント定義
// 0.5秒間隔で コスチュームを切り替える
apple.Event.flagPresser().func = async function*(this: Sprite) {
    // ずっと繰り返す
    for(;;) {
        this.Looks.costume.next();
        await this.Control.wait(0.5);
        yield;
    }
}

// 【stage】旗押されたときのイベント定義
// １秒間隔で背景を切り替える
stage.Event.flagPresser().func = async function*(this: Stage) {
    this.Looks.backdrop.name = blueskyImage.name;
    for(;;) {
        await this.Control.wait(1);
        this.Looks.backdrop.next();
        yield;
    }
}

// 背景がbasketballImageになったとき
// メッセージを送信
stage.Event.backdropSwitcher(basketballImage).func = async function*(this:Stage){
    this.Broadcast.send(basketballImage.name);
}

// 「背景がbasketballImageになったとき」のメッセージを受信
// ニャーと鳴く
apple.Broadcast.receiver(basketballImage.name).func = async function*(this:Sprite) {
    this.Sound.play(catSound);
}

// 開始
Ts.engine.start();