<style>
  .request-cover{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(30,30,30, 0.2);
    z-index:10000;
  }
  .request{
    color:rgb(50,50,50);
    background-color:white;
    height:80%;
    width:90%;
    margin-right:auto;
    margin-left:auto;
    margin-top:20px;
    padding:5px;
    border-radius:5px;
    font-size: 18px;
    box-shadow:0 0 5px 3px gray;
  }
  .request-page-top{
    text-align: center;
    font-size: 25px;
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
    height:50px;
    min-width:50px !important;
    width:50px;
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
    overflow-x:scroll;
    white-space:nowrap;
  }
  .budget{
    border:none;
    border-bottom:solid 1px gray;
    border-radius:0;
    padding:2px;
    width:40%;
    box-shadow:none;
    text-align:right;
    margin-bottom:2px;
  }
.send-request{
  margin-top:10px;
  background-color:rgb(255,233,233);
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: black;
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
<template>
  <transition name="req">
  <div class="request-cover" v-if="show">
    <div class="request">
      <div class="request-page-top">
        見積もり詳細
        <input type="button" class="close-btn" value="X" @click="cancel"/>
      </div>
    <div>カテゴリ {{category.caption}}</div>
    <div>
      <textarea class="request-detail" v-model="requestDetail" placeholder="修理内容についてざっくりと説明"></textarea>
    </div>
    <div>
      <label class="select-img">
        写真を添付
        <span class="icon-image"/>
        <input type="file" class="file-input" multiple="true" @change="addImage" accept="image/*">
      </label>
    </div>
    <div class="images">
      <attach-image v-for="ai in attachImages" :key="ai.name" :file="ai"/>
    </div>
    <div>予算上限 ¥<input class="budget" min="0" v-model="limitBudgetStr" style="width:50%"/></div>
    <div>見積もり期限<input class="limitDate" type="date" v-model="limitDate"/></div>
    <input type="button" class="send-request" value="見積もり依頼を出す" @click="request" :disabled="requesting">
    <div class="req-spinner" v-if="requesting">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="message">{{requestMessage}}</div>
    </div>
  </div>
  </transition>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
import eventHub from '../js/event-hub.js'
import AttachImage from './attach-image.vue'
export default {
  data(){
    return {
      category:{},
      show:false,
      requestDetail:'',
      limitDate:moment().add(1, 'week').format('YYYY-MM-DD'),
      attachImages:[],
      limitBudget:0,
      requesting:false
    }
  },
  computed:{
     limitBudgetStr:{
      get(){
        const rev = (''+this.limitBudget).split('').reverse().join('')
        return rev.replace(/(...)(?=.)/g, '$1,').split('').reverse().join('')
      },
      set(v){
        this.limitBudget = parseInt(v.replace(/\D/g,''),10) || 0
      }
    },
    ...mapState({
      requestMessage:'requestMessage'
    })
  },
  components:{
    AttachImage
  },
  created(){
    eventHub.$on('show-request-view', this.showMe)
  },
  methods:{
    showMe(category){
      this.limitBudget = 0
      this.requestDetail = ''
      this.attachImages = []
      if(this.$store.state.storedImage){
        this.attachImages.push(this.$store.state.storedImage)
        this.$store.commit('eraseStoredImage')
      }
      this.category = category
      this.show = true
    },
    cancel(){
      this.category = {}
      this.show = false
    },
    addImage(ev){
      const {files} =  ev.target
      Array.from(files).forEach(file=>{
        this.attachImages.push(file)
      })
    },
    removeImage(file){
      const ind = this.attachImages.findIndex(f=> f === file)
      this.$delete(this.attachImages, ind)
    },
    async request(){
      if(!this.requestDetail || !this.limitBudget || !this.attachImages.length || !this.limitDate){
        return this.$store.commit('setRequestMessage', '入力はすべて埋めてください')
      }
      this.requesting = true
      await this.$store.dispatch('request', {
        category:this.category.name,
        categoryCaption:this.category.caption,
        detail:this.requestDetail,
        limitBudget:this.limitBudget,
        limitDate:this.limitDate,
        images:this.attachImages
      })
      this.requesting = false
      this.show = false
    }
  }
}
</script>