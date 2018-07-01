<style>
  .request-cover{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(30,30,30, 0.8);
    z-index:10000;
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
    font-size: 18px;
  }
  .request-page-top{
    text-align: center;
    font-size: 30px;
    height:30px;
    position:relative;
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
  .select-img{
    display:inline-block;
    height:8vw;
    text-align:center;
    vertical-align:middle;
    border-radius:1px;
  }
  .file-input{
    display:none;
  }
  .icon-image{
    font-size:8vw;
  }
  .icon-image:before{
    vertical-align:bottom;
  }
  .images{
    height:30%;
    border-bottom:solid 1px gray;
    overflow-x:auto;
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
    <div>カテゴリ {{category.caption}}</div>
    <div>
      <textarea class="request-detail" placeholder="修理内容についてざっくりと説明"></textarea>
    </div>
    <div>
      <label class="select-img">
        写真を添付(３枚まで)
        <span class="icon-image"/>
        <input type="file" class="file-input" @change="addImage">
      </label>
    </div>
    <div class="images">
      <attach-image v-for="ai in attachImages" :key="ai.name" :file="ai"/>
    </div>
    <div>予算上限 <input type="number" min="0" v-model.number="badgetLimit"/></div>
    <p><input type="button" value="依頼" id="button1"></p>
    </div>
  </div>
  </transition>
</template>

<script>
import eventHub from '../js/event-hub.js'
import AttachImage from './attach-image.vue'
export default {
  data(){
    return {
      category:{},
      show:false,
      attachImages:[],
      badgetLimit:0
    }
  },
  components:{
    AttachImage
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
    },
    addImage(ev){
      const [tgImage] = ev.target.files
      this.attachImages.push(tgImage)
    }
  }
}
</script>