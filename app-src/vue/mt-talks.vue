<style>
.talk-body{
  height:calc(100% - 40px);
  overflow-y:scroll;
}
</style>
<template>
  <div class="talk-body" ref="talkBody">
    <one-req v-for="(r, key) in myReqs" :key="key" :id="r.category + '/' + key" :req="r"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import OneReq from './one-req.vue'
export default {
  components:{
    OneReq
  },
  computed:mapState({
    myReqs:'myReqs'
  })
}
</script>

