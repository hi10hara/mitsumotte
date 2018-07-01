<style>
.a-image{
  height:100%;
  padding:5px;
  box-sizing:border-box;
}
</style>

<template>
  <img class="a-image" :src="dataUrl">
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

  }
}
</script>

