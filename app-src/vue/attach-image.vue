<style>
.ai-wrapper{
  height:100%;
  display:inline-block;
  position:relative;
}
.a-image{
  height:100%;
  padding:5px;
  box-sizing:border-box;
}
.ai-close{
  position:absolute;
  top:5px;
  right:5px;
  height:20px;
  width:20px;
  text-align:center;
  padding:2px;
  border-radius:2px;
  background-color:rgba(255,255,255,.8);
}
</style>

<template>
  <span class="ai-wrapper">
    <div class="ai-close" @click.stop="removeThisImage">X</div>
    <img class="a-image" :src="dataUrl">
  </span>
</template>
<script>
export default {
  data(){
    return {
      dataUrl:''
    }
  },
  created(){
    const fl = new FileReader()
    fl.readAsDataURL(this.file)
    fl.addEventListener('load', (ev)=>{
      this.dataUrl = ev.target.result
    })
  },
  props:{
    file:File
  },
  methods:{
    removeThisImage(){
      this.$parent.removeImage(this.file)
    }
  }
}
</script>

