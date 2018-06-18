<style>
.category-icon{
  display:inline-block;
  background-size:contain;
  height:50px;
  width:50px;
}
</style>

<template>
  <div id="app">
   <transition name="splash">
      <div class="splash" v-if="!uncovered">
        <img class="logo" src="../img/logo.png"/>
      </div>
    </transition>
    <div :class="moveDirection" class="main-content">
      <transition name="swipe">
        <div class="category-body" v-if="body === 'category'">
          <input type="text" class="category-filter" placeholder="カテゴリ検索">
          <div class="categories">
            <div v-for="c in categories" class="cate-item" :key="c.name">
                <div><div class="category-icon" :style="{'background-image':`url(data:image/png;base64,${c.icon})`}"/>
                  {{c.caption}}
                </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="swipe">
        <div class="talk-body" v-if="body=== 'talk'">
          業者とのトークを並べる予定
        </div>
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
  </div>
</template>
<script>
const views = [
  'category',
  'talk',
  'hists',
  'user'
]
export default {
    data(){
      return {
        body:'category',
        typeName:typeof cordova,
        uncovered:false,
        categories:[],
        moveDirection:'left'
      }
    },
    created:function(){
      setTimeout(this.uncover, 3000)
    },
    mounted(){
      this.initDatabase()
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
      initDatabase(){
        const database = firebase.database();
        const cateRef = database.ref('categories')
        cateRef.on('value', v=>{
          this.setCategories(v.val())
        })
      },
      setCategories(v){
        this.categories = v
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
      }
    }
  }
</script>
