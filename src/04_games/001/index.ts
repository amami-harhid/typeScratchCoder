/**
 * ゲーム作り-001
 *
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite, Stage, SvgImageAttributes } from "@tscratch3/typescratcher";

// 【MAP読み込み】
import { Map01, WallWidth, WallHeight, Wall, type IWall } from "./sub/wall";

// 【画像読み込み】
import {
    WallImage,
    CageImage,
    DoorImage,
    SlimeImage,
    BackdropBlackImage,
    WaterImage,
} from "./sub/image";

// 【音を読み込む】
import { CollectSound, ChirpSound, CrashBeatboxSound } from "./sub/sound";

// 【スプライト】壁
const wall = new Wall("wall");
wall.Costume.add([WallImage]);
const w = WallWidth;
const h = WallHeight;
wall.Looks.size.drawingSize = { w: w, h: h };
wall.Looks.visible.hide();

// 【スプライト】Cage
const cage = new Wall("cage");
cage.Costume.add([DoorImage, CageImage]);
cage.Looks.size.drawingSize = { w: w, h: h };
cage.Looks.visible.hide();

const CageBank: { [key: string]: IWall } = {};

// 【スプライト】(Spriteスライム)
const slime = new Ts.Sprite("slime");
slime.Looks.visible.hide();

// 画像をスプライトへ追加
slime.Costume.add([SlimeImage]);
slime.Sound.add([ChirpSound, CollectSound, CrashBeatboxSound]);
slime.Motion.position.xy = [0, 0];
slime.Looks.size.drawingSize = { w: w * 0.8, h: h * 0.8 };

//【変数】
const Count = Ts.Variable.number(0);
Ts.Variable.monitoring({ Count });
Count.hide();

wall.Event.flagPresser().func = async function* (this: IWall) {
    this.Looks.size.drawingSize = { w: w, h: h };
};
cage.Event.flagPresser().func = async function* (this: IWall) {
    this.Looks.size.drawingSize = { w: w, h: h };
};

wall.Event.flagPresser().func = async function* (this: IWall) {
    let y = -Math.floor(Map01.length / 2);
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for (const _row of Map01) {
        let x = -Math.floor(_row.length / 2);
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for (const _elem of _row) {
            if (0 < _elem) {
                if (_elem == 9) {
                    slime.Motion.position.xy = [w * x, -h * y];
                } else {
                    if (_elem == 1) {
                        this.Motion.position.xy = [w * x, -h * y];
                        this.type = 1;
                        this.Control.clone();
                    }
                }
            }
            x += 1;
        }
        y += 1;
    }
    Count.show();
    slime.Control.clone();
};
cage.Event.flagPresser().func = async function* (this: IWall) {
    let y = -Math.floor(Map01.length / 2);
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for (const _row of Map01) {
        let x = -Math.floor(_row.length / 2);
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for (const _elem of _row) {
            if (_elem == 2) {
                cage.Motion.position.xy = [w * x, -h * y];
                cage.type = 2;
                cage.Control.clone();
            } else if (_elem == 3) {
                cage.Motion.position.xy = [w * x, -h * y];
                cage.type = 3;
                cage.Control.clone();
            }
            x += 1;
        }
        y += 1;
    }
};

wall.Event.cloned().func = async function* (this: IWall) {
    this.Looks.visible.show();
};
cage.Event.cloned().func = async function* (this: IWall) {
    const me = this;
    if (this.type == 2) {
        this.Looks.costume.name = DoorImage.name;
        this.Looks.visible.show();
    } else if (this.type == 3) {
        this.Looks.costume.name = CageImage.name;
        this.Looks.visible.show();
    }
    // ケージを保存
    CageBank[this.name] = me;

    for (;;) {
        if (!this.Sensing.sprite.isTouching([slime])) {
            this.Looks.visible.show();
            await this.Control.wait(Ts.Operations.randomValue(3.5, 5.5));
            if (this.type == 2) {
                this.Looks.costume.name = CageImage.name;
                this.type = 3;
            } else {
                this.Looks.costume.name = DoorImage.name;
                this.type = 2;
            }
        }

        yield;
    }
};

slime.Event.flagPresser().func = async function* (this: IWall) {
    // 大きさの設定
    Count.scale.w = 50;
    Count.scale.h = 50;
    Count.value = 0;
    Count.show();
};

slime.Broadcast.receiver("SLIME").func = async function* (this: Sprite) {
    this.Control.clone();
};

// 【ステージ】(water)
const stage = new Ts.Stage();
stage.Backdrop.add([WaterImage, BackdropBlackImage]);

// 文字列イメージ化
const HELLO = "Teleportation";
const attribute: SvgImageAttributes = {
    fill: "#f0f0f0", // 文字色
    font_family: Ts.ScratchFontFamily.Scratch,
};
const helloImage = new Ts.FontImage(attribute);
await helloImage.textToSvg(HELLO);

const moji = new Ts.Sprite("moji");
moji.Costume.add([helloImage]);
moji.Looks.layer.gotoBackLayer();

moji.Event.flagPresser().func = async function* (this: Sprite) {
    this.Looks.layer.gotoFrontLayer();
    for (;;) {
        this.Looks.visible.hide();
        await this.Control.wait(1);
        this.Looks.visible.show();
        await this.Control.wait(1);
        yield;
    }
};
slime.Event.flagPresser().func = async function* (this: Sprite) {
    slime.Looks.layer.gotoFrontLayer();
};
/**
 * 独自関数
 * ランダムなケージへ瞬間移動
 */
