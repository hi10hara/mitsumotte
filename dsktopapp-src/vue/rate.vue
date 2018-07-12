<style>
.rating{
  display:inline-block;
  vertical-align:bottom;
  position:relative;
  width:125px;
  height:25px;
}
.rate-base,.rate-cover{
  z-index:100;
  position:absolute;
  top:0;
  left:0;
  height:100%;
  font-size:0;
}
.rate-base{
  background-color:rgb(255, 230, 6);
  width:0%;
}
.star{
  width:25px;
  height:25px;
}
</style>
<template>
  <div class="rating">
    <div class="rate-base" :style="{width:rateWidth}"></div>
    <div class="rate-cover">
      <img class="star" src="img/star.png">
      <img class="star" src="img/star.png">
      <img class="star" src="img/star.png">
      <img class="star" src="img/star.png">
      <img class="star" src="img/star.png">
    </div>
  </div>  
</template>

<script>
export default {
  computed:{
    rateWidth(){
      const r = this.rate
      const p = r / 5 * 100
      return p + '%'
    }
  },
  props:{
    rate:Number
  }
}
  
</script>


