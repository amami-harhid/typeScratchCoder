import{t as e}from"../typescratcher-Cg7G9YWn.js";import{t}from"../cat-DnhSCkrq.js";import{t as n}from"../water-CEakD2Ci.js";var r=`
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMDA4LUNybE5vWVpJLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wMl90cnlWYXJpb3VzLzAwOC9zdWIvdmlydHVhbFBhZC50cyIsIi4uLy4uLy4uL2Fzc2V0cy9DaGlsbC53YXYiLCIuLi8uLi8uLi9zcmMvMDJfdHJ5VmFyaW91cy8wMDgvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZXNjcmF0Y2hlciBhcyBUcyB9IGZyb20gXCJAdHNjcmF0Y2gzL3R5cGVzY3JhdGNoZXJcIjtcblxuY29uc3QgaHRtbFN0cmluZ1ZpcnR1YWxQYWQgPVxuYFxuPGRpdiBpZD1cInZpcnR1YWxQYWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZC1LRVlcIj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ0bkFcIj5BPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImQtS0VZXCI+XG4gICAgICAgIDxidXR0b24gaWQ9XCJidG5EXCI+RDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkLUtFWVwiPlxuICAgICAgICA8YnV0dG9uIGlkPVwiYnRuV1wiPlc8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZC1LRVlcIj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImJ0blhcIj5YPC9idXR0b24+XG4gICAgPC9kaXY+XG4gPC9kaXY+XG5gO1xuY29uc3QgY3NzU3RyaW5nVmlydHVhbFBhZCA9IFxuYFxuICAgICN2aXJ0dWFsUGFkIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTsgLyog44OH44OV44Kp44Or44OI77yIUEPvvInjgafjga/pnZ7ooajnpLogKi9cbiAgICB9XG4gICAgI3ZpcnR1YWxQYWQge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDUwcHg7XG4gICAgICAgIGJvdHRvbTogMHB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyAvKiDlt6blj7PjgavmjK/jgorliIbjgZHjgosgKi9cbiAgICAgICAgcGFkZGluZzogMCA0MHB4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgLyog44Kz44Oz44OG44OK6Ieq5L2T44Gv44Kv44Oq44OD44Kv44KS44GZ44KK5oqc44GR44KLICovXG4gICAgfSAgICBcbiAgICAuZC1wYWQgYnV0dG9uIHtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87IC8qIOODnOOCv+ODs+iHquS9k+OBr+OCv+ODg+ODgeOBq+WPjeW/nOOBmeOCiyAqL1xuICAgICAgICB3aWR0aDogNjBweDtcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTsgLyog5Y2K6YCP5piOICovXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMzM7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsgLyog5Li444GE44Oc44K/44OzICovXG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lOyAvKiDjg4bjgq3jgrnjg4jpgbjmip7jgpLpmLLjgZAgKi9cbiAgICB9XG5cbiAgICAuZC1LRVkge1xuICAgICAgICBnYXA6NDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7IFxuICAgIH1cblxuICAgIC8qIOODnOOCv+ODs+OCkuWwkeOBl+Wkp+OBjeOBj+aKvOOBl+OChOOBmeOBjyAqL1xuICAgIC5kLUtFWSBidXR0b24ge1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bzsgLyog44Oc44K/44Oz6Ieq5L2T44Gv44K/44OD44OB44Gr5Y+N5b+c44GZ44KLICovXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAycmVtO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDFyZW07XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAyMCU7IC8qIOinkuOCkuS4uOOBj+OBmeOCiyAqL1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTsgLyog44OG44Kt44K544OI6YG45oqe44KS6Ziy44GQICovXG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCB2aXJ0dWFsUGFkID0gKCk9PntcblxuICAgIFRzLlZpcnR1YWxQYWQuYWRkVmlydHVhbFBhZCggaHRtbFN0cmluZ1ZpcnR1YWxQYWQsIGNzc1N0cmluZ1ZpcnR1YWxQYWQgKTtcbiAgICAvLyDlkITjg5zjgr/jg7PjgpLjgq3jg7zjg5zjg7zjg4njga7jgq3jg7zjgajntJDku5jjgZFcbiAgICBUcy5WaXJ0dWFsUGFkLnNldHVwVG91Y2hCdXR0b24oICdidG5VcCcsIFRzLktleWJvYXJkLlVQICk7XG4gICAgVHMuVmlydHVhbFBhZC5zZXR1cFRvdWNoQnV0dG9uKCAnYnRuRG93bicsIFRzLktleWJvYXJkLkRPV04gKTtcbiAgICBUcy5WaXJ0dWFsUGFkLnNldHVwVG91Y2hCdXR0b24oICdidG5MZWZ0JywgVHMuS2V5Ym9hcmQuTEVGVCApO1xuICAgIFRzLlZpcnR1YWxQYWQuc2V0dXBUb3VjaEJ1dHRvbiggJ2J0blJpZ2h0JywgVHMuS2V5Ym9hcmQuUklHSFQgKTtcbiAgICBUcy5WaXJ0dWFsUGFkLnNldHVwVG91Y2hCdXR0b24oICdidG5BJywgJ0EnICk7XG4gICAgVHMuVmlydHVhbFBhZC5zZXR1cFRvdWNoQnV0dG9uKCAnYnRuRCcsICdEJyApO1xuICAgIFRzLlZpcnR1YWxQYWQuc2V0dXBUb3VjaEJ1dHRvbiggJ2J0blcnLCAnVycgKTtcbiAgICBUcy5WaXJ0dWFsUGFkLnNldHVwVG91Y2hCdXR0b24oICdidG5YJywgJ1gnICk7XG5cbn07IiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzhIU1VmaDdjSkhORnhDa0luTnpOWHdfX1wiIiwiLyoqXG4gKiDjgYTjgo3jgYTjgo3oqabjgZ3jgYYtMDA4XG4gKlxuICog6Z+z44Gu5Yq55p6c44KS5aSJ44GI44Gm44G/44KI44GG77yI6Z+z6YeP44O744OU44OD44OB77yJXG4gKi9cbmltcG9ydCB7IFR5cGVzY3JhdGNoZXIgYXMgVHMgfSBmcm9tIFwiQHRzY3JhdGNoMy90eXBlc2NyYXRjaGVyXCI7XG5pbXBvcnQgdHlwZSB7IFNwcml0ZSB9IGZyb20gXCJAdHNjcmF0Y2gzL3R5cGVzY3JhdGNoZXJcIjtcblxuLy8g44CQ44OQ44O844OB44Oj44Or44OR44OD44OJ44CRXG5pbXBvcnQgeyB2aXJ0dWFsUGFkIH0gZnJvbSBcIi4vc3ViL3ZpcnR1YWxQYWRcIjtcbnZpcnR1YWxQYWQoKTtcblxuLy8g44CQ55S75YOP6Kqt44G/6L6844G/44CRXG5pbXBvcnQgY2F0U3ZnIGZyb20gXCJAQXNzZXRzL2NhdC5zdmdcIjtcbmNvbnN0IENhdEltYWdlID0gbmV3IFRzLkltYWdlKCB7IGNhdFN2ZyB9ICk7XG5pbXBvcnQgV2F0ZXJTdmcgZnJvbSBcIkBBc3NldHMvd2F0ZXIuc3ZnXCI7XG5jb25zdCBXYXRlckltYWdlID0gbmV3IFRzLkltYWdlKCB7IFdhdGVyU3ZnIH0gKTtcbi8vIOOAkOmfs+iqreOBv+i+vOOBv+OAkVxuaW1wb3J0IENoaWxsV2F2IGZyb20gXCJAQXNzZXRzL0NoaWxsLndhdlwiO1xuY29uc3QgQ2hpbGxTb3VuZCA9IG5ldyBUcy5Tb3VuZCggeyBDaGlsbFdhdiB9ICk7XG5cbi8vIOOAkOOCueODl+ODqeOCpOODiOOAkShTcHJpdGXjg43jgrMpXG5jb25zdCBjYXQgPSBuZXcgVHMuU3ByaXRlKCBcImNhdFwiICk7XG5cbi8vIOeUu+WDj+OCkuOCueODl+ODqeOCpOODiOOBuOi/veWKoFxuY2F0LkNvc3R1bWUuYWRkKCBDYXRJbWFnZSApO1xuY2F0Lk1vdGlvbi5wb3NpdGlvbi54eSA9IFsgMCwgMCBdO1xuXG4vLyDjgrXjgqbjg7Pjg4njgpLjgrnjg5fjg6njgqTjg4jjgbjov73liqBcbmNhdC5Tb3VuZC5hZGQoIENoaWxsU291bmQgKTtcblxuLy8g44CQ44K544OG44O844K444CRKHdhdGVyKVxuY29uc3Qgc3RhZ2UgPSBuZXcgVHMuU3RhZ2UoKTtcbnN0YWdlLkJhY2tkcm9wLmFkZCggV2F0ZXJJbWFnZSApO1xuXG4vLyDlpInmlbBcbmNvbnN0IHZvbHVtZSA9IFRzLlZhcmlhYmxlLm51bWJlciggMTAwICk7XG5Ucy5WYXJpYWJsZS5tb25pdG9yaW5nKCB7IHZvbHVtZSB9ICk7XG5jb25zdCBwaXRjaCA9IFRzLlZhcmlhYmxlLm51bWJlciggMCApO1xuVHMuVmFyaWFibGUubW9uaXRvcmluZyggeyBwaXRjaCB9ICk7XG5cbmNhdC5FdmVudC5mbGFnUHJlc3NlcigpLmZ1bmMgPSBmdW5jdGlvbiggdGhpcyA6IFNwcml0ZSApIHtcbiAgICAvLyDjgZrjgaPjgajnubDjgorov5TjgZfpn7PjgpLps7TjgonjgZlcbiAgICBmb3IgKCA7OyApIHtcbiAgICAgICAgdGhpcy5Tb3VuZC5wbGF5VW50aWxEb25lKCBDaGlsbFNvdW5kICk7XG4gICAgfVxufTtcblxuY2F0LkV2ZW50LmtleVByZXNzZXIoIFwiYVwiICkuZnVuYyA9IGZ1bmN0aW9uKCB0aGlzIDogU3ByaXRlICkge1xuICAgIC8vIOODnOODquODpeODvOODoOOCkiDjgYLjgZLjgotcbiAgICB0aGlzLlNvdW5kLmFkZFZvbHVtZSggQ2hpbGxTb3VuZCwgKzUgKTtcbiAgICB2b2x1bWUudmFsdWUgPSB0aGlzLlNvdW5kLmdldFZvbHVtZSggQ2hpbGxTb3VuZCApO1xufTtcbmNhdC5FdmVudC5rZXlQcmVzc2VyKCBcImRcIiApLmZ1bmMgPSBmdW5jdGlvbiggdGhpcyA6IFNwcml0ZSApIHtcbiAgICAvLyDjg5zjg6rjg6Xjg7zjg6DjgpIg44GV44GS44KLXG4gICAgdGhpcy5Tb3VuZC5hZGRWb2x1bWUoIENoaWxsU291bmQsIC01ICk7XG4gICAgdm9sdW1lLnZhbHVlID0gdGhpcy5Tb3VuZC5nZXRWb2x1bWUoIENoaWxsU291bmQgKTtcbn07XG5jYXQuRXZlbnQua2V5UHJlc3NlciggXCJ3XCIgKS5mdW5jID0gZnVuY3Rpb24oIHRoaXMgOiBTcHJpdGUgKSB7XG4gICAgLy8g44OU44OD44OB44KSIOOBguOBkuOCi1xuICAgIHRoaXMuU291bmQuYWRkUGl0Y2goIENoaWxsU291bmQsICs1ICk7XG4gICAgcGl0Y2gudmFsdWUgPSB0aGlzLlNvdW5kLmdldFBpdGNoKCBDaGlsbFNvdW5kICk7XG59O1xuY2F0LkV2ZW50LmtleVByZXNzZXIoIFwieFwiICkuZnVuYyA9IGZ1bmN0aW9uKCB0aGlzIDogU3ByaXRlICkge1xuICAgIC8vIOODlOODg+ODgeOCkiDjgZXjgZLjgotcbiAgICB0aGlzLlNvdW5kLmFkZFBpdGNoKCBDaGlsbFNvdW5kLCAtNSApO1xuICAgIHBpdGNoLnZhbHVlID0gdGhpcy5Tb3VuZC5nZXRQaXRjaCggQ2hpbGxTb3VuZCApO1xufTtcblxuLy8g6ZaL5aeLXG5Ucy5lbmdpbmUuc3RhcnQoKTtcbiJdLCJtYXBwaW5ncyI6IjRIQUVBLElBQU0sRUFDTjs7Ozs7Ozs7Ozs7Ozs7O0VBZ0JNLEVBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrRGEsTUFBaUIsQ0FFMUIsRUFBRyxXQUFXLGNBQWUsRUFBc0IsQ0FBbUIsRUFFdEUsRUFBRyxXQUFXLGlCQUFrQixRQUFTLEVBQUcsU0FBUyxFQUFFLEVBQ3ZELEVBQUcsV0FBVyxpQkFBa0IsVUFBVyxFQUFHLFNBQVMsSUFBSSxFQUMzRCxFQUFHLFdBQVcsaUJBQWtCLFVBQVcsRUFBRyxTQUFTLElBQUksRUFDM0QsRUFBRyxXQUFXLGlCQUFrQixXQUFZLEVBQUcsU0FBUyxLQUFLLEVBQzdELEVBQUcsV0FBVyxpQkFBa0IsT0FBUSxHQUFHLEVBQzNDLEVBQUcsV0FBVyxpQkFBa0IsT0FBUSxHQUFHLEVBQzNDLEVBQUcsV0FBVyxpQkFBa0IsT0FBUSxHQUFHLEVBQzNDLEVBQUcsV0FBVyxpQkFBa0IsT0FBUSxHQUFHLENBRS9DLEVDbkZBLEVBQWUsOENDVWYsRUFBVSxFQUlWLElBQU0sRUFBVyxJQUFJLEVBQUcsTUFBTyxDQUFFLE9BQUEsQ0FBTSxDQUFFLEVBRW5DLEVBQWEsSUFBSSxFQUFHLE1BQU8sQ0FBRSxTQUFBLENBQVEsQ0FBRSxFQUd2QyxFQUFhLElBQUksRUFBRyxNQUFPLENBQUUsU0FBQSxDQUFRLENBQUUsRUFHdkMsRUFBTSxJQUFJLEVBQUcsT0FBUSxLQUFLLEVBR2hDLEVBQUksUUFBUSxJQUFLLENBQVEsRUFDekIsRUFBSSxPQUFPLFNBQVMsR0FBSyxDQUFFLEVBQUcsQ0FBQyxFQUcvQixFQUFJLE1BQU0sSUFBSyxDQUFVLEVBSXpCLElBRGtCLEVBQUcsTUFDckIsQ0FBQSxDQUFNLFNBQVMsSUFBSyxDQUFVLEVBRzlCLElBQU0sRUFBUyxFQUFHLFNBQVMsT0FBUSxHQUFHLEVBQ3RDLEVBQUcsU0FBUyxXQUFZLENBQUUsUUFBTSxDQUFFLEVBQ2xDLElBQU0sRUFBUSxFQUFHLFNBQVMsT0FBUSxDQUFDLEVBQ25DLEVBQUcsU0FBUyxXQUFZLENBQUUsT0FBSyxDQUFFLEVBRWpDLEVBQUksTUFBTSxZQUFXLENBQUUsQ0FBQyxLQUFPLGlCQUFBLENBRTNCLE9BQ0ksTUFBQSxLQUFLLE1BQU0sY0FBZSxDQUFVLE9BRTVDLEVBRUEsRUFBSSxNQUFNLFdBQVksR0FBRyxDQUFFLENBQUMsS0FBTyxpQkFBQSxDQUUvQixLQUFLLE1BQU0sVUFBVyxFQUFZLENBQUUsRUFDcEMsRUFBTyxNQUFRLEtBQUssTUFBTSxVQUFXLENBQVUsQ0FDbkQsRUFDQSxFQUFJLE1BQU0sV0FBWSxHQUFHLENBQUUsQ0FBQyxLQUFPLGlCQUFBLENBRS9CLEtBQUssTUFBTSxVQUFXLEVBQVksRUFBRSxFQUNwQyxFQUFPLE1BQVEsS0FBSyxNQUFNLFVBQVcsQ0FBVSxDQUNuRCxFQUNBLEVBQUksTUFBTSxXQUFZLEdBQUcsQ0FBRSxDQUFDLEtBQU8saUJBQUEsQ0FFL0IsS0FBSyxNQUFNLFNBQVUsRUFBWSxDQUFFLEVBQ25DLEVBQU0sTUFBUSxLQUFLLE1BQU0sU0FBVSxDQUFVLENBQ2pELEVBQ0EsRUFBSSxNQUFNLFdBQVksR0FBRyxDQUFFLENBQUMsS0FBTyxpQkFBQSxDQUUvQixLQUFLLE1BQU0sU0FBVSxFQUFZLEVBQUUsRUFDbkMsRUFBTSxNQUFRLEtBQUssTUFBTSxTQUFVLENBQVUsQ0FDakQsRUFHQSxFQUFHLE9BQU8sTUFBSyJ9