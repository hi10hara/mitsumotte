<template>
  <div id="app">
    <h1 class="header"><img class="header-icon" src="img/logo.png"/>
    <div class="search-box">
      <input name="keywords2" id="keywords2" placeholder="検索" type="text" /> 
      <input type="image" src="img/btn2.gif" alt="検索" name="searchBtn2" id="searchBtn2" />  
    </div></h1>
    <div class="main">
      <div class="requests">
        <transition name="loading">
            <div class="requests-loading" v-if="requestsLoading">
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </transition>
        <mi-request class="req" v-for="(r, key) in requests" :key="key" :request="r" :id="key"></mi-request>
      </div>
      <div class="your-info">
        <div class="store-warp">
          <div class="store-head">
            <img class="store-icon" src="img/icon.png"/>
            <div class="store-name">{{store.name}}</div>
            <div style="clear:both"></div>
          </div>
          <div v-if="!editDesc" class="store-info">{{store.description}}</div>
          <div v-else class="store-info"><textarea v-model="store.description"></textarea></div>
        </div>
        <div class="rate-avg">総合評価:<rate-parts :rate="store.rateAverage"></rate-parts></div>

        <div>最新のコメント</div>
        <div class="reputations">
          <div class="reputation" v-for="(r, i) in store.reputs" :key="i">
            <div class="rep-icon"></div><div class="rep-name">{{r.name}}</div>
            <rate-parts :rate="r.rate"></rate-parts>
            <div class="repute">{{r.repute}}</div>
          </div>
        </div>
        <img class="ad" src="img/NTTコミュニケーションズ.png"/>
      </div>
    </div>
  </div>
</template>
<script>
import Request from './request.vue'
const Rate = {
  template:[
    '<div class="rating">',
      '<div class="rate-base" :style="{width:rateWidth}"></div>',
      '<div class="rate-cover">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
      '</div>',
    '</div>'].join(''),
  computed:{
    rateWidth(){
      const r = this.rate
      const p = r / 5 * 100
      return p + '%'
    }
  },
  props:{
    rate:Number
  },
}


export default {
  data(){
    return {
      editDesc:false,
      requestsLoading:true,
      store:{
        name:'',
        description:'',
        reputs:[
        ]
      },
      requests:{}
    }
  },
  components:{
    'rate-parts':Rate,
    'mi-request':Request
  },
  watch:{
    'store.description'(v){

    }
  },
  methods:{

  }
}
</script>