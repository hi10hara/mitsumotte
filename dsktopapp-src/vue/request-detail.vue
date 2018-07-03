<style>
.cover{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:1000;
  background-color:rgb(0,0,0,.5);
}
.request-detail{
  width:1000px;
  height:80%;
  background-color:white;
  border-radius:5px;
  padding:5px;
  z-index:100000;
  margin:auto;
}
.request-header{
  height:300px;
}
.chat-body{
  height:calc(100% - 400px);
}
.chat-console{
  height:80px;
}
/* タイムライン部分③ */
.chat-body{
  overflow-y: scroll;
  width: 100%;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  background-color: #eee;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.2) inset;/*ヘッダーの下に影を入れる*/
}
  /* メッセージ全般のスタイル */
.message {
    margin: 0px;
    padding: 0 14px;/*吹き出しがタイムラインの側面にひっつかない様に隙間を開ける*/
    font-size: 16px;
    word-wrap: break-word;/* 吹き出し内で自動で改行 */
    white-space: normal;/*指定widthに合わせて、文字を自動的に改行*/
}
/* メッセージ１（左側） */
.left {
  float: left;/*吹き出しをmessagesに対して左寄せ*/
  line-height: 1.3em;
}
/* メッセージ２（右側） */
.right {
  float: right;/*吹き出しをmessagesに対して右寄せ*/
  line-height: 1.3em;
}
/* 回り込みを解除 */
.clear {
    clear: both; /* 左メッセージと右メッセージの回り込み(float)の効果の干渉を防ぐために必要（これが無いと、自分より下のメッセージにfloatが影響する） */

}

/* テキストエリア、送信ボタン④ */
.message-send-btn{
  background-color:#eee;/*タイムラインの色と同じにする*/
  border: 1px solid #ddd;
  height: 100%;
  vertical-align: top;
  padding: 4px;
}
.chat-input{
  width:80%;
  height:100%;
  resize:none;
  border-radius:5px;
  padding:5px;
  font-size:20px;
}

/*
*追加
*/
.message_content{
  padding: 20px;/*文字や画像（コンテンツ）の外側に隙間を入れる*/
}

/* メッセージ１（左側） */
.left {
  float: left;/*吹き出しをmessagesに対して左寄せ*/
  line-height: 1.3em;
}
/*
*追加
*/
.left .message_box {
  color: #333;/*テキストを黒にする*/
  background: #fff;
  border: 2px solid #13178E;
  border-radius: 30px 30px 30px 0px;/*左下だけ尖らせて吹き出し感を出す*/
  margin-right: 50px;/*左側の発言だとわかる様に、吹き出し右側に隙間を入れる*/
}

/* メッセージ２（右側） */
.right {
float: right;/*吹き出しをmessagesに対して右寄せ*/
line-height: 1.3em;
}
/*
*追加
*/
.right .message_box {
    color: #fff;/*テキストを白にする*/
    background: #13178E;
    border: 2px solid #13178E;
    border-radius: 30px 30px 0px 30px;/*右下だけ尖らせて吹き出し感を出す*/
    margin-left: 50px;/*右側の発言だとわかる様に、吹き出し左側に隙間を入れる*/
}
</style>
<template>
<div class="cover" v-if="show">
  <div class="request-detail">
    <div class="request-header">
      <div class="title">
        腕時計の見積依頼
      </div>
      <div class="close-btn" @click="close">X</div>
      <div class="comment">
        説明
        ガラス割れました。
        見積もりお願いいたします。
      </div>
    </div>
    <div class="chat-body">
      <div class="message left">
        <div class="message_box">
          <div class="message_content">
            <div class="message_text">ほうほうこりゃー便利じゃないか</div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="message right">
        <div class="message_box">
          <div class="message_content">
            <div class="message_text">うん、まあまあいけとるな</div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="chat-console">
      <textarea class="chat-input"></textarea>
      <button class="message-send-btn">
        取引メッセージを送る
      </button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      show:false
    }
  },
  mehtods:{
    close(){
      this.show = false
    }
  }
}
</script>
