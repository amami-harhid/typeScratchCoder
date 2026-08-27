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
        <button id="btnSpace">SPACE</button>
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
`,a=()=>{e.VirtualPad.addVirtualPad(r,i),e.VirtualPad.setupTouchButton(`btnUp`,e.Keyboard.UP),e.VirtualPad.setupTouchButton(`btnDown`,e.Keyboard.DOWN),e.VirtualPad.setupTouchButton(`btnLeft`,e.Keyboard.LEFT),e.VirtualPad.setupTouchButton(`btnRight`,e.Keyboard.RIGHT),e.VirtualPad.setupTouchButton(`btnSpace`,e.Keyboard.SPACE)},o=`data:image/svg+xml,%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='68.74655'%20height='29.64535'%20viewBox='0,0,68.74655,29.64535'%3e%3cg%20transform='translate(-202.55996,-167.04613)'%3e%3cg%20fill='%23468c8c'%20stroke='none'%20stroke-width='0'%20stroke-miterlimit='10'%3e%3cpath%20d='M202.55996,196.69149v-29.64535h68.74655v29.64535z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e%3c!--rotationCenter:37.44003610316196:12.953865761848164--%3e`;a();var s=new e.Image({dogPng:n}),c=new e.Image({blockSvg:o}),l=new e.Image({WaterSvg:t}),u=new e.Sprite(`shark`);u.Costume.add(s),u.Looks.size.scale=[20,20],u.Motion.position.xy=[0,200];var d=e.StageBounds.w,f=e.StageBounds.h,p=new e.Sprite(`block`);p.Costume.add(c),p.Looks.visible.hide(),p.Looks.effect.set(e.ImageEffective.GHOST,50),new e.Stage().Backdrop.add(l);var m=e.Variable.string(``);e.Variable.monitoring({ジャンプ:m}),m.hide(),u.Event.flagPresser().func=async function*(){this.Motion.position.xy=[0,250],this.Motion.rotation.style=e.Rotation.LEFT_RIGHT,_=0,v=!1},p.Event.flagPresser().func=async function*(){this.Motion.position.xy=[0,0];let e=p.Looks.size.drawingSize;this.Looks.size.drawingSize={w:d};let t=e.height/2-f/2;this.Motion.position.y=t,this.Looks.visible.show(),this.Broadcast.send(`START`,e)};var h=70,g=10,_=0,v=!1,y=function(e,t){let n=this.Looks.size.drawingSize.height,r=e.Looks.size.drawingSize.top;return!(this.Motion.position.y+t-n/2>r)},b=0;u.Broadcast.receiver(`START`).func=async function*(e){_=0,v=!1;let t=this.Looks.size.drawingSize.height,n=y.bind(this);for(this.Pen.penDown();;)n(p,_)&&(this.Motion.position.y=e.height-f/2+t/2,v=!0,_=0),v===!1&&(this.Motion.position.y+=_,this.Motion.move.steps(b),_-=g),yield},u.Broadcast.receiver(`START`).func=async function*(){for(this.Motion.rotation.style=e.Rotation.LEFT_RIGHT;;)v===!0&&(this.Sensing.keyboard.isDown(e.Keyboard.RIGHT)?(this.Motion.direction.degree=90,b=10,this.Motion.move.steps(b)):this.Sensing.keyboard.isDown(e.Keyboard.LEFT)?(this.Motion.direction.degree=-90,b=10,this.Motion.move.steps(b)):b=0,this.Motion.move.ifOnEdgeBounce()),yield},u.Broadcast.receiver(`START`).func=async function*(){for(m.text=`放物風`,m.show();;)v===!0&&this.Sensing.keyboard.isDown(e.Keyboard.SPACE)&&(_=h,v=!1,await this.Control.waitWhile(()=>this.Sensing.keyboard.isDown(e.Keyboard.SPACE))),yield},e.engine.start();
//# sourceMappingURL=006-v12LXwmv.js.map