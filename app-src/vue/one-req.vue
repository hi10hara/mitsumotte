<style>
.req{
  padding:5px;
  margin:5px;
  box-shadow:var(--box-shadow)
}
</style>
<template>
  <div class="req">
    <div>{{req.categoryCaption}}</div>
    <div class="requestedAt">依頼日時:{{req.requested_at | formatDatetime}}</div>
    <div class="requestDetail">{{req.detail}}</div>
    <div class="chats">
    <chat v-for="(c, key) in req.chat" :key="key" :chat="c" :id="id + '/chat/' + key" :store-name="key"/>
    </div>
  </div>
</template>
<script>
import Chat from './chat.vue'
export default {
  components:{
    Chat
  },
  props:{
    req:Object,
    default(){
      return {}
    },
    id:{
      type:String
    }
  }
}
</script>

