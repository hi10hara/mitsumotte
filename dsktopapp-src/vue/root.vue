<style>
.store-wrap{
  margin-bottom:10px;
}
.store-banner{
  height:200px;
  position:relative;
}
.store-banner-mask{
  position:absolute;
  height:200px;
  top:0;
  left:0;
  width:100%;
  background:linear-gradient(transparent ,rgba(255,255,255,0.5),white)
}
.store-head{
  height:40px;
}
input, textarea,select{
  font-family:inherit;
  box-sizing:border-box;
}
.requests{
  position:relative;
  height:100%;
  float:left;
  width:70%;
  overflow-y:scroll;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
}
.ad{
  height: calc(100% - 700px);
  width:100%;
  margin-top: 10%
}
.reputations{
  overflow-y:scroll;
  height:200px;
  margin:10px;
  padding:5px;
  border-bottom:solid 1px gray;
}
.reputation{
  margin:10px;
}

</style>
<template>
  <div id="app">
    <store-selector/>
    <h1 class="header"><img class="header-icon" src="img/logo.png"/>
    <div class="search-box">
      <input name="keywords2" id="keywords2" placeholder="検索" type="text" /> 
      <input type="image" src="img/btn2.gif" alt="検索" name="searchBtn2" id="searchBtn2" />  
    </div></h1>
    <div class="main">
      <div class="requests">
        <div style="clear:both"></div>
        <transition name="loading">
          <div class="requests-loading" v-if="requestsLoading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        </transition>
        <mi-request class="req" v-for="r in requests" :key="r.key" :request="r.req" :id="r.key"></mi-request>
      </div>
      <div class="your-info">
        <div class="store-wrap" >
          <div class="store-banner" :style="{'background-image':storeBanner}">
            <div class="store-banner-mask"></div>
          </div>
          <div class="store-head">
            <div class="store-name">{{store.name}}</div>
            <div style="clear:both"></div>
          </div>
          <div class="store-info">{{store.description}}</div>
        </div>
        <div class="rate-avg">総合評価:<rate-parts :rate="store.rateAverage"/></div>
        <div>最新のコメント</div>
        <div class="reputations">
          <div class="reputation" v-for="(r, i) in store.reputs" :key="i">
            <div class="rep-icon"></div><div class="rep-name">{{r.name}}</div>
            <rate-parts :rate="r.rate"/>
            <div class="repute">{{r.repute}}</div>
          </div>
        </div>
        <img class="ad" src="img/nttcom.png"/>
      </div>
    </div>
    <request-detail/>
    <photo-viewer/>
  </div>
</template>
<script>
import StoreSelector from './store-selector.vue'
import Request from './request.vue'
import RequestDetail from './request-detail.vue'
import PhotoViewer from './photo-viewer.vue'
import Rate from './rate.vue'
import {mapState, mapGetters} from 'vuex'
export default {
  data(){
    return {
      storeBanner:''
    }
  },
  computed:{
    ...mapGetters({
      requests:'sortedRequests'
    }),
    ...mapState({
      store:'store',
      storeId:'storeId',
      requestsLoading:'requestsLoading'
    })
  },
  watch:{
    async storeId(){
      const url = await window.storage.ref(`store-img/${this.storeId}/banner.jpg`).getDownloadURL()
      this.storeBanner = 'url(' + url + ')'
    }
  },
  components:{
    StoreSelector,
    'rate-parts':Rate,
    'mi-request':Request,
    RequestDetail,
    PhotoViewer
  },
  methods:{

  }
}
</script>