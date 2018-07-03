<style>
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