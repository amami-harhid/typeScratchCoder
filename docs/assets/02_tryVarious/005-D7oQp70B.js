import{t as e}from"../typescratcher-DjnLVHBO.js";import{t}from"../water-CEakD2Ci.js";import{t as n}from"../front_01-U3UKDq96.js";var r=`
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
`,i=`
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
`,a=()=>{e.VirtualPad.addVirtualPad(r,i),e.VirtualPad.setupTouchButton(`btnUp`,e.Keyboard.UP),e.VirtualPad.setupTouchButton(`btnDown`,e.Keyboard.DOWN),e.VirtualPad.setupTouchButton(`btnLeft`,e.Keyboard.LEFT),e.VirtualPad.setupTouchButton(`btnRight`,e.Keyboard.RIGHT),e.VirtualPad.setupTouchButton(`btnA`,`A`),e.VirtualPad.setupTouchButton(`btnB`,`B`)},o=new e.Image({dogPng:n}),s=new e.Image({WaterSvg:t});a();var c=new e.Sprite(`shark`);c.Costume.add(o),c.Looks.size.scale=[30,30],c.Motion.position.xy=[0,-130],new e.Stage().Backdrop.add(s);var l=e.Variable.string(``);e.Variable.monitoring({ジャンプ:l}),c.Event.flagPresser().func=async function*(){for(this.Motion.position.xy=[0,-130],this.Motion.rotation.style=e.Rotation.LEFT_RIGHT;;)this.Motion.move.steps(10),this.Motion.move.ifOnEdgeBounce(),yield},c.Event.keyPresser(`a`).func=async function*(){l.text=`等速`,l.show();for(let t of e.Loop.Iterator(10))this.Motion.position.y+=10,yield;for(let t of e.Loop.Iterator(10))this.Motion.position.y-=10,yield;l.hide(),l.text=``},c.Event.keyPresser(`b`).func=async function*(){l.text=`放物風`,l.show();let e=30;for(;;){if(this.Motion.position.y+=e,e-=4,this.Motion.position.y<-130){yield;break}yield}this.Motion.position.y=-130,l.hide(),l.text=``},e.engine.start();
//# sourceMappingURL=005-D7oQp70B.js.map