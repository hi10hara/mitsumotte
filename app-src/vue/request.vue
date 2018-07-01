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
    height:30px;
    position:relative;
  }
  .request-page{
    text-align: left;
    font-size: 18px;
  }
  .req-enter-active, .req-leave-active{
    transition:opacity .3s ease;
    opacity:1;
  }
  .req-enter, .req-leave-to{
    opacity:0;
  }
  .close-btn{
    position:absolute;
    right:0;
    top:0;
    border:solid 1px gray;
    font-size:20px;
    height:100%;
    width:30px;
  }
  .request-detail{
    width:100%;
    resize:none;
    height:50px;
  }
</style>
<template>
  <transition name="req">
  <div class="request-cover" v-if="show">
    <div class="request">
      <div class="request-page-top">
        依頼詳細
        <input type="button" class="close-btn" value="X" @click="cancel"/>
      </div>
      <div class="request-page">
        <div>カテゴリ {{category.caption}}</div>
        <div>
          <textarea class="request-detail" placeholder="修理内容についてざっくりと説明"></textarea>
        </div>
        <p>写真<br>
        <input type="file" name="file"></p>
        <p><input type="button" value="依頼" id="button1"></p>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import eventHub from '../js/event-hub.js'
export default {
  data(){
    return {
      category:{},
      show:false
    }
  },
  created(){
    eventHub.$on('show-request-view', this.showMe)
  },
  methods:{
    showMe(category){
      this.category = category
      this.show = true
    },
    cancel(){
      this.category = {}
      this.show = false
    }
  }
}
</script>