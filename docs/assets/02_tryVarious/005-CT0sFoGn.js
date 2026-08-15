import"../modulepreload-polyfill-B5Qt9EMX.js";import{T as t}from"../typescratcher-B7Aehr00.js";import{d as a}from"../front_01-Bo-sfdKs.js";import{W as d}from"../water-qdWXHiyD.js";const r=`
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
        <button id="btnA">A</button>
    </div>
    <div class="d-KEY">
        <button id="btnB">B</button>
    </div>
 </div>
`,u=`
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
`,p=()=>{t.VirtualPad.addVirtualPad(r,u),t.VirtualPad.setupTouchButton("btnUp",t.Keyboard.UP),t.VirtualPad.setupTouchButton("btnDown",t.Keyboard.DOWN),t.VirtualPad.setupTouchButton("btnLeft",t.Keyboard.LEFT),t.VirtualPad.setupTouchButton("btnRight",t.Keyboard.RIGHT),t.VirtualPad.setupTouchButton("btnA","A"),t.VirtualPad.setupTouchButton("btnB","B")},l=new t.Image({dogPng:a}),c=new t.Image({WaterSvg:d});p();const n=new t.Sprite("shark");n.Costume.add(l);n.Looks.size.scale=[30,30];n.Motion.position.xy=[0,-130];const b=new t.Stage;b.Backdrop.add(c);const o=t.Variable.string("");t.Variable.monitoring({ジャンプ:o});o.hide();n.Event.flagPresser().func=async function*(){for(this.Motion.position.xy=[0,-130],this.Motion.rotation.style=t.Rotation.LEFT_RIGHT;;)this.Motion.move.steps(10),this.Motion.move.ifOnEdgeBounce(),yield};n.Event.keyPresser("a").func=async function*(){o.text="等速",o.show();const i=10;for(const e of t.Loop.Iterator(10))this.Motion.position.y+=i,yield;for(const e of t.Loop.Iterator(10))this.Motion.position.y-=i,yield;o.hide(),o.text=""};n.Event.keyPresser("b").func=async function*(){o.text="放物風",o.show();const i=30,e=4;let s=i;for(;this.Motion.position.y+=s,s-=e,!(this.Motion.position.y<-130);)yield;this.Motion.position.y=-130,o.hide(),o.text=""};t.engine.start();
