/**
 * 特殊-001
 * Scratch-Foundationが公開しているクラウドから画像データを取り出す
 * 
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite, Stage } from '@tscratch3/typescratcher';
import * as Costumes from './scratchFoundation/costumes';
import * as Backdrops from './scratchFoundation/backdrops';
import * as Sounds from './scratchFoundation/sound';
import * as GetPath from './scratchFoundation';


// クラウドよりコスチュームデータを取り出し、イメージを作成する
const Abbya = GetPath.getCostumePath(Costumes.CostumeBank.Abbya);
const Abbyb = GetPath.getCostumePath(Costumes.CostumeBank.Abbyb);
const Abbyc = GetPath.getCostumePath(Costumes.CostumeBank.Abbyc);
const Abbyd = GetPath.getCostumePath(Costumes.CostumeBank.Abbyd);
const AbbyaImage = new Ts.Image({Abbya});
const AbbybImage = new Ts.Image({Abbyb});
const AbbycImage = new Ts.Image({Abbyc});
const AbbydImage = new Ts.Image({Abbyd});

// クラウドよりサウンドデータを取り出す
const Bubbles = GetPath.getSoundPath(Sounds.SoundBank.Bubbles);
const Ya = GetPath.getSoundPath(Sounds.SoundBank.Ya);
const BubblesSound = new Ts.Sound({Bubbles});
const YaSound = new Ts.Sound({Ya});

// クラウドより背景データを取り出し、イメージを作成する
const Bedroom1 = GetPath.getBackdropPath(Backdrops.BackdropBank.Bedroom_1);
const BenchiWithView = GetPath.getBackdropPath(Backdrops.BackdropBank.Bench_With_View);
const Bedroom1Image = new Ts.Image({Bedroom1});
const BenchWithViewImage = new Ts.Image({BenchiWithView});

// スプライト作成
const sprite = new Ts.Sprite('ABBY');
sprite.Costume.add([AbbyaImage, AbbybImage, AbbycImage, AbbydImage]);
sprite.Looks.size.scale = [150,150];
sprite.Sound.add([BubblesSound, YaSound]);

// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add([Bedroom1Image, BenchWithViewImage]);

sprite.Event.flagPresser().func = async function*(this:Sprite) {
    for(;;) {
        this.Looks.costume.next();
        await this.Control.wait(0.15);
        this.Sound.play(YaSound);
        this.Sound.play(BubblesSound);
        yield;
    }
}
stage.Event.flagPresser().func = async function*(this:Stage) {
    for(;;) {
        this.Looks.backdrop.next();
        await this.Control.wait(0.15);
        this.Sound.play(YaSound);
        this.Sound.play(BubblesSound);
        yield;
    }
}
Ts.engine.start();
