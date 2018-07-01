<style>
.login{
  background-image:linear-gradient(top, rgb(252, 189, 30) 0%, #E4E4E4 100%);
  background-image:-webkit-linear-gradient(top, rgb(252, 189, 30)  0%, #E4E4E4 100%);
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  transform-origin:0 0 0;
  z-index:2000;
  text-align:center;
  font-size:5vw;
}
.logo{
	margin-top:15%;
	width:100%;
}
.version{
  text-align:right;
  padding-right:5vw;
  font-size:5vw;
  color:gray;
}
.splash-enter-active, .splash-leave-active{
  transition:all 0.5s ease;
  opacity:1;
  transform:scaleY(1);
}
.splash-enter, .splash-leave-to{
  opacity:0;
  transform:scaleY(0);
}
.login>input{
  text-align:center;
  width:80%;
  font-size:100%;
  padding:10px;
  border-radius:5px;
  border:solid 1px rgb(200,200,200);
  background-color:white;
}
.login>button{
  text-align:center;
  margin-top:30px;
  width:40%;
  padding:10px;
  border-radius:5px;
  border:none;
  box-shadow:0 2px 2px 2px rgb(200,200,200);
  background-color:white;
  border:solid 1px rgb(255, 182, 143);
}
.login-message{
  margin-top:10px;
}
</style>
<template>
  <transition name="splash">
  <div class="login" v-if="!logined">
    <img class="logo" src="../img/logo.png"/>
    <div class="version">Version {{version}}</div>
    <input type="text" :disabled="logining" class="mail" v-model="account" placeholder="アカウント/メールアドレス" @keydown.enter="login">
    <input type="password" :disabled="logining" class="password" v-model="password" placeholder="パスワード" @keydown.enter="login">
    <button @click="login" :disabled="logining">ログイン</button>
    <div class="login-message">{{loginMessage}}</div>
  </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
export default {
  date(){
    return {
      account:'',
      password:''
    }
  },
  computed:mapState([
    'version',
    'logined',
    'logining',
    'loginMessage'
  ]),
  created(){
    this.$store.commit('loadLast')
    this.account = this.$store.state.account
    this.password = this.$store.state.password
  },
  methods:{
    login(){
      if(!this.account || !this.password){
        return
      }
      this.$store.dispatch('login', {
        account:this.account,
        password:this.password
      })
    }
  }
}
</script>

