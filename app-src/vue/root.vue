<style>
*{
  --box-shadow:0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
}
input,textarea,button{
  font-family:inherit;
}
.category-icon{
  display:inline-block;
  background-size:contain;
  height:40px;
  width:40px;
  vertical-align:bottom;
}
.cate-item{
  font-size:35px;
  padding:1vw;
  margin-bottom:1vw;
  height:55px;
  background-color:white;
  text-align:left;
  text-indent:3vw;
  box-shadow:var(--element-shadow);
}
.cate-caption{
  vertical-align:bottom;
}
.icon-camera{
  color:rgb(50,50,50);
}
.direct-img{
  display:none;
}
</style>

<template>
  <div id="app">
    <login/>
    <div :class="moveDirection" class="main-content">
      <transition name="swipe">
        <div class="category-body" v-if="body === 'category'">
          <label class="direct-img-wrap">
            <span>写真を撮って絞り込み</span>
            <span class="icon-camera"/>
            <input type="file" class="direct-img" @change="takeDirectPhoto" accept="image/*"/>
          </label>
          <div class="categories">
            <div v-for="c in filteredCategories" class="cate-item" :key="c.name" @click="showRequest(c)">
                <div><div class="category-icon" :style="{'background-image':`url(data:image/png;base64,${c.icon})`}"/>
                  <span class="cate-caption">{{c.caption}}</span>
                </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="swipe">
        <mt-talks v-if="body === 'talk'"/>
      </transition>
      <transition name="swipe">
        <div class="talk-body" v-if="body=== 'hists'">
          過去の履歴
        </div>
      </transition>
      <transition name="swipe">
        <div class="talk-body" v-if="body=== 'user'">
          設定画面
        </div>
      </transition>
    </div>
    <div class="footer">
      <div class="shortcut category" @click="selectBody('category')" :class="{selected:body === 'category'}">
        <span class="icon-file-text"></span>
      </div>
      <div class="shortcut talk" @click="selectBody('talk')" :class="{selected:body === 'talk'}">
        <span class="icon-bubbles4"></span>
      </div>
      <div class="shortcut hists" @click="selectBody('hists')" :class="{selected:body === 'hists'}">
        <span class="icon-folder-open"></span>
      </div>
      <div class="shortcut user" @click="selectBody('user')" :class="{selected:body === 'user'}">
          <span class="icon-user"></span>
      </div>
    </div>
    <request-view/>
    <visioning/>
  </div>
</template>
<script>
import eventHub from '../js/event-hub'
import RequestView from './request.vue'
import Login from './login.vue'
import MtTalks from './mt-talks.vue'
import {mapGetters} from 'vuex'
import Visioning from './visioning.vue'
const views = [
  'category',
  'talk',
  'hists',
  'user'
]
export default {
  components:{
    Visioning,
    Login,
    RequestView,
    MtTalks
  },
    data(){
      return {
        body:'category',
        typeName:typeof cordova,
        uncovered:false,
        categories:[],
        moveDirection:'left'
      }
    },
    computed:mapGetters({
      filteredCategories:'filteredCategories'
    }),
    created:function(){
      setTimeout(this.uncover, 2000)
    },
    mounted(){
      const h = new Hammer(this.$el)
      h.on('swipe', ev=>{
        const m = ev.velocity < 0 ? 1 : -1
        let nowIndex = views.findIndex(v=> v === this.body) + m
        if(!views[nowIndex]){
          return
        }
        if(m === -1){
          this.moveDirection = 'right'
        }else{
          this.moveDirection = 'left'
        }
        this.setBody(views[nowIndex])
      })
    },
    methods:{
      takeDirectPhoto(ev){
        const [file] = ev.target.files
        if(!file){
          return
        }
        this.$store.dispatch('takeDirectPhoto',file)
      },
      setBody(b){
        this.$nextTick(()=>this.body = b)
      },
      selectBody(b){
        const nowIndex = views.findIndex(v=> v === this.body)
        const toIndex = views.findIndex(v=> v === b)
        this.moveDirection = nowIndex < toIndex ? 'left' : 'right'
        this.setBody(b)
      },
      uncover:function(){
        this.uncovered = true
      },
      showRequest(category){
        eventHub.$emit('show-request-view', category)
      }
    }

  }
</script>
