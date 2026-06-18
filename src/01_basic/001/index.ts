/**
 * 基本-001
 * スプライト、ステージを表示する
 * ・画像を読み込む
 * ・コスチューム、背景へ画像を設定する
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';

// 【画像 import 】
import AppleSvg from '@Assets/Apple.svg';
import BluesskySvg from '@Assets/Blue Sky.svg';

// イメージ作成
const AppleImage = new Ts.Image({AppleSvg});
const BlueskyImage = new Ts.Image({BluesskySvg});

// スプライト作成
const apple = new Ts.Sprite('apple');
apple.Costume.add( [AppleImage] ); // イメージを１個追加

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [BlueskyImage] ); // 背景を１個追加

// 開始
Ts.engine.start();