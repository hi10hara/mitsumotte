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
  text-align:left;
  width:1000px;
  height:80%;
  background-color:white;
  border-radius:5px;
  padding:5px;
  z-index:100000;
  margin:5% auto;
}
.request-detail .tip{
  font-size:15px;
  display:inline-block;
  width:40%;
  color:darkgray;
}
.request-detail .detail-wrap{
  margin:3px;
  box-shadow:0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  background-color:white;
}
.request-detail .detail{
  height:100px;
  white-space: pre-wrap;
}
.chat-body{
  height:calc(100% - 400px);
}
.chat-console{
  height:100px;
}
/* タイムライン部分③ */
.chat-body{
  margin:10px 0;
  overflow-y: scroll;
  width: 100%;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  background-color: #eee;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,.2);/*ヘッダーの下に影を入れる*/
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
  background-color:rgb(253, 175, 57);/*タイムラインの色と同じにする*/
  border: 1px solid #ddd;
  height: 100%;
  vertical-align: top;
  padding: 4px;
  color: rgb(253, 249, 249)
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
.request-info{
  height:250px;
  width:30%;
  font-size:20px;
  float:left;
  padding:0px 5px;
}
.request-info>div{
  border-bottom:solid 1px gray;
}
.request-images{
  height:250px;
  width:70%;
  float:left;
  text-align:center;
}
.request-img{
  top:0;
  height:100%;
}
.comment{
  font-size: 15px;
}
.request-header{
  position:relative;
}
.close-btn{
  position:absolute;
  margin-top:15px;
  margin-right:15px;
  right:0;
  top:0;
  width:50px;
  height:50px;
  border:0;
  cursor:pointer;
}
.req-enter-active, .req-leave-active{
  transition:all .3s ease;
  transform:translateY(0);
  opacity:1;
}
.req-enter, .req-leave-to{
  transform:translateY(-100%);
  opacity:0;
}
</style>
<template>
<transition name="req">
<div class="cover" v-if="request">
  <div class="request-detail">
    <div class="request-header">
      <div class="close-btn" @click="close">X</div>
      <div class="request-info">
        <div class="user-name"><span class="tip">ユーザ名:</span>{{request.name}}</div>
        <div class="budget"><span class="tip">予算上限:</span>{{request.limitBudget | formatCurrency}}</div>
        <div class="limit"><span class="tip">見積もり期限:</span>{{request.limitDate}}</div>
        <div class="detail-wrap"><span class="tip">見積もり概要</span>
          <div class="detail">{{request.detail}}</div>
        </div>
      </div>
      <div class="request-images">
        <img v-for="img in request.imgs" :src="img" class="request-img" :key="img" @click="closeUp(img)">
      </div>
      <div style="clear:both;"/>
    </div>
    <div class="chat-body">
      <chat-mess v-for="m in myChat" :key="m.id"/>
    </div>
    <div class="chat-console">
      <textarea class="chat-input" v-model="messageContent"/>
      <button class="message-send-btn" @click="sendChatMessage">
        チャットメッセージ送信
      </button>
    </div>
  </div>
</div>
</transition>
</template>
<script>
import eventHub from '../js/event-hub.js'
export default {
  data(){
    return {
      request:null,
      messageContent:''
    }
  },
  created(){
    eventHub.$on('show-detail', this.showDetail)
  },
  computed:{
    myChat(){
      if(!this.request.chat || !this.request.chat[this.$store.company.name]){
        return []
      }
      return this.request.chat[this.$store.company.name]
    }
  },
  methods:{
    showDetail(request){
      this.request = request
    },
    close(){
      this.request = null
    },
    closeUp(img){
      eventHub.$emit('show-photo', img)
    },
    sendChatMessage(){
      const m = this.messageContent.trim()
      if(!m){
        return
      }
      this.$store.dispatch('sendChatMessage', {
        message:m,
        path:''
      })
    }
  }
}
</script>
