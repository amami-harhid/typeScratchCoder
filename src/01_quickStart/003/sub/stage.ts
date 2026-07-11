import { Typescratcher as Ts } from "@tscratch3/typescratcher";
// イメージ作成
import { BlueskyImage} from './images';

// ステージ作成
export const stage = new Ts.Stage();
stage.Backdrop.add([BlueskyImage]); // 背景を追加
