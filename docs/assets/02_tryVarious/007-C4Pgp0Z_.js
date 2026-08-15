import"../modulepreload-polyfill-B5Qt9EMX.js";import{T as t}from"../typescratcher-B7Aehr00.js";import{c as r}from"../cat-Cvflsu-W.js";import{W as d}from"../water-qdWXHiyD.js";const u=`
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
    <div class="d-KEY">
        <button id="btnA">A</button>
    </div>
 </div>
`,c=`
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
`,l=()=>{t.VirtualPad.addVirtualPad(u,c),t.VirtualPad.setupTouchButton("btnUp",t.Keyboard.UP),t.VirtualPad.setupTouchButton("btnDown",t.Keyboard.DOWN),t.VirtualPad.setupTouchButton("btnLeft",t.Keyboard.LEFT),t.VirtualPad.setupTouchButton("btnRight",t.Keyboard.RIGHT),t.VirtualPad.setupTouchButton("btnSpace",t.Keyboard.SPACE),t.VirtualPad.setupTouchButton("btnA","A")};l();const b=new t.Image({catSvg:r}),p=new t.Image({WaterSvg:d}),a=new t.Sprite("cat");a.Costume.add(b);a.Motion.position.xy=[0,0];const s=new t.Stage;s.Backdrop.add(p);const e=t.Variable.string("");t.Variable.monitoring({答え:e});e.hide();let n=!1;a.Event.flagPresser().func=async function*(){e.hide(),n=!1,this.Motion.position.xy=[0,0]};const i="ASKING";a.Event.keyPresser(t.Keyboard.SPACE).func=async function*(){n!==!0&&this.Broadcast.send(i)};a.Broadcast.receiver(i).func=async function*(){n=!0,e.text=await this.Sensing.askAndWait("今日はご機嫌よろしいですか？"),e.show(),e.text=="はい"?this.Looks.bubble.say("YES"):e.text=="いいえ"?this.Looks.bubble.think("no...."):(this.Looks.bubble.say(""),n=!1,console.log("RE ASKING"),this.Broadcast.send(i))};const o="ASKING_STAGE";s.Event.keyPresser("A").func=async function*(){n===!1&&(n=!0,await this.Broadcast.sendAndWait(o),n=!1)};s.Broadcast.receiver(o).func=async function*(){e.hide(),e.text=await this.Sensing.askAndWait("ステージだよ。「はい」か「いいえ」で答えて"),e.show(),!(e.text=="はい"||e.text=="いいえ")&&this.Broadcast.send(o)};t.engine.start();
