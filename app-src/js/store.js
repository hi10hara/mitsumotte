import Vue from 'vue'
import Vuex from 'vuex'
import visionRequest from './vision-request.js'
const LOGINFO = 'loginfo'
const FILTER_TIMEOUT = 30000
window.database = firebase.database()
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    version:'1.1.1',
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
    requestMessage:'',
    categories:[],
    filterTexts:[],
    storedImage:null,
    scanning:false
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
    },
    setCategories(state, categories){
      state.categories = categories
    },
    eraseStoredImage(state){
      state.storedImage = null
    },
    eraseFilter(state){
      state.filterTexts = []
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
        .then(async ()=>{
          const u = firebase.auth().currentUser
          state.user = u
          state.logined = true
          await store.dispatch('initDatabase')
          await store.dispatch('getMyRequests')
        })
        .catch(e=>{
          state.loginMessage = 'ログインできませんでした'
        })
        .then(()=>{
          state.logining = false
        })
    },
    async initDatabase(store){
      const database = window.database
      const cateRef = database.ref('categories')
      return new Promise(resolve=>{
        cateRef.on('value', v=>{
          store.commit('setCategories',v.val())
          resolve()
        })
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
    },
    async takeDirectPhoto(store, file){
      store.state.scanning = true
      const resultJson = await visionRequest(file)
      const {responses:[{labelAnnotations}]} = resultJson
      console.log(labelAnnotations)
      const array = labelAnnotations.map(r=>r.description)
      store.state.filterTexts = array
      setTimeout(()=>{
        store.commit('eraseFilter')
      }, FILTER_TIMEOUT)
      store.state.storedImage = file
      store.state.scanning = false
    }
  },
  getters:{
    filteredCategories(state){
      const {filterTexts:fts} = state
      if(!fts.length){
        return state.categories
      }
      return state.categories.filter(c=>{
        return (c.keywords || []).some(k=> fts.includes(k))
      })
    }
  }
})

export default store