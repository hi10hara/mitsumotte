import Vue from 'vue'
import Root from '../vue/root.vue'
import './filter.js'
import store from './store.js'

Vue.filter('dateFormat',(_v)=>{
  const v = new Date(_v)
  return v.toLocaleDateString() + ' ' + v.toLocaleTimeString()
})

window.rootVm = new Vue({
  el:'#app',
  store,
  render(createElement){
    return createElement(Root)
  }
})
