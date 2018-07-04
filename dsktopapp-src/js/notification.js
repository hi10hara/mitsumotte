async function requestPersmission(){
  if(Notification.permission === 'granted'){
    return true
  }
  return new Promise(resolve=>{
    Notification.requestPermission(permission=>{
      resolve(permission === 'granted')
    });
  })
}
module.exports = async function notify(title, opts){
  const ok = await requestPersmission()
  if(!ok){
    return
  }
  const n = new Notification(title, opts)
  n.onclick = function(){
    window.focus()
    n.close()
  }
}