<style>
  .vision-result-wrap{
    height:100%;
    width:100%;
    position:fixed;
    top:0;left:0;
    background-color:white;
    z-index:100000;
  }
  .vision-result-img{
    height:40%;
  }
  .vision-result-img>img{
    height:100%;
  }
  .vision-result-texts{
    padding:3px 15px;
    height:60%;
  }
  .vision-result-text{
    border-bottom:solid 1px rgb(180,180,180);
  }
.fade-enter-active, .fade-leave-active{
  transition:transform .3s ease;
  transform:translateY(0)
}
.fade-enter{
  transform:translateY(-100%)
}
.fade-leave-to{
  transform:translateX(-100%)
}
.vres-enter-active, .vres-leave-active{
  transition:all .5s cubic-bezier(0, 0, 0.65, 1.65);
  opacity:1;
  transform:scale(1);
}
.vres-enter,.vres-leave-to{
  opacity:0;
  transform:scale(0);
}
</style>
<template>
<transition name="fade">
  <div class="vision-result-wrap" @click="$store.commit('cleaResult')" v-if="show">
    <div class="vision-result-img">
      <img :src="imgUrl"/>
    </div>
    <transition-group name="vres" class="vision-result-texts" tag="div">
      <div class="vision-result-text" v-for="t in filters" :key="t">{{t}}</div>
    </transition-group>
  </div>
</transition>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      imgUrl:'',
      filters:[]
    }
  },
  computed:{
    show(){
      return this.$store.state.showVisionResult
    }
  },
  watch:{
    show(v){
      if(!v){
        return
      }
      this.showImg()
    }
  },
  methods:{
    showImg(){
      this.filters = []
      const fl = new FileReader()
      fl.addEventListener('load', ev=>{
        this.imgUrl = ev.target.result
      })
      fl.readAsDataURL(this.$store.state.storedImage)
      this.copyStart()
    },
    copyStart(){
      const src = this.$store.state.filterTexts
      src.forEach((s, ind)=>{
        setTimeout(()=>{
          this.filters.push(s)
        },ind * 250)
      })
    }
  }
}
</script>

