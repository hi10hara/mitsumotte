import Vue from 'vue'
import Root from '../vue/root.vue'
/*globals Hammer, Vue*/
const app = {
  // Application Constructor
  initialize: function() {
    if(typeof cordova === 'object'){
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }else{
      window.addEventListener('load', this.onDeviceReady.bind(this), false);
    }
  },
  onDeviceReady: function() {
      this.receivedEvent('deviceready');
  },
  receivedEvent: function(id) {
    startVue()
  }
}

app.initialize();

function startVue(){
  new Vue({
    el:'#app',
    render(createElement){
      return createElement(Root)
    }
  })
}