import Vue from 'vue'
Vue.filter('formatCurrency', v=>{
  if(!v){
    return '¥0'
  }
  const rs = Array.from(''+v).reverse().join('')
  const vv = rs.replace(/(...)(?=.)/g, '$1,').split('').reverse().join('')
  return '¥' + vv
})