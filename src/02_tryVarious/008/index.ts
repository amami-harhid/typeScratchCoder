/**
 * いろいろ試そう-008
 * 
 * 音の効果を変えてみよう（音量・ピッチ）
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
import catSvg from '@Assets/cat.svg';
const CatImage = new Ts.Image( {catSvg} );
import WaterSvg from '@Assets/water.svg';
const WaterImage = new Ts.Image({WaterSvg});
// 【音読み込み】
import ChillWav from '@Assets/Chill.wav';
const ChillSound = new Ts.Sound({ChillWav});

// 【スプライト】(Spriteネコ)
const cat = new Ts.Sprite('cat');

// 画像をスプライトへ追加
cat.Costume.add( [CatImage] );
cat.Motion.position.xy = [ 0, 0 ];

// サウンドをスプライトへ追加
cat.Sound.add([ ChillSound ]);

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add( [WaterImage] );

// 変数
const volume = Ts.Variable.number( 100 ); 
Ts.Variable.monitoring( { volume } );
const pitch = Ts.Variable.number( 0 );
Ts.Variable.monitoring( { pitch } );

cat.Event.flagPresser().func = async function*(this:Sprite){
    // ずっと繰り返し音を鳴らす
    for(;;) {
        await this.Sound.playUntilDone(ChillSound);
        yield;
    }
};

cat.Event.keyPresser( 'a' ).func = async function*(this:Sprite) {
    // ボリュームを あげる
    this.Sound.addVolume(ChillSound, +5);
    volume.value = this.Sound.getVolume(ChillSound);
}
cat.Event.keyPresser( 'd' ).func = async function*(this:Sprite) {
    // ボリュームを さげる
    this.Sound.addVolume(ChillSound, -5);
    volume.value = this.Sound.getVolume(ChillSound);
}
cat.Event.keyPresser( 'w' ).func = async function*(this:Sprite) {
    // ピッチを あげる
    this.Sound.addPitch(ChillSound, +5);
    pitch.value = this.Sound.getPitch(ChillSound);
}
cat.Event.keyPresser( 'x' ).func = async function*(this:Sprite) {
    // ピッチを さげる
    this.Sound.addPitch(ChillSound, -5);
    pitch.value = this.Sound.getPitch(ChillSound);
}


// 開始
Ts.engine.start();
