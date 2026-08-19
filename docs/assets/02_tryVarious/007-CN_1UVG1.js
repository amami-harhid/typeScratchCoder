import"../messagePost-BxuSvs_J.js";import{t as e}from"../typescratcher-CLsrfcmY.js";import{t}from"../cat-DnhSCkrq.js";import{t as n}from"../water-B6cNqaHD.js";e.VirtualPad.addVirtualPad(`
<div id="virtualPad">
    <div class="d-KEY">
        <button id="btnSpace">SPACE</button>
    </div>
    <div class="d-KEY">
        <button id="btnA">A</button>
    </div>
 </div>
`,`
    #virtualPad {
        display: none; /* デフォルト（PC）では非表示 */
    }
    #virtualPad {
        display: block;
        position: relative;
        top: 20px;
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
`),e.VirtualPad.setupTouchButton(`btnUp`,e.Keyboard.UP),e.VirtualPad.setupTouchButton(`btnDown`,e.Keyboard.DOWN),e.VirtualPad.setupTouchButton(`btnLeft`,e.Keyboard.LEFT),e.VirtualPad.setupTouchButton(`btnRight`,e.Keyboard.RIGHT),e.VirtualPad.setupTouchButton(`btnSpace`,e.Keyboard.SPACE),e.VirtualPad.setupTouchButton(`btnA`,`A`);var r=new e.Image({catSvg:t}),i=new e.Image({WaterSvg:n}),a=new e.Sprite(`cat`);a.Costume.add(r),a.Motion.position.xy=[0,0];var o=new e.Stage;o.Backdrop.add(i);var s=e.Variable.string(``);e.Variable.monitoring({答え:s}),s.hide();var c=!1;a.Event.flagPresser().func=async function*(){s.hide(),c=!1,this.Motion.position.xy=[0,0]};var l=`ASKING`;a.Event.keyPresser(e.Keyboard.SPACE).func=async function*(){c!==!0&&this.Broadcast.send(l)},a.Broadcast.receiver(l).func=async function*(){c=!0,await this.Sensing.askAndWait(`今日はご機嫌よろしいですか？`),s.text=this.Sensing.answer,s.show(),s.text==`はい`?this.Looks.bubble.say(`YES`):s.text==`いいえ`?this.Looks.bubble.think(`no....`):(this.Looks.bubble.say(``),c=!1,console.log(`RE ASKING`),this.Broadcast.send(l))};var u=`ASKING_STAGE`;o.Event.keyPresser(`A`).func=async function*(){c===!1&&(c=!0,await this.Broadcast.sendAndWait(u),c=!1)},o.Broadcast.receiver(u).func=async function*(){s.hide(),await this.Sensing.askAndWait(`ステージだよ。「はい」か「いいえ」で答えて`),s.text=this.Sensing.answer,s.show(),s.text!=`はい`&&s.text!=`いいえ`&&this.Broadcast.send(u)},e.engine.start();