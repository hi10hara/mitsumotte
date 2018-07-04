<style>

.req{
  background-color:white;
  position:relative;
  border-radius:10px;
  margin:16px 8px;
  box-shadow:2px 1px 6px gray;
  overflow:visible;
  display:inline-block;
  flex-basis:500px;
  height:300px;
}
.req-head{
  border-radius:10px 10px 0 0;
  background-color:#ffc81e;
  position: relative;
  overflow:visible;
  padding:5px;
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
</style>

<template>
  <div class="req" @click="showDetail">
    <div class="req-head" :class="request.status">{{request.name}} <span class="req-time">{{request.requested_at | dateFormat}}</span>
      <div v-if="isNewReq" class="new-icon">!</div>
    </div>
    <div>{{request.detail}}</div>
    <div class="req-body">
      <div>予算上限:{{request.limitBudget}}</div>
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
  created(){
    
  },
  props:{
    id:String,
    request:Object
  },
  computed:{
    isNewReq(){
      const n = new Date(this.request.requested_at).getTime()
      const diffFromNow = Date.now() - n
      return diffFromNow < aHour
    }
  },
  methods:{

    showDetail(){
      eventHub.$emit('show-detail', this.request)
    }
  }
}
</script>