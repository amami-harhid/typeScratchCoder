/**
 * サンプル-005
 * コスチュームと背景を切り替えよう
 */
import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import { Sprite } from "@tscratch3/typescratcher";

// 【画像 URL 】
// ここではScratch財団が公開してる画像URLを使います
// URLを探すビューアー :  https://amami-harhid.github.io/typescratcherAssets/web/
const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const CatBSvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/0fb9be3e8397c983338cb71dc84d0b25.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';
const CanyonPng = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/c7c0b27b959193a0b570a9639cfe8158.png/get';

// イメージ作成
const CatAImage = new Ts.Image({ CatASvg });
const CatBImage = new Ts.Image({ CatBSvg });
const BlueskyImage = new Ts.Image({ BlueskySvg });
const CanyonImage = new Ts.Image({CanyonPng});

// 【音の URL 】
const Boing = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/53a3c2e27d1fb5fdb14aaf0cb41e7889.wav/get'; 
const AElecGuitar = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/fa5f7fea601e9368dd68449d9a54c995.wav/get';
// サウンド作成
const BoingSound = new Ts.Sound({ Boing })
const AElecGuitarSound = new Ts.Sound({ AElecGuitar });


// スプライト作成
const cat = new Ts.Sprite( "cat" );
cat.Costume.add( [ CatAImage, CatBImage ] ); // イメージを追加
// --- 音を追加 ---
cat.Sound.add( [ AElecGuitarSound, BoingSound ] );


// ステージ作成
const stage = new Ts.Stage();
stage.Backdrop.add( [ BlueskyImage, CanyonImage ] ); // 背景を追加

// 【旗クリックされたとき】
cat.Event.flagPresser().func = async function*(this: Sprite) {
    // Looks: 「見た目」系
    // costume.next: 「次のコスチュームにする」
    // backdrop.next: 「次の背景にする」
    
    // Control: 「制御」
    // wait : 指定した秒数だけ待つ。 awaitをつけること！
    
    for(;;) {
        this.Motion.move.steps(10);
        this.Motion.move.ifOnEdgeBounce();
        this.Looks.costume.next(); // 次のコスチュームにする
        this.Looks.backdrop.next(); // 次の背景にする
        await this.Control.wait(0.1); // 0.1秒だけ待つ
        yield;
    }
}
// 【旗クリックされたとき】( 別スレッドにしてみる )
cat.Event.flagPresser().func = async function*(this: Sprite) {
    
    // Sensing: 「調べる」系
    // edge: 「端」に関するもの
    // isTouching:  端にふれていたら true を返す
    
    // Sound: 「音」系
    // play :  指定したサウンドを鳴らす
    let boingSoundFlag = true;
    for(;;){
        if(this.Sensing.edge.isTouching === true) {
            if(boingSoundFlag === true){
                this.Sound.play(BoingSound);
            }else{
                this.Sound.play(AElecGuitarSound);
            }
            await this.Control.wait(0.1);
            boingSoundFlag = !boingSoundFlag;
        }
        yield;
    }
}

// 開始
Ts.engine.start();
