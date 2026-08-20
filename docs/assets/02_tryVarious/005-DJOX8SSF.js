import{t as e}from"../typescratcher-BY3X97ya.js";import{t}from"../water-CEakD2Ci.js";import{t as n}from"../front_01-U3UKDq96.js";var r=`
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
`,a=()=>{e.VirtualPad.addVirtualPad(r,i),e.VirtualPad.setupTouchButton(`btnUp`,e.Keyboard.UP),e.VirtualPad.setupTouchButton(`btnDown`,e.Keyboard.DOWN),e.VirtualPad.setupTouchButton(`btnLeft`,e.Keyboard.LEFT),e.VirtualPad.setupTouchButton(`btnRight`,e.Keyboard.RIGHT),e.VirtualPad.setupTouchButton(`btnA`,`A`),e.VirtualPad.setupTouchButton(`btnB`,`B`)},o=new e.Image({dogPng:n}),s=new e.Image({WaterSvg:t});a();var c=new e.Sprite(`shark`);c.Costume.add(o),c.Looks.size.scale=[30,30],c.Motion.position.xy=[0,-130],new e.Stage().Backdrop.add(s);var l=e.Variable.string(``);e.Variable.monitoring({ジャンプ:l}),l.hide(),c.Event.flagPresser().func=async function*(){for(this.Motion.position.xy=[0,-130],this.Motion.rotation.style=e.Rotation.LEFT_RIGHT;;)this.Motion.move.steps(10),this.Motion.move.ifOnEdgeBounce(),yield},c.Event.keyPresser(`a`).func=async function*(){l.text=`等速`,l.show();for(let t of e.Loop.Iterator(10))this.Motion.position.y+=10,yield;for(let t of e.Loop.Iterator(10))this.Motion.position.y-=10,yield;l.hide(),l.text=``},c.Event.keyPresser(`b`).func=async function*(){l.text=`放物風`,l.show();let e=30;for(;;){if(this.Motion.position.y+=e,e-=4,this.Motion.position.y<-130){yield;break}yield}this.Motion.position.y=-130,l.hide(),l.text=``},e.engine.start();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMDA1LURKT1g4U1NGLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wMl90cnlWYXJpb3VzLzAwNS9zdWIvdmlydHVhbFBhZC50cyIsIi4uLy4uLy4uL3NyYy8wMl90cnlWYXJpb3VzLzAwNS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlc2NyYXRjaGVyIGFzIFRzIH0gZnJvbSBcIkB0c2NyYXRjaDMvdHlwZXNjcmF0Y2hlclwiO1xuXG5jb25zdCBodG1sU3RyaW5nVmlydHVhbFBhZCA9XG5gXG48ZGl2IGlkPVwidmlydHVhbFBhZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJkLXBhZFwiPlxuICAgICAgICA8YnV0dG9uIGlkPVwiYnRuVXBcIj7ilrI8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhvcml6b250YWwtYnRuc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImJ0bkxlZnRcIj7il4A8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJidG5SaWdodFwiPuKWtjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ0bkRvd25cIj7ilrw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZC1LRVlcIj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ0bkFcIj5BPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImQtS0VZXCI+XG4gICAgICAgIDxidXR0b24gaWQ9XCJidG5CXCI+QjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuIDwvZGl2PlxuYDtcbmNvbnN0IGNzc1N0cmluZ1ZpcnR1YWxQYWQgPSBcbmBcbiAgICAjdmlydHVhbFBhZCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7IC8qIOODh+ODleOCqeODq+ODiO+8iFBD77yJ44Gn44Gv6Z2e6KGo56S6ICovXG4gICAgfVxuICAgICN2aXJ0dWFsUGFkIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAxMHB4O1xuICAgICAgICBib3R0b206IDBweDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgLyog5bem5Y+z44Gr5oyv44KK5YiG44GR44KLICovXG4gICAgICAgIHBhZGRpbmc6IDAgNDBweDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IC8qIOOCs+ODs+ODhuODiuiHquS9k+OBr+OCr+ODquODg+OCr+OCkuOBmeOCiuaKnOOBkeOCiyAqL1xuICAgIH1cbiAgICAuZC1wYWQgYnV0dG9uIHtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87IC8qIOODnOOCv+ODs+iHquS9k+OBr+OCv+ODg+ODgeOBq+WPjeW/nOOBmeOCiyAqL1xuICAgICAgICB3aWR0aDogNjBweDtcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTsgLyog5Y2K6YCP5piOICovXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMzM7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsgLyog5Li444GE44Oc44K/44OzICovXG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lOyAvKiDjg4bjgq3jgrnjg4jpgbjmip7jgpLpmLLjgZAgKi9cbiAgICB9XG5cbiAgICAvKiDljYHlrZfjgq3jg7zjga7phY3nva7oqr/mlbQgKi9cbiAgICAuZC1wYWQgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4gICAgLmhvcml6b250YWwtYnRucyB7IGRpc3BsYXk6IGZsZXg7IGdhcDogNDBweDsgfVxuICAgIFxuICAgIC5kLUtFWSB7XG4gICAgICAgIGdhcDo0MHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOyBcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGhlaWdodDogMTAwJTsgXG4gICAgfVxuXG4gICAgLyog44Oc44K/44Oz44KS5bCR44GX5aSn44GN44GP5oq844GX44KE44GZ44GPICovXG4gICAgLmQtS0VZIGJ1dHRvbiB7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvOyAvKiDjg5zjgr/jg7Poh6rkvZPjga/jgr/jg4Pjg4Hjgavlj43lv5zjgZnjgosgKi9cbiAgICAgICAgbWFyZ2luLWxlZnQ6IDJyZW07XG4gICAgICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMXJlbTtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwJTsgLyog6KeS44KS5Li444GP44GZ44KLICovXG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lOyAvKiDjg4bjgq3jgrnjg4jpgbjmip7jgpLpmLLjgZAgKi9cbiAgICB9XG5gO1xuZXhwb3J0IGNvbnN0IHZpcnR1YWxQYWQgPSAoKT0+e1xuXG4gICAgVHMuVmlydHVhbFBhZC5hZGRWaXJ0dWFsUGFkKCBodG1sU3RyaW5nVmlydHVhbFBhZCwgY3NzU3RyaW5nVmlydHVhbFBhZCApO1xuICAgIC8vIOWQhOODnOOCv+ODs+OCkuOCreODvOODnOODvOODieOBruOCreODvOOBqOe0kOS7mOOBkVxuICAgIFRzLlZpcnR1YWxQYWQuc2V0dXBUb3VjaEJ1dHRvbiggJ2J0blVwJywgVHMuS2V5Ym9hcmQuVVAgKTtcbiAgICBUcy5WaXJ0dWFsUGFkLnNldHVwVG91Y2hCdXR0b24oICdidG5Eb3duJywgVHMuS2V5Ym9hcmQuRE9XTiApO1xuICAgIFRzLlZpcnR1YWxQYWQuc2V0dXBUb3VjaEJ1dHRvbiggJ2J0bkxlZnQnLCBUcy5LZXlib2FyZC5MRUZUICk7XG4gICAgVHMuVmlydHVhbFBhZC5zZXR1cFRvdWNoQnV0dG9uKCAnYnRuUmlnaHQnLCBUcy5LZXlib2FyZC5SSUdIVCApO1xuICAgIFRzLlZpcnR1YWxQYWQuc2V0dXBUb3VjaEJ1dHRvbiggJ2J0bkEnLCAnQScgKTtcbiAgICBUcy5WaXJ0dWFsUGFkLnNldHVwVG91Y2hCdXR0b24oICdidG5CJywgJ0InICk7XG4gICAgXG59OyIsIi8qKlxuICog44GE44KN44GE44KN6Kmm44Gd44GGLTAwNVxuICog44GE44KN44GE44KN44Gq44K444Oj44Oz44OX44KS6Kmm44Gd44GGXG4gKi9cbmltcG9ydCB7IFR5cGVzY3JhdGNoZXIgYXMgVHMgfSBmcm9tIFwiQHRzY3JhdGNoMy90eXBlc2NyYXRjaGVyXCI7XG5pbXBvcnQgdHlwZSB7IFNwcml0ZSB9IGZyb20gXCJAdHNjcmF0Y2gzL3R5cGVzY3JhdGNoZXJcIjtcblxuLy8g44CQ55S75YOP6Kqt44G/6L6844G/44CRXG5pbXBvcnQgZG9nUG5nIGZyb20gJ0BBc3NldHMvZnJvbnRfMDEuc3ZnJztcbmNvbnN0IERvZ0ltYWdlID0gbmV3IFRzLkltYWdlKCB7IGRvZ1BuZyB9ICk7XG5pbXBvcnQgV2F0ZXJTdmcgZnJvbSAnQEFzc2V0cy93YXRlci5zdmcnO1xuY29uc3QgV2F0ZXJJbWFnZSA9IG5ldyBUcy5JbWFnZSggeyBXYXRlclN2ZyB9ICk7XG5cbi8vIOOAkOODkOODvOODgeODo+ODq+ODkeODg+ODieOAkVxuaW1wb3J0IHsgdmlydHVhbFBhZCB9IGZyb20gXCIuL3N1Yi92aXJ0dWFsUGFkXCI7XG52aXJ0dWFsUGFkKCk7XG5cbi8vIOOAkOOCueODl+ODqeOCpOODiOOAkSjniqwpXG5jb25zdCBkb2cgPSBuZXcgVHMuU3ByaXRlKCAnc2hhcmsnICk7XG4vLyDnlLvlg4/jgpLjgrnjg5fjg6njgqTjg4jjgbjov73liqBcbmRvZy5Db3N0dW1lLmFkZCggRG9nSW1hZ2UgKTtcbmRvZy5Mb29rcy5zaXplLnNjYWxlID0gWyAzMCwgMzAgXTtcbmRvZy5Nb3Rpb24ucG9zaXRpb24ueHkgPSBbIDAsIC0xMzAgXTtcblxuLy8g44CQ44K544OG44O844K444CRKHdhdGVyKVxuY29uc3Qgc3RhZ2UgPSBuZXcgVHMuU3RhZ2UoKTtcbnN0YWdlLkJhY2tkcm9wLmFkZCggV2F0ZXJJbWFnZSApO1xuXG4vLyDlpInmlbBcbmNvbnN0IG1ldGhvZCA9IFRzLlZhcmlhYmxlLnN0cmluZyggJycgKTsgXG5Ucy5WYXJpYWJsZS5tb25pdG9yaW5nKCB7ICfjgrjjg6Pjg7Pjg5cnOiBtZXRob2QgfSApO1xubWV0aG9kLmhpZGUoKTsgLy8g6Zqg44GZXG5cbi8vIOaXl+OBjOaKvOOBleOCjOOBn+OBqOOBjVxuZG9nLkV2ZW50LmZsYWdQcmVzc2VyKCkuZnVuYyA9IGZ1bmN0aW9uKCB0aGlzIDogU3ByaXRlICkge1xuXG4gICAgdGhpcy5Nb3Rpb24ucG9zaXRpb24ueHkgPSBbIDAsIC0xMzAgXTtcbiAgICB0aGlzLk1vdGlvbi5yb3RhdGlvbi5zdHlsZSA9IFRzLlJvdGF0aW9uLkxFRlRfUklHSFQ7IC8vIOW3puWPs+OBruOBv+WPjei7olxuXG4gICAgLy8g44Ga44Gj44Go57mw44KK6L+U44GZXG4gICAgZm9yKCA7OyApeyAgICAgICAgXG4gICAgICAgIC8vIOmAsuOCgeOCi1xuICAgICAgICB0aGlzLk1vdGlvbi5tb3ZlLnN0ZXBzKCAxMCApO1xuICAgICAgICAvLyDnq6/jgavjgaTjgYTjgZ/jgonot7Pjga3ov5TjgotcbiAgICAgICAgdGhpcy5Nb3Rpb24ubW92ZS5pZk9uRWRnZUJvdW5jZSgpO1xuICAgIH1cbn07XG4vLyBBIOOCreODvOOBjOaKvOOBleOCjOOBn+OBqOOBjSjnrYnpgJ/jgrjjg6Pjg7Pjg5cpXG5kb2cuRXZlbnQua2V5UHJlc3NlciggJ2EnICkuZnVuYyA9IGZ1bmN0aW9uKCB0aGlzIDogU3ByaXRlICkge1xuICAgIG1ldGhvZC50ZXh0ID0gJ+etiemAnyc7XG4gICAgbWV0aG9kLnNob3coKTtcbiAgICBjb25zdCBKVU1QID0gMTA7XG4gICAgZm9yKCBjb25zdCBfIG9mIFRzLkxvb3AuSXRlcmF0b3IoIDEwICkgKSB7XG4gICAgICAgIHRoaXMuTW90aW9uLnBvc2l0aW9uLnkgKz0gSlVNUDtcbiAgICB9XG4gICAgZm9yKCBjb25zdCBfIG9mIFRzLkxvb3AuSXRlcmF0b3IoIDEwICkgKSB7XG4gICAgICAgIHRoaXMuTW90aW9uLnBvc2l0aW9uLnkgLT0gSlVNUDtcbiAgICB9XG4gICAgbWV0aG9kLmhpZGUoKTtcbiAgICBtZXRob2QudGV4dCA9ICcnO1xufTtcbi8vIEIg44Kt44O844GM5oq844GV44KM44Gf44Go44GNKOaUvueJqemiqOOCuOODo+ODs+ODlylcbmRvZy5FdmVudC5rZXlQcmVzc2VyKCAnYicgKS5mdW5jID0gZnVuY3Rpb24oIHRoaXMgOiBTcHJpdGUgKSB7XG4gICAgbWV0aG9kLnRleHQgPSAn5pS+54mp6aKoJztcbiAgICBtZXRob2Quc2hvdygpO1xuICAgIGNvbnN0IElOSVRfSlVNUCA9IDMwO1xuICAgIGNvbnN0IEdSQVZJVFkgPSA0O1xuICAgIGxldCBzcGVlZCA9IElOSVRfSlVNUDtcblxuICAgIGZvciggOzsgKSB7XG4gICAgICAgIHRoaXMuTW90aW9uLnBvc2l0aW9uLnkgKz0gc3BlZWQ7XG4gICAgICAgIHNwZWVkIC09IEdSQVZJVFk7XG4gICAgICAgIGlmKCB0aGlzLk1vdGlvbi5wb3NpdGlvbi55IDwgLTEzMCApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuTW90aW9uLnBvc2l0aW9uLnkgPSAtMTMwO1xuICAgIG1ldGhvZC5oaWRlKCk7XG4gICAgbWV0aG9kLnRleHQgPSAnJztcblxufTtcblxuLy8g6ZaL5aeLXG5U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