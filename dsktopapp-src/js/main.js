import Vue from 'vue'
import Root from '../vue/root.vue'
import nofify from './notification.js'
import './filter.js'
import store from './store.js'
import recursiveFetch from './recursive-fetch.js'
const anHour = 1000 * 60 * 60
Vue.filter('dateFormat',(_v)=>{
  const v = new Date(_v)
  return v.toLocaleDateString() + ' ' + v.toLocaleTimeString()
})

/*globals Vue*/
const myCompanyName = store.state.storeId
function main(){
  window.database = window.firebase.database()
  var companiesRef = database.ref(`/companies/${myCompanyName}`)
  companiesRef.on('value', companies=>{
    const storeInfo = companies.val()
    const topVm = window.rootVm.$children[0]
    store.commit('setStore', storeInfo)
    const {category} = storeInfo
    const categoryRef = database.ref(`/requests/${category}`)
    categoryRef.on('value', requests=>{
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
      topVm.requests =  recursiveFetch(topVm.requests, revReqs)
      //  topVm.requests = revReqs
       topVm.requestsLoading = false
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
  window.rootVm = new Vue({
    el:'#app',
    store,
    render(createElement){
      return createElement(Root)
    }
  })
}
main()