/**
 * Cloud Assets Images
 * Load Scratch Foundation Images
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像読み込み】
const Ballerina_a =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/5197d3778baf55da6b81b3ada1e10021.svg/get";
const BallerinaAImage = new Ts.Image({ Ballerina_a });
const Ballerina_b =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/4ccb1752a43f48aafe490c9c08e58c27.svg/get";
const BallerinaBImage = new Ts.Image({ Ballerina_b });
const Ballerina_c =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/fc02bf591dd3d91eeeb50c7424d08274.svg/get";
const BallerinaCImage = new Ts.Image({ Ballerina_c });
const Ballerina_d =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/5aae21aee33c3f1ae943af5ea11254bf.svg/get";
const BallerinaDImage = new Ts.Image({ Ballerina_d });
const Party =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/108160d0e44d1c340182e31c9dc0758a.svg/get";
const PartyImage = new Ts.Image({ Party });

// 【音読み込み】
const AElecBass =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/5cb46ddd903fc2c9976ff881df9273c9.wav/get";
const AElecBassSound = new Ts.Sound({ AElecBass });
const ABass =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/c04ebf21e5e19342fa1535e4efcdb43b.wav/get";
const ABassSound = new Ts.Sound({ ABass });
const AElecGuitar =
    "https://cdn.assets.scratch.mit.edu/internalapi/asset/fa5f7fea601e9368dd68449d9a54c995.wav/get";
const AElecGuitarSound = new Ts.Sound({ AElecGuitar });

// 【スプライト】(バレリーナ)
const ballerina = new Ts.Sprite("Ballerina");
// 画像をスプライトへ追加
ballerina.Costume.add([
    BallerinaAImage,
    BallerinaBImage,
    BallerinaCImage,
    BallerinaDImage,
]);
// サウンドをスプライトへ追加
const Sounds = [AElecBassSound, ABassSound, AElecGuitarSound];
ballerina.Sound.add(Sounds);

// 【ステージ】(BlueSky)
const stage = new Ts.Stage();
stage.Backdrop.add([PartyImage]);

ballerina.Event.flagPresser().func = async function* (this: Sprite) {
    // 初期位置 ( 中央 )
    this.Motion.position.xy = [0, 0];
    // 初期の大きさ ( 100% )
    this.Looks.size.scale = [150, 150];

    // ずっと繰り返す
    for (;;) {
        this.Looks.costume.next();
        this.Sound.play(
            Sounds[Ts.Operations.randomValue(0, Sounds.length - 1)],
        );
        await this.Control.wait(0.2);
        yield;
    }
};
// 開始
Ts.engine.start();
