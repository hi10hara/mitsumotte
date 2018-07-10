import Vue from 'vue'
import Vuex from 'vuex'
import nofify from './notification.js'
import recursiveFetch from './recursive-fetch.js'
const anHour = 1000 * 60 * 60

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    storeId:'',
    store:{
      name:'',
      category:'repair-watch'
    },
    requests:{},
    requestsLoading:false
  },
  mutations:{
    setStoreId(state, id){
      state.storeId = id
    },
    setStore(state, store){
      state.store = store
    }
  },
  actions:{
    initDatabase(store){
      const {state} = store
      state.requestsLoading = true
      const myCompanyName = store.state.storeId
      const firebase = window.initFirebase()
      window.database = firebase.database()
      const companiesRef = database.ref(`/companies/${myCompanyName}`)
      companiesRef.on('value', companies=>{
        const storeInfo = companies.val()
        store.commit('setStore', storeInfo)
        const {category} = storeInfo
        const categoryRef = database.ref(`/requests/${category}`)
        categoryRef.on('value', requests=>{
          state.requestsLoading = false
           const reqs = requests.val()
           if(!reqs){
             return
           }
           const revKeys = Object.keys(reqs).sort((a,b)=>{
             const ar = reqs[a].requested_at
             const br = reqs[b].requested_at
             if(ar > br){
               return -1
             }else if(ar < br){
               return 1
             }
             return 0
           })
           const revReqs = revKeys.reduce((b,c)=>{
            b[c] = reqs[c]
            return b
           },{})
           state.requests =  recursiveFetch(state.requests, revReqs)
           const [topKey] = revKeys
           const topReq = revReqs[topKey]
           const topDate = new Date(topReq.requested_at)
           const diffFromNow = (Date.now() - topDate.getTime())
           if(diffFromNow < anHour){
            nofify('新しい見積もり依頼', {
              icon:topReq.imgs[0],
              body:topReq.detail
            })
           }
        })
      })
    },
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