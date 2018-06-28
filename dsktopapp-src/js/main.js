import Vue from 'vue'
import Root from '../vue/root.vue'
Vue.filter('dateFormat',(_v)=>{
  const v = new Date(_v)
  return v.toLocaleDateString() + ' ' + v.toLocaleTimeString()
})


/*globals Vue*/
const myCompanyName = 'takahashi_tokeiten'
function main(){
  var database = window.firebase.database()
  var companiesRef = database.ref(`/companies/${myCompanyName}`)
  companiesRef.on('value', companies=>{
    const storeInfo = companies.val()
    const topVm = window.rootVm.$children[0]
    topVm.store = storeInfo
    const {category} = storeInfo
    const categoryRef = database.ref(`requests/${category}`)
    categoryRef.on('value', requests=>{
       const reqs = requests.val()
       topVm.requests = reqs
       topVm.requestsLoading = false
    })
  })
  window.rootVm = new Vue({
    el:'#app',
    render(createElement){
      return createElement(Root)
    }
  })
}
main()