import"../messagePost-B_eHEiQu.js";import{T as t}from"../typescratcher-BhquJNNe.js";import{c as i}from"../cat-Cvflsu-W.js";import{W as d}from"../water-qdWXHiyD.js";const u=`
<div id="virtualPad">
    <div class="d-KEY">
        <button id="btnA">A</button>
    </div>
    <div class="d-KEY">
        <button id="btnD">D</button>
    </div>
    <div class="d-KEY">
        <button id="btnW">W</button>
    </div>
    <div class="d-KEY">
        <button id="btnX">X</button>
    </div>
 </div>
`,s=`
    #virtualPad {
        display: none; /* デフォルト（PC）では非表示 */
    }
    #virtualPad {
        display: block;
        position: relative;
        top: 50px;
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
`,r=()=>{t.VirtualPad.addVirtualPad(u,s),t.VirtualPad.setupTouchButton("btnUp",t.Keyboard.UP),t.VirtualPad.setupTouchButton("btnDown",t.Keyboard.DOWN),t.VirtualPad.setupTouchButton("btnLeft",t.Keyboard.LEFT),t.VirtualPad.setupTouchButton("btnRight",t.Keyboard.RIGHT),t.VirtualPad.setupTouchButton("btnA","A"),t.VirtualPad.setupTouchButton("btnD","D"),t.VirtualPad.setupTouchButton("btnW","W"),t.VirtualPad.setupTouchButton("btnX","X")},c="/typeScratchCoder/assets/Chill-DqhXOM7X.wav";r();const l=new t.Image({catSvg:i}),p=new t.Image({WaterSvg:d}),n=new t.Sound({ChillWav:c}),e=new t.Sprite("cat");e.Costume.add(l);e.Motion.position.xy=[0,0];e.Sound.add(n);const b=new t.Stage;b.Backdrop.add(p);const o=t.Variable.number(100);t.Variable.monitoring({volume:o});const a=t.Variable.number(0);t.Variable.monitoring({pitch:a});e.Event.flagPresser().func=async function*(){for(;;)await this.Sound.playUntilDone(n),yield};e.Event.keyPresser("a").func=async function*(){this.Sound.addVolume(n,5),o.value=this.Sound.getVolume(n)};e.Event.keyPresser("d").func=async function*(){this.Sound.addVolume(n,-5),o.value=this.Sound.getVolume(n)};e.Event.keyPresser("w").func=async function*(){this.Sound.addPitch(n,5),a.value=this.Sound.getPitch(n)};e.Event.keyPresser("x").func=async function*(){this.Sound.addPitch(n,-5),a.value=this.Sound.getPitch(n)};t.engine.start();
