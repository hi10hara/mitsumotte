<style>
.cube{
  width:100%;
  height:35px;
  margin:1px auto;
  transition:transform .3s ease;
  transform-style:preserve-3d;
  padding:1px;
}
.en,.ja{
  border:solid 1px gray;
  height:100%;
}
.ja{
  transform:rotateY(-90deg) translateY(-35px);
}
.cube.rotate{
  transform:rotateY(90deg);
}
</style>

<template>
  <div class="cube" :class="{rotate}">
    <div class="en">
      {{data.en}}
    </div>
    <div class="ja">
      {{data.ja}}
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      rotate:false
    }
  },
  watch:{
    flop(v){
      this.doFlop()
    }
  },
  props:{
    n:Number,
    data:Object,
    flop:Boolean
  },
  methods:{
    doFlop(){
      setTimeout(()=>{
        this.rotate = true
      }, (this.n * 150))
    }
  }
}
</script>

