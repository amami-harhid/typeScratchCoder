import"../messagePost-BxuSvs_J.js";import{t as e}from"../typescratcher-CLsrfcmY.js";import{t}from"../cat-DnhSCkrq.js";import{t as n}from"../water-B6cNqaHD.js";var r=`
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
`,i=`
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
`,a=()=>{e.VirtualPad.addVirtualPad(r,i),e.VirtualPad.setupTouchButton(`btnUp`,e.Keyboard.UP),e.VirtualPad.setupTouchButton(`btnDown`,e.Keyboard.DOWN),e.VirtualPad.setupTouchButton(`btnLeft`,e.Keyboard.LEFT),e.VirtualPad.setupTouchButton(`btnRight`,e.Keyboard.RIGHT),e.VirtualPad.setupTouchButton(`btnA`,`A`),e.VirtualPad.setupTouchButton(`btnD`,`D`),e.VirtualPad.setupTouchButton(`btnW`,`W`),e.VirtualPad.setupTouchButton(`btnX`,`X`)},o=`/typeScratchCoder/assets/Chill-DqhXOM7X.wav`;a();var s=new e.Image({catSvg:t}),c=new e.Image({WaterSvg:n}),l=new e.Sound({ChillWav:o}),u=new e.Sprite(`cat`);u.Costume.add(s),u.Motion.position.xy=[0,0],u.Sound.add(l),new e.Stage().Backdrop.add(c);var d=e.Variable.number(100);e.Variable.monitoring({volume:d});var f=e.Variable.number(0);e.Variable.monitoring({pitch:f}),u.Event.flagPresser().func=async function*(){for(;;)await this.Sound.playUntilDone(l),yield},u.Event.keyPresser(`a`).func=async function*(){this.Sound.addVolume(l,5),d.value=this.Sound.getVolume(l)},u.Event.keyPresser(`d`).func=async function*(){this.Sound.addVolume(l,-5),d.value=this.Sound.getVolume(l)},u.Event.keyPresser(`w`).func=async function*(){this.Sound.addPitch(l,5),f.value=this.Sound.getPitch(l)},u.Event.keyPresser(`x`).func=async function*(){this.Sound.addPitch(l,-5),f.value=this.Sound.getPitch(l)},e.engine.start();