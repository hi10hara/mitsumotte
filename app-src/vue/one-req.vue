<style>
.req{
  padding:5px;
  margin:5px;
  box-shadow:var(--box-shadow)
}
.requested-at{
  font-size:10px;
  color:gray;
  text-align:left;
}
.request-content{
  display:flex;
}
.request-left{
  flex-basis:50%;
}
.request-img{
  height:100px;
}
</style>
<template>
  <div class="req">
    <div class="requested-at">依頼日時:{{req.requested_at | formatDatetime}}</div>
    <div class="request-content">
      <div class="request-left">
        <div>{{req.categoryCaption}}</div>
        <div class="request-detail">{{req.detail}}</div>
      </div>
      <div class="request-imgs">
        <img class="request-img" v-for="img in req.imgs" :src="img" :key="img"/>
      </div>
    </div>
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