const teleportToRandomCage = async function (this: Sprite) {
    this.Sound.play(CrashBeatboxSound);
    const otherArr: IWall[] = [];
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for (const idx of Ts.Loop.Iterator(Object.keys(CageBank).length)) {
        const _name = Object.keys(CageBank)[idx];
        const _cage = CageBank[_name];
        if (_cage.Looks.costume.name == CageImage.name) {
            if (_cage.name != this.name) {
                otherArr.push(_cage);
            }
        }
    }
    // ランダムに選ぶ
    const _idx = Ts.Operations.randomValue(0, otherArr.length - 1);
    const _randomCage = otherArr[_idx];
    this.Motion.position.xy = [
        _randomCage.Motion.position.x,
        _randomCage.Motion.position.y,
    ];
    Count.value += 1;
    // ケージを非表示 ==> 離れたら表示される(Cageのclonedイベントの中で制御している)
    _randomCage.Looks.visible.hide();
};
slime.Event.cloned().func = async function* (this: Sprite) {
    // 大きさの設定
    this.Looks.size.drawingSize = { w: w * 0.7, h: h * 0.8 };
    this.Looks.visible.show();

    const _teleport = teleportToRandomCage.bind(this);
    for (;;) {
        if (this.Sensing.keyboard.isDown(Ts.Keyboard.UP)) {
            this.Motion.position.y += h;
            if (this.Sensing.sprite.isTouching([wall])) {
                this.Sound.play(CollectSound);
                this.Motion.position.y -= h;
            } else {
                const _cages = this.Sensing.sprite.getTouching([cage]);
                if (_cages.length > 0) {
                    const _cage = _cages[0] as IWall;
                    if (_cage.Looks.costume.name == DoorImage.name) {
                        _teleport();
                    } else {
                        this.Sound.play(CollectSound);
                        this.Motion.position.y -= h;
                    }
                } else {
                    this.Sound.play(ChirpSound);
                }
            }
        }
        if (this.Sensing.keyboard.isDown(Ts.Keyboard.DOWN)) {
            this.Motion.position.y -= h;
            if (this.Sensing.sprite.isTouching([wall])) {
                this.Sound.play(CollectSound);
                this.Motion.position.y += h;
            } else {
                const _cages = this.Sensing.sprite.getTouching([cage]);
                if (_cages.length > 0) {
                    const _cage = _cages[0] as IWall;
                    if (_cage.Looks.costume.name == DoorImage.name) {
                        //this.Motion.position.x += w;
                        _teleport();
                    } else {
                        this.Sound.play(CollectSound);
                        this.Motion.position.y += h;
                    }
                } else {
                    this.Sound.play(ChirpSound);
                }
            }
        }
        if (this.Sensing.keyboard.isDown(Ts.Keyboard.RIGHT)) {
            this.Motion.position.x += w;
            if (this.Sensing.sprite.isTouching([wall])) {
                this.Sound.play(CollectSound);
                this.Motion.position.x -= w;
            } else {
                const _cages = this.Sensing.sprite.getTouching([cage]);
                if (_cages.length > 0) {
                    const _cage = _cages[0] as IWall;
                    if (_cage.Looks.costume.name == DoorImage.name) {
                        //this.Motion.position.x += w;
                        _teleport();
                    } else {
                        this.Sound.play(CollectSound);
                        this.Motion.position.x -= w;
                    }
                } else {
                    this.Sound.play(ChirpSound);
                }
            }
        }
        if (this.Sensing.keyboard.isDown(Ts.Keyboard.LEFT)) {
            this.Motion.position.x -= w;
            if (this.Sensing.sprite.isTouching([wall])) {
                this.Sound.play(CollectSound);
                this.Motion.position.x += w;
            } else {
                const _cages = this.Sensing.sprite.getTouching([cage]);
                if (_cages.length > 0) {
                    const _cage = _cages[0] as IWall;
                    if (_cage.Looks.costume.name == DoorImage.name) {
                        //this.Motion.position.x += w;
                        _teleport();
                    } else {
                        this.Sound.play(CollectSound);
                        this.Motion.position.x += w;
                    }
                } else {
                    this.Sound.play(ChirpSound);
                }
            }
        }

        if (this.Sensing.keyboard.isDown(Ts.Keyboard.ANY)) {
            await this.Control.waitUntil(() =>
                this.Sensing.keyboard.isNotDown(Ts.Keyboard.ANY),
            );
        }
        yield;
    }
};
// 【スライムクローン】
slime.Event.cloned().func = async function* (this: Sprite) {
    /** 色の変化量 */
    const changeColor = 15;
    for (;;) {
        this.Looks.effect.change(Ts.ImageEffective.COLOR, changeColor); // 色の効果を変える
        await this.Control.wait(0.1);
        yield;
    }
};

stage.Event.flagPresser().func = async function* (this: Stage) {
    this.Looks.backdrop.name = BackdropBlackImage.name;
};

// 開始
Ts.engine.start();
