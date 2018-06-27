<style>
  .request-cover{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(30,30,30, 0.8);
  }
  .request{
    background-color:white;
    height:80%;
    width:90%;
    margin-right:auto;
    margin-left:auto;
    margin-top:20px;
    padding:5px;
    border-radius:5px;
  }
  .request-page-top{
    text-align: center;
    font-size: 30px;
  }
  .request-page{
    text-align: left;
    font-size: 18px;
  }

</style>
<template>
  <div class="request-cover" v-if="show">
    <div class="request">
      
      <div class="request-page-top">
        依頼詳細
      </div>
      <div class="request-page">
        <p>カテゴリ<br>
        <input type="text" name="category" size="30"></p>
        <p>コメント<br>
        <textarea class="textlines" name="comment" cols="50" rows="8"></textarea>
        <p>写真<br>
        <input type="file" name="file"></p>
        <p><input type="button" value="依頼" id="button1"></p>
      </div>
    </div>
  </div>
</template>

<script>
import eventHub from '../js/event-hub.js'
export default {
  data(){
    return {
      show:false
    }
  },
  created(){
    eventHub.$on('show-request-view', this.showMe)
  },
  methods:{
    showMe(){
      this.show = true
    }
  }
}
</script>