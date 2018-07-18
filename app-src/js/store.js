import Vue from 'vue'
import Vuex from 'vuex'
import visionRequest from './vision-request.js'
import translateRequest from './translate-request.js'
const LOGINFO = 'loginfo'
window.database = firebase.database()
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
<<<<<<< HEAD
    version:'1.2.1',
=======
    version:'1.3.0',
>>>>>>> 955fecf8b267cc15b2d37a1087592afc98b87f4d
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
    filterTextJa:[],
    filterTextEn:[],
    storedImage:null,
    scanning:false,
    showVisionResult:false,
    deal:{
      path:'',
      price:''
    }
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
<<<<<<< HEAD
      state.filterTexts = []
    },
    cleaResult(state){
=======
      state.filterTextJa = []
      state.filterTextEn = []
    },
    unsetDeal(state){
      state.deal = {
        path:'',
        price:0
      }
    },
    setDeal(state, {path,price}){
      state.deal.price = price
      state.deal.path = path
    },
    hideResult(state){
>>>>>>> 955fecf8b267cc15b2d37a1087592afc98b87f4d
      state.showVisionResult = false
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
      const array = labelAnnotations.map(r=>r.description)
      const arrayJa = await Promise.all(array.map(s=>translateRequest(s)))
<<<<<<< HEAD
      store.state.filterTexts = arrayJa
      store.state.storedImage = file
      store.state.scanning = false
      store.state.showVisionResult = true
=======
      store.state.filterTextEn = array
      store.state.filterTextJa = arrayJa
      store.state.storedImage = file
      store.state.scanning = false
      store.state.showVisionResult = true
    },
    beep(){
      document.querySelector('#beep').play()
      navigator.vibrate([300, 50, 100, 20, 100])
    },
    closeDeal(store){
      const {database} = window
      const {state:{deal}} = store
      database.ref(`/requests/${deal.path}/status`)
        .set('closed')
      deal.price = 0
      deal.path = ''
>>>>>>> 955fecf8b267cc15b2d37a1087592afc98b87f4d
    }
  },
  getters:{
    filteredCategories(state){
      const {filterTextJa:fts} = state
      if(!fts.length){
        return state.categories
      }
      return state.categories.filter(c=>{
        return (c.keywords || []).some(k=> fts.includes(k))
      })
    },
    unreads(state){
      return Object.keys(state.myReqs).reduce((t, rk)=>{
        const r = state.myReqs[rk]
        if(!r.chat){
          return 0
        }
        t += Object.keys(r.chat).reduce((ct,company)=>{
          const chat = r.chat[company]
          ct += Object.keys(chat).reduce((cct, mkey)=>{
            const m = chat[mkey]
            cct += m.user ? 0 : 1
            return cct
          },0)
          return ct
        }, 0)
        return t
      },0)
    }
  }
})
store.watch((state, getters)=>{
  return getters.unreads
},(v, ov)=>{
  if(v > ov){
    store.dispatch('beep')
  }
},{
  deep:true
})

export default store