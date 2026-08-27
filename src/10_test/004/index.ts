/**
 * コード変換-003
 */
import { Typescratcher as Ts, type SvgImageAttributes, type FontImageAttribute } from "@tscratch3/typescratcher";

const HarryPotter =
    "https://amami-harhid.github.io/tscratch3assets/assets/fonts/HarryPotter-ov4z.woff";
const HarryPotterFont = new Ts.Font( HarryPotter );

// 【文字スプライト】
const moji = new Ts.Sprite( "moji" );
const fontAttribute : SvgImageAttributes = {
    fill: "#f00000", // 文字色
    font_family: HarryPotterFont.name
};
const fotImageAttr : FontImageAttribute = {
    text: "Harry Potter Font",
    attributes: fontAttribute,
};
const mojiImage = new Ts.FontImage( fotImageAttr );
moji.Costume.add( mojiImage );

moji.Looks.size.scale = [ 50, 50 ];


// 開始
Ts.engine.start();