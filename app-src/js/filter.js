import Vue from 'vue'
import moment from 'moment'
const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'
Vue.filter('formatDatetime', (v)=>{
  if(!v){
    return ''
  }
  return moment(new Date(v)).format(FORMAT_DATETIME)
})
Vue.filter('currency', v=>{
  const rev = (''+v).split('').reverse().join('')
  return '¥' + rev.replace(/(...)(?=.)/g, '$1,').split('').reverse().join('')
})