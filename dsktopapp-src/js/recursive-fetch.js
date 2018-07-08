import Vue from 'vue'
export default function recursiveFetch(src, dest){
  if(!src){
    return dest 
  }
  const keys = Object.keys(dest)
  keys.forEach(key=>{
    const sData = src[key]
    const destData = dest[key]
    if(typeof destData === 'object'){
      console.log(key, sData, destData)
      Vue.set(src,key,recursiveFetch(sData || {}, destData))
      return
    }
    if(destData){
      src[key] = destData
    }
  })
  return src
}