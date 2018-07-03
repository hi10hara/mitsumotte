<style>

.req{
  background-color:white;
  position:relative;
  border-radius:10px;
  width:40%;
  height:300px;
  margin:16px 8px;
  box-shadow:3px 2px 3px gray;
  overflow:hidden;
  display:inline-block;
}
.req-head{
  background-color:#ffc81e;
  padding:5px;
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
  font-size:13px;
}
.request-top-img{
  height:200px;
}
.top-img{
  height:100%;
}
</style>

<template>
  <div class="req">
    <div class="req-head" :class="request.status">{{request.name}} <span class="req-time">{{request.requested_at | dateFormat}}</span></div>
    <div>{{request.detail}}</div>
    <div class="req-body">
      <div>予算上限:{{request.limitBudget}}</div>
      {{request.title}}
      <div class="request-top-img">
        <img class="top-img" :src="request.imgs[0]">
      </div>
      <div class="applying">現在交渉中: {{request.applying}}</div>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    console.log(this.request)
  },
  props:{
    id:String,
    request:Object
  }
}
</script>