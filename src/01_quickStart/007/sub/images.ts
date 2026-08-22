import { Typescratcher as Ts } from "@tscratch3/typescratcher";

// 【画像 URL 】
// ここではScratch財団が公開している画像URLを使います
// URLを探すビューアー :  https://amami-harhid.github.io/typescratcherAssets/web/
const CatASvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/bcf454acf82e4504149f7ffe07081dbc.svg/get';
const CatBSvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/0fb9be3e8397c983338cb71dc84d0b25.svg/get';
const BlueskySvg = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/e7c147730f19d284bcd7b3f00af19bb6.svg/get';

// イメージ作成
export const CatAImage = new Ts.Image( CatASvg );
export const CatBImage = new Ts.Image( CatBSvg );
export const BlueskyImage = new Ts.Image( BlueskySvg );
