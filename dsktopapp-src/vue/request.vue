<style>

.req{
  background-color:white;
  position:relative;
  margin:16px 8px;
  box-shadow:2px 1px 6px gray;
  overflow:visible;
  display:inline-block;
  flex-basis:500px;
  height:300px;
}
.req-head{
  background-color:#ffc81e;
  position: relative;
  overflow:visible;
  padding-left:35px;
  height:30px;
}
.req-head .req-time{
  font-size:10px;
  color:gray;
}
.req-head.closed{
  background-color:rgb(222,222,222);
}
.req-body{
  padding:2px;
}
.req .applying{
  position:absolute;
  bottom:0;
  color:rgb(100,150,100);
  right:15px;
  font-size:20px;
}
.request-top-img{
  margin:auto;
  text-align:center;
  height:200px;
}
.top-img{
  height:100%;
  margin:0px 10px;
  box-shadow:2px 2px 3px 1px gray;
  border-radius:5px;
}
.new-icon{
  position:absolute;
  right:30px;
  top:-10px;
  height: 30px;
  width: 30px;
  text-align:center;
  color:white;
  font-size:25px;
  margin-bottom:30px;
  font-weight:bold;
  background-color:red;
  border-radius:100%;
}
.unreads{
  width:25px;
  height:25px;
  font-weight:bold;
  position:absolute;
  left:2px;
  top:0;
  text-align:center;
  background-color:rgb(255, 20, 50);
  color:white;
  border-radius:100%;
}
</style>

<template>
  <div class="req" @click="showDetail">
    <div class="req-head" :class="request.status">
      <span class="unreads" v-if="unreads">{{unreads}}</span>
      {{request.name}} <span class="req-time">{{request.requested_at | dateFormat}}</span>
      <div v-if="isNewReq" class="new-icon">!</div>
    </div>
    <div>{{request.detail}}</div>
    <div class="req-body">
      <div>予算上限:{{request.limitBudget | formatCurrency}}</div>
      {{request.title}}
      <div class="request-top-img">
        <img class="top-img" v-for="img in request.imgs" :src="img" :key="img">
      </div>
      <div class="applying">現在交渉中: {{request.applying}}</div>
    </div>
  </div>
</template>
<script>
import eventHub from '../js/event-hub.js'
const aHour = 1000 * 60 * 60
export default {
  props:{
    id:String,
    request:Object
  },
  computed:{
    unreads(){
      if(!this.request.chat){
        return 0
      }
      const chat = this.request.chat[this.$store.state.storeId]
      console.log(chat)
      if(!chat){
        return 0
      }
      return Object.keys(chat).filter(m=> !chat[m].vendor).length
    },
    isNewReq(){
      const n = new Date(this.request.requested_at).getTime()
      const diffFromNow = Date.now() - n
      return diffFromNow < aHour
    }
  },
  methods:{
    showDetail(){
      eventHub.$emit('show-detail', this.id, this.request)
    }
  }
}
</script>