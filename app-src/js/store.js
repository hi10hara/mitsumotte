import Vue from 'vue'
import Vuex from 'vuex'
const LOGINFO = 'loginfo'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    version:'1.0.0',
    user:{
      name:'',
      uid:''
    },
    account:'',
    password:'',
    loginMessage:'',
    logined:false,
    logining:false
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
    },
    saveLast(state){
      const linfo = {
        account:state.account,
        password:state.password
      }
      localStorage.setItem(LOGINFO, JSON.stringify(linfo))
    }
  },
  actions:{
    login(store, {account, password}){
      const {state} = store
      state.account = account
      state.password = password
      state.loginMessage = 'ログイン中'
      state.logining = true
      firebase.auth().signInWithEmailAndPassword(account,password)
        .then(logined=>{
          store.commit('saveLast')
          const u = firebase.auth().currentUser
          return u.updateProfile({
            displayName:'Mz Yoshi'
          })
        })
        .then(()=>{
          state.logined = true
        })
        .catch(e=>{
          state.loginMessage = 'ログインできませんでした'
          console.error(e)
        })
        .then(()=>{
          state.logining = false
        })
    }
  }
})

export default store