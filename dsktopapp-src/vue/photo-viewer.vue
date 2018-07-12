<style>
.photo-enter-active, .photo-leave-active{
  transition:all .3s ease;
  opacity:1;
  transform:scale(1)
}
.photo-enter, .photo-leave-to{
  transform:scale(0.5);
  opacity:0;
}
.photo-cover{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  margin:auto;
  text-align:center;
  background-color:rgba(0,0,0,.5);
  z-index:10000;
}
.photo-viewer{
  display:inline-block;
  width:auto;
  padding:1%;
  background-color:rgb(255,255,255,.8);
  border-radius:5px;
}
.photo{
  min-height:300px;
  max-height:800px;
}
</style>
<template>
<transition name="photo">
<div class="photo-cover" v-if="imgUrl" @click="close">
  <div class="photo-viewer">
    <img :src="imgUrl" class="photo">
  </div>
</div>
</transition>
</template>
<script>
import eventHub from '../js/event-hub.js'
export default {
  data(){
    return {
      imgUrl:''
    }
  },
  created(){
    eventHub.$on('show-photo', this.showMe)
  },
  methods:{
    showMe(url){
      console.log('show-photo')
      this.imgUrl = url
    },
    close(){
      this.imgUrl = ''
    }
  }
}
</script>
