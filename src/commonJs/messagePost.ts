/**
 * iframeとして表示される場合の対応
 * URLの 「?id=xxx」より自分のID(識別子)を取得する
 * iframeのIdが取得できた場合はメッセージを送信する
 * 送るメッセージはウィンドウの幅・高さである
 */

export const sendHeight = () => {
    // iframeとして表示されていない場合は何もしない
    if ( window.self == window.parent ) {
        return;
    }
    // URLの「?id=xxx」から、自分のID（識別子）を取得する
    const urlParams = new URLSearchParams( window.location.search );
    const iframeId = urlParams.get( 'id' );
    // IDが取得できている場合のみ送信
    if ( iframeId ) {
        const stageCanvasWrapper = document.querySelector( '.stageCanvasWrapper' ) as HTMLDivElement;
        window.parent.postMessage( { 
            type: 'resize-iframe', 
            id: iframeId, // ◀ 自分が誰かを親に伝える
            width: stageCanvasWrapper.offsetWidth,
            height: stageCanvasWrapper.offsetHeight
        }, '*' ); // "*" はすべてのドメインを許可。セキュリティを高める場合は親のURLを指定
    }


};
window.addEventListener( 'load', sendHeight );

// 念のため少し後で送りなおす
setTimeout( sendHeight, 200 );