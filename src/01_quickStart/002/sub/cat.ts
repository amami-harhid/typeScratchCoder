import { Typescratcher as Ts } from "@tscratch3/typescratcher";
// イメージ作成
import { CatAImage } from './images';

// スプライト作成
export const cat = new Ts.Sprite( "cat" );
cat.Costume.add( [CatAImage] ); // イメージを追加