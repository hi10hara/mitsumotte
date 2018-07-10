<style>
.store-selector-cover{
  z-index:1000000;
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:rgba(255,255,255,0.5);
}
.store-selector{
  margin:10% auto;
  background-color:white;
  border-radius:5px;
  box-shadow:2px 3px 6px 0px gray;
  height:300px;
  width:300px;
}
.store-item{
  text-align:center;
  padding:5px;
  cursor:pointer;
}
.store-item:hover{
  background-color:rgb(255, 233, 233);
}
</style>
<template>
  <div class="store-selector-cover" v-if="!$store.state.storeId">
    <div class="store-selector">
      <div class="store-item" @click="selectStore(name)" v-for="(store, name) in stores" :key="name">{{store.name}}</div>
    </div>
  </div>
</template>
<script>  
import {mapState} from 'vuex'
export default {
  computed:mapState({
    stores:'stores'
  }),
  methods:{
    selectStore(name){
      this.$store.commit('setStoreId', name)
      this.$store.dispatch('initDatabase')
    }
  }
}
</script>
