import Vue from 'vue'
import moment from 'moment';
const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'
Vue.filter('formatCurrency', v=>{
  if(!v){
    return '¥0'
  }
  const rs = Array.from(''+v).reverse().join('')
  const vv = rs.replace(/(...)(?=.)/g, '$1,').split('').reverse().join('')
  return '¥' + vv
})

Vue.filter('formatDatetime', v=>{
  if(!v){
    return ''
  }
  return moment(new Date(v)).format(FORMAT_DATETIME)
})