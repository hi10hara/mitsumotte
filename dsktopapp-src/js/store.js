import Vue from 'vue'
import Vuex from 'vuex'
import nofify from './notification.js'
import recursiveFetch from './recursive-fetch.js'
const anHour = 1000 * 60 * 60
const firebase = window.initFirebase()
window.database = firebase.database()
window.storage = firebase.storage()
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    storeId:'',
    store:{
      name:'',
      category:'repair-watch'
    },
    requests:{},
    requestsLoading:false,
    stores:{}
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
    getStores({state}){
      database.ref('/companies').on('value', sn=>{
        const companies = sn.val()
        console.log(companies)
        state.stores = companies
      })
    },
    initDatabase(store){
      const {state} = store
      state.requestsLoading = true
      const myCompanyName = store.state.storeId
      const companiesRef = database.ref(`/companies/${myCompanyName}`)
      companiesRef.on('value', companies=>{
        const storeInfo = companies.val()
        store.commit('setStore', storeInfo)
        const {category} = storeInfo
        const categoryRef = database.ref(`/requests/${category}`)
        categoryRef.on('value', requests=>{
          state.requestsLoading = false
          const reqs = requests.val()
          console.log(reqs)
          state.requests =  recursiveFetch(state.requests, reqs)
          return
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
      const chatRef = window.database.ref(path)
      chatRef.push({
        vendor:true,
        user:false,
        at:Date.now(),
        from:'vendor',
        message
      })
    }
  },
  getters:{
    sortedRequests(state){
      const {requests:reqs} = state
      return Object.keys(reqs).reduce((b, k)=>{
        const req = reqs[k]
        b.push({
          key:k,
          req
        })
        return b
      },[]).sort((a,b)=>{
        const ad = new Date(a.req.requested_at).getTime()
        const bd = new Date(b.req.requested_at).getTime()
        return bd - ad
      })
    }
  }
})

store.dispatch('getStores')
export default store