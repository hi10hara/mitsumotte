<style>
.req{
  padding:5px;
  margin:5px;
  box-shadow:0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
}
</style>
<template>
  <div class="req">
    <div>{{req.categoryCaption}}</div>
    <div class="requestedAt">依頼日時:{{req.requested_at | formatDatetime}}</div>
    <div class="requestDetail">{{req.detail}}</div>
    <div class="chat" v-show="!fold">
      <transition name="chat">
        <div class="chatm"  v-for="(c, key) in req.chat" :key="key"></div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      fold:true
    }
  },
  created(){
    console.log(this.req)
  },
  props:{
    req:Object,
    default(){
      return {}
    }
  }
}
</script>

