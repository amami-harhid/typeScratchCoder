import"../messagePost-Cs4nc0I6.js";import{T as t}from"../typescratcher-BhquJNNe.js";import{d as h}from"../front_01-Bo-sfdKs.js";import{W as g}from"../water-qdWXHiyD.js";const p=`
<div id="virtualPad">
    <div class="d-pad">
        <button id="btnUp">▲</button>
        <div class="horizontal-btns">
            <button id="btnLeft">◀</button>
            <button id="btnRight">▶</button>
        </div>
        <button id="btnDown">▼</button>
    </div>
    <div class="d-KEY">
        <button id="btnSpace">SPACE</button>
    </div>
 </div>
`,b=`
    #virtualPad {
        display: none; /* デフォルト（PC）では非表示 */
    }
    #virtualPad {
        display: block;
        position: relative;
        top: 10px;
        bottom: 0px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between; /* 左右に振り分ける */
        padding: 0 40px;
        pointer-events: none; /* コンテナ自体はクリックをすり抜ける */
    }
    .d-pad button {
        pointer-events: auto; /* ボタン自体はタッチに反応する */
        width: 60px;
        height: 60px;
        font-size: 24px;
        background: rgba(255, 255, 255, 0.6); /* 半透明 */
        border: 2px solid #333;
        border-radius: 50%; /* 丸いボタン */
        user-select: none; /* テキスト選択を防ぐ */
    }

    /* 十字キーの配置調整 */
    .d-pad { display: flex; flex-direction: column; align-items: center; }
    .horizontal-btns { display: flex; gap: 40px; }
    
    .d-KEY {
        gap:40px;
        display: flex;
        align-items: center; 
        justify-content: center;
        height: 100%; 
    }

    /* ボタンを少し大きく押しやすく */
    .d-KEY button {
        pointer-events: auto; /* ボタン自体はタッチに反応する */
        margin-left: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;
        width: fit-content;
        height: 80px;
        font-weight: bold;
        font-size: 1.5rem;
        background-color: white;
        border-radius: 20%; /* 角を丸くする */
        user-select: none; /* テキスト選択を防ぐ */
    }
`,f=()=>{t.VirtualPad.addVirtualPad(p,b),t.VirtualPad.setupTouchButton("btnUp",t.Keyboard.UP),t.VirtualPad.setupTouchButton("btnDown",t.Keyboard.DOWN),t.VirtualPad.setupTouchButton("btnLeft",t.Keyboard.LEFT),t.VirtualPad.setupTouchButton("btnRight",t.Keyboard.RIGHT),t.VirtualPad.setupTouchButton("btnSpace",t.Keyboard.SPACE)},y="/typeScratchCoder/assets/block-O7V_rudJ.svg";f();const m=new t.Image({dogPng:h}),w=new t.Image({blockSvg:y}),S=new t.Image({WaterSvg:g}),n=new t.Sprite("shark");n.Costume.add(m);n.Looks.size.scale=[20,20];n.Motion.position.xy=[0,200];const v=t.StageBounds.w,u=t.StageBounds.h,i=new t.Sprite("block");i.Costume.add(w);console.log(i.Looks.visible);i.Looks.visible.hide();i.Looks.effect.set(t.ImageEffective.GHOST,50);const T=new t.Stage;T.Backdrop.add(S);const d=t.Variable.string("");t.Variable.monitoring({ジャンプ:d});d.hide();n.Event.flagPresser().func=async function*(){this.Motion.position.xy=[0,250],this.Motion.rotation.style=t.Rotation.LEFT_RIGHT,o=0,e=!1};i.Event.flagPresser().func=async function*(){this.Motion.position.xy=[0,0];const s=i.Looks.size.drawingSize;this.Looks.size.drawingSize={w:v};const r=s.height/2-u/2;this.Motion.position.y=r,this.Looks.visible.show(),this.Broadcast.send("START",s)};const k=70,P=10;let o=0,e=!1;const x=function(s,r){const c=this.Looks.size.drawingSize.height,l=s.Looks.size.drawingSize.top;return!(this.Motion.position.y+r-c/2>l)};let a=0;n.Broadcast.receiver("START").func=async function*(s){o=0,e=!1;const c=this.Looks.size.drawingSize.height,l=x.bind(this);for(this.Pen.penDown();;)l(i,o)&&(this.Motion.position.y=s.height-u/2+c/2,e=!0,o=0),e===!1&&(this.Motion.position.y+=o,this.Motion.move.steps(a),o-=P),yield};n.Broadcast.receiver("START").func=async function*(){for(this.Motion.rotation.style=t.Rotation.LEFT_RIGHT;;)e===!0&&(this.Sensing.keyboard.isDown(t.Keyboard.RIGHT)?(this.Motion.direction.degree=90,a=10,this.Motion.move.steps(a)):this.Sensing.keyboard.isDown(t.Keyboard.LEFT)?(this.Motion.direction.degree=-90,a=10,this.Motion.move.steps(a)):a=0,this.Motion.move.ifOnEdgeBounce()),yield};n.Broadcast.receiver("START").func=async function*(){for(d.text="放物風",d.show();;)e===!0&&this.Sensing.keyboard.isDown(t.Keyboard.SPACE)&&(o=k,e=!1,await this.Control.waitWhile(()=>this.Sensing.keyboard.isDown(t.Keyboard.SPACE))),yield};t.engine.start();
