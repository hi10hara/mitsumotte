import Vue from 'vue'
import Vuex from 'vuex'
const LOGINFO = 'loginfo'
window.database = firebase.database()
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    version:'1.0.0',
    user:{
      displayName:'',
      uid:''
    },
    requests:[],
    myReqs:{},
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
          state.user = u
          state.logined = true
          return store.dispatch('getMyRequests')
        })
        .catch(e=>{
          state.loginMessage = 'ログインできませんでした'
        })
        .then(()=>{
          state.logining = false
        })
    },
    async getMyRequests(store){
      const {state} = store
      const userDataRef = window.database.ref(`/userdata/${state.user.uid}`)
      userDataRef.on('value', sn=>{
        const v = sn.val()
        if(!v){
          return
        }
        state.requests = v
        state.requests.forEach(r=>{
          const rRef = window.database.ref(`/requests/${r}`)
          rRef.on('value', (reqSn)=>{
            store.dispatch('updateRequest', reqSn)
          })
        })
      })
    },
    async updateRequest(store, snapshot){
      const {state:{myReqs}} = store
      const {key} = snapshot
      const value = snapshot.val()
      if(!value){
        return
      }
      Vue.set(myReqs, key, value)
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
      const requests = window.database.ref(`requests/${requestData.category}`)
      const pushKey = requests.push({
        applying:0,
        name:state.user.displayName,
        status:'open', 
        requested_at:new Date().toISOString(),
        imgs:imgPaths,
        ...requestData
      }).key
      const requestPath = `${requestData.category}/${pushKey}`
      store.dispatch('appendMyRequest', requestPath)
      firebase.database().ref(`requests/` + requestPath).on('value', sn=>{
        store.dispatch('updateRequest', sn)
      })

    },
    appendMyRequest(store, key){
      store.state.requests.push(key)
      window.database.ref(`/userdata/${store.state.user.uid}`).set(store.state.requests)
    },
    sendChatMessage(store, {path,data}){
      window.database.ref(`/requests/${path}`).push(data)
    }
  }
})

export default store