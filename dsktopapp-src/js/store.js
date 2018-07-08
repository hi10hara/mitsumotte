import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    storeId:'takahashi_tokeiten',
    store:{
      name:'',
      category:'repair-watch'
    }
  },
  mutations:{
    setStore(state, store){
      state.store = store
    }
  },
  actions:{
    sendChatMessage(store, {id, message}){
      const {state} = store
      const path = `/requests/${state.store.category}/${id}/chat/${state.storeId}/`
      console.log(path)
      const chatRef = window.database.ref(path)
      chatRef.push({
        vendor:true,
        user:false,
        at:Date.now(),
        from:'vendor',
        message
      })
    }
  }
})