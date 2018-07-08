<style>
.chat{
  margin:3px;
  box-shadow:var(--box-shadow);
}
.chat-content{
  transform-origin:top;
}
.chat-enter-active, .chat-leave-active{
  transition:transform .3s ease;
  transform:scaleY(1);
}
.chat-enter, .chat-leave-to{
  transform:scaleY(0);
}
.chat-input{
  border-radius:2px;
  width:80%;
}
</style>
<template>
  <div class="chat" @click="fold = !fold">
    <div>{{store.name}}</div>
    <transition name="chat">
      <div class="chat-content" v-show="!fold">
        <chat-mess v-for="(m, key) in chat" :key="key" :id="id + '/' + key" :m="m" type="user"/>
        <textarea class="chat-input" v-model="chatContent" @keydown.enter="sendMessage" @click.stop/>
        <button @click.stop="sendMessage">送信</button>
      </div>
    </transition>
  </div>
</template>
<script>
import ChatMess from './chat-mess.vue'
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
  created(){
    const storeRef = window.database.ref(`/companies/${this.storeName}`)
    storeRef.once('value', sn=>{
      this.store = sn.val()
    })
  },
  methods:{
    sendMessage(){
      const mc = this.chatContent.trim()
      if(!mc){
        return
      }
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
    }
  }
}
</script>

