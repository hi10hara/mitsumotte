<style>
.req{
  padding:5px;
  margin:5px;
  box-shadow:var(--box-shadow);
}
.requested-at,.request-budget{
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
.req.close{
  background-color:rgb(200,200,200);
}
</style>
<template>
  <div class="req" :class="req.status">
    <div class="requested-at">依頼日時:{{req.requested_at | formatDatetime}} 予算上限:{{req.limitBudget | currency}}</div>
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

