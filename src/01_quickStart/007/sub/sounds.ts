import { Typescratcher as Ts } from "@tscratch3/typescratcher";

// 【音の URL 】
const Boing = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/53a3c2e27d1fb5fdb14aaf0cb41e7889.wav/get'; 
const AElecGuitar = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/fa5f7fea601e9368dd68449d9a54c995.wav/get';
// サウンド作成
export const BoingSound = new Ts.Sound({ Boing })
export const AElecGuitarSound = new Ts.Sound({ AElecGuitar });