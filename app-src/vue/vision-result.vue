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
  <div class="vision-result-wrap" v-if="show" @click="tap">
    <div class="vision-result-img">
      <img :src="imgUrl"/>
    </div>
    <transition-group name="vres" class="vision-result-texts" tag="div">
      <flop v-for="(t, i) in filters" :key="t.en" :n="i" :data="t" :flop="translated">{{t}}</flop>
    </transition-group>
  </div>
</transition>
</template>
<script>
import {mapState} from 'vuex'
import flop from './flop.vue'
export default {
  components:{
    flop
  },
  data(){
    return {
      imgUrl:'',
      translated:false
    }
  },
  watch:{
    show(v){
      if(v){
        this.translated = false
      }
    }
  },
  computed:{
    show(){
      return this.$store.state.showVisionResult
    },
    filters(){
      const ja = this.$store.state.filterTextJa
      return this.$store.state.filterTextEn.map((en, i)=>{
        return {
          en,
          ja:ja[i]
        }
      })
    }
  },
  watch:{
    show(v){
      if(!v){
        this.imgUrl = ''
        return
      }
      this.translated = false
      this.showImg()
    }
  },
  methods:{
    tap(){
      if(this.translated){
        return this.hideResult()
      }
      this.translated = true
    },
    hideResult(){
      this.$store.commit('hideResult')
    },
    showImg(){
      const fl = new FileReader()
      fl.addEventListener('load', ev=>{
        this.imgUrl = ev.target.result
      })
      fl.readAsDataURL(this.$store.state.storedImage)
    }
  }
}
</script>

