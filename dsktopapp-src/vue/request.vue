<template>
  <div class="req">
    <div class="req-head" :class="request.status">{{request.name}} <span class="req-time">{{request.requested_at | dateFormat}}</span></div>
    <div class="req-body">
      <div>予算上限:{{request.request['budget-limit']}}</div>
      {{request.request.title}}
      <div class="request-top-img">
        <img class="top-img" :src="request.imgs[0]">
      </div>
      <div class="applying">現在交渉中: {{request.applying}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    id:String,
    request:Object
  }
}
</script>