/**
 * 特殊-001
 * Scratch-Foundationが公開しているクラウドから画像データを取り出す
 * 
 */
import { Typescratcher as Ts } from '@tscratch3/typescratcher';
import type { Sprite } from '@tscratch3/typescratcher';
import * as GEN from './scratchFoundation/gen';
import * as Costumes from './scratchFoundation/costumes';

console.log(GEN.genCostume());
console.log(GEN.genBackdrop());
console.log(GEN.genSound());

const Abbya = Costumes.getImagePath(Costumes.costumeNames.Abbya);
const Abbyb = Costumes.getImagePath(Costumes.costumeNames.Abbyb);
const Abbyc = Costumes.getImagePath(Costumes.costumeNames.Abbyc);
const Abbyd = Costumes.getImagePath(Costumes.costumeNames.Abbyd);
const AbbyaImage = new Ts.Image({Abbya});
const AbbybImage = new Ts.Image({Abbyb});
const AbbycImage = new Ts.Image({Abbyc});
const AbbydImage = new Ts.Image({Abbyd});

const sprite = new Ts.Sprite('ABBY');
sprite.Costume.add([AbbyaImage, AbbybImage, AbbycImage, AbbydImage]);
sprite.Looks.size.scale = [150,150];

sprite.Event.flagPresser().func = async function*(this:Sprite) {
    for(;;) {
        this.Looks.costume.next();
        await this.Control.wait(0.15);
        yield;
    }
}

Ts.engine.start();
