import Vue from 'vue'
import Vuex from 'vuex'
const LOGINFO = 'loginfo'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    version:'1.0.0',
    user:{
      displayName:'',
      uid:''
    },
    account:'',
    password:'',
    displayName:'',
    loginMessage:'',
    logining:false,
    requestMessage:''
  },
  mutations:{
    loadLast(state){
      const l = localStorage.getItem(LOGINFO)
      if(!l){
        return
      }
      const linfo = JSON.parse(l)
      state.account = linfo.account
      state.password = linfo.password
      state.displayName = linfo.displayName
    },
    saveLast(state){
      const linfo = {
        account:state.account,
        password:state.password,
        displayName:state.displayName
      }
      localStorage.setItem(LOGINFO, JSON.stringify(linfo))
    },
    setRequestMessage(state, m){
      state.requestMessage = m
      setTimeout(()=>{
        state.requestMessage = ''
      }, 4000)
    }
  },
  actions:{
    login(store, {account, password, displayName}){
      const {state} = store
      state.account = account
      state.password = password
      state.displayName = displayName
      state.loginMessage = 'ログイン中'
      state.logining = true
      firebase.auth().signInWithEmailAndPassword(account,password)
        .then(logined=>{
          store.commit('saveLast')
          const u = firebase.auth().currentUser
          return u.updateProfile({
            displayName
          })
        })
        .then(()=>{
          const u = firebase.auth().currentUser
          console.log(u)
          state.user = u
          state.logined = true
        })
        .catch(e=>{
          state.loginMessage = 'ログインできませんでした'
          console.error(e)
        })
        .then(()=>{
          state.logining = false
        })
    },
    async request(store, requestData){
      const {state} = store
      const {images} = requestData
      delete requestData.images
      const imgPaths =[]
      await images.reduce((b, img, count)=>{
        return b.then(()=>{
          const imgStorage = firebase.storage().ref(`request-img/${Date.now()}-${count}/`)
          return new Promise(resolve=>{
            return imgStorage.put(img)
              .then(snapshot=>{
                snapshot.ref.getDownloadURL().then(url=>{
                  imgPaths.push(url)
                  resolve()
                })
              })
          })
        })
      }, Promise.resolve())
      const requests = firebase.database().ref(`requests/${requestData.category}`)
      const newId = state.user.uid + '-' + Date.now()
      return requests.child(newId).set({
        applying:0,
        name:state.user.displayName,
        status:'open', 
        requested_at:new Date().toISOString(),
        imgs:imgPaths,
        ...requestData
      })
    }
  }
})

export default store