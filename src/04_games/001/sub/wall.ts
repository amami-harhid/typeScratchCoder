import { Typescratcher as Ts } from "@tscratch3/typescratcher";
import type { Sprite } from "@tscratch3/typescratcher";

// ステージ矩形サイズ
const stageBounds = Ts.StageBounds;
const stageWidth = stageBounds.w;
const stageHeight = stageBounds.h;

/**
 * タイルマップ
 * 1:  壁
 * 2:  ドア
 * 3:  ゲージ
 * 9:  スライムの初期位置
 * 横、縦とも、タイル数は奇数とすること
 */
export const Map01 : number[][] = [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1 ],
    [ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],

    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ],
    [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 2, 1, 0, 1 ],
    [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ],
    [ 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
    [ 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1 ],

    [ 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 0, 0, 1 ],
    [ 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1 ],

    [ 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1 ],
    [ 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 0, 0, 0, 1 ],

    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
];
const cagePositionArr : {x : number, y : number}[] = [];

let y = Math.floor( -Map01[0].length / 2 );

// @ts-loop-yield-skip
for( const row of Map01 ) {
    let x = -Math.floor( -row.length/2 );
    // @ts-loop-yield-skip
    for( const elem of row ) {
        if( elem == 2 ){
            cagePositionArr.push( {
                x: x,
                y: y 
            } );
        }
        x+=1;
    }
    y+=1;
}

export const CagePositionArr = cagePositionArr;

export const WallWidth = stageWidth/Map01[0].length;
export const WallHeight = stageHeight/Map01.length;

export interface IWall extends Sprite {

    type : number;

}

/**
 *  Ts.Spriteを継承する Wallクラス
 */
export class Wall extends Ts.Sprite implements IWall{

    public type : number = -1; // 初期値は -1

    protected makeClone( name : string ) : Sprite {
        const clone = new Wall( name );
        clone.type = this.type;
        return clone;
    }
}