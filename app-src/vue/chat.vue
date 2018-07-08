<template>
  <div class="chat" @click="fold = !fold">
    <div class="chat-content" v-show="!fold">
      <chat-mess v-for="m in chat.ms" :key="m.id"/>
    </div>
  </div>
</template>
<script>
import ChatMess from './chat-mess.vue'
export default {
  data(){
    return {
      fold:true
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
    }
  }
}
</script>

