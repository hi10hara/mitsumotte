import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    store:{
      name:'takahashi_tokeiten',
      categoriy:'repair-watch'
    }
  },
  mutations:{
    setStore(state, store){
      state.store = store
    }
  }
})