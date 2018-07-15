<style>
.chat{
  background-color:white;
  margin:3px;
  box-shadow:var(--box-shadow);
}
.chat-content-wrap{
  transform-origin:top;
}
.chat-content{
  max-height:300px;
  overflow-y:scroll;
}
.chat-enter-active, .chat-leave-active{
  transition:transform .3s ease;
  transform:scaleY(1);
}
.chat-enter, .chat-leave-to{
  transform:scaleY(0);
}
.chat-input{
  vertical-align: top;
  border-radius:2px;
  width:80%;
  height:40px;
}
.chat-name{
  position:relative;
}
.unreads{
  position:absolute;
  left:5px;
  top:2px;
  display:inline-block;
  height:20px;
  width:20px;
  text-align:center;
  color:white;
  background-color:rgb(255, 20, 50);
  border-radius:100%;
}
.chat-send{
  vertical-align: top;
  min-width:15%;
  width:15% !important;
  height:40px;
}
</style>
<template>
  <div class="chat" @click="fold = !fold">
    <div class="chat-name"><span class="unreads" v-if="unreads">{{unreads}}</span>{{store.name}}</div>
    <transition name="chat" @after-enter="scrollToEnd">
      <div class="chat-content-wrap" v-if="!fold">
        <div class="chat-content" ref="chat">
          <chat-mess v-for="(m, key) in chat" :key="key" :id="id + '/' + key" :m="m" type="user"/>
        </div>
        <textarea class="chat-input" v-model="chatContent" @keydown.enter="sendMessage" @click.stop @input="detectSendKeyword"/>
        <button class="chat-send" @click.stop="sendMessage">送信</button>
      </div>
    </transition>
  </div>
</template>
<script>
import eventHub from '../js/event-hub.js'
import ChatMess from './chat-mess.vue'
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      fold:true,
      store:{},
      chatContent:''
    }
  },
  components:{
    ChatMess
  },
  props:{
    chat:{
      type:Object,
      default(){
        return {}
      }
    },
    storeName:{
      type:String
    },
    id:{
      type:String
    }
  },
  watch:{
    unreads(v ,old){
      if(old < v){
        this.beep()
      }
    }
  },
  computed:{
    unreads(){
      if(!this.chat){
        return 0
      }
      return Object.keys(this.chat).filter(k=>!this.chat[k].user).length
    }
  },
  created(){
    const storeRef = window.database.ref(`/companies/${this.storeName}`)
    storeRef.once('value', sn=>{
      this.store = sn.val()
    })
  },
  methods:{
    ...mapActions({beep:'beep'}),
    sendMessage(){
      const mc = this.chatContent.trim()
      if(!mc){
        return
      }
      this.chatContent =''
      this.$store.dispatch('sendChatMessage', {
        path:this.id,
        data:{
          vendor:false,
          user:true,
          from:'user',
          message:mc,
          at:Date.now()
        }
      })
    },
    scrollToEnd(){
      console.log('scrooltoend')
      const {chat} = this.$refs
      chat.scrollTop = chat.clientHeight
    },
    detectSendKeyword(ev){
      const v = this.chatContent
      if(soshin.test(v)){
        this.chatContent = this.chatContent.replace(soshin, '$1')
        this.sendMessage()
      }
    }
  }
}
const soshin = /(.)送信$/
</script>

