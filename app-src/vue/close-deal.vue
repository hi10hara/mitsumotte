<style>
.close-deal-cover{
  position:fixed;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.7);
  height:100%;
  width:100%;
}
.close-deal{
  background-color:white;
  text-align:center;
  margin-top:10%;
  height:200px;
}
</style>
<template>
  <transition name="cd">
    <div class="close-deal-cover" v-if="path">
      <div class="close-deal">
        {{price | currency}}で確定してよいですか？
        <div>
          <button @click="closeDeal">確定！</button>
          <button @click="cancelDeal">キャンセル</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed:{
    price(){
      return this.$store.state.deal.price
    },
    path(){
      return this.$store.state.deal.path
    }
  },
  methods:{
    closeDeal(){
      this.$store.dispatch('closeDeal')
    },
    cancelDeal(){
      this.$store.commit('unsetDeal')
    }
  }
}
</script>
