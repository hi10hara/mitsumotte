<template>
  <div class="talk-body">
    <one-req v-for="(r, key) in myReqs" :key="key" :req="r"/>
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

