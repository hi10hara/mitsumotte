const Rate = {
  template:[
    '<div class="rating">',
      '<div class="rate-base" :style="{width:rateWidth}"></div>',
      '<div class="rate-cover">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
        '<img class="star" src="img/star.png">',
      '</div>',
    '</div>'].join(''),
  computed:{
    rateWidth(){
      const r = this.rate
      const p = r / 5 * 100
      return p + '%'
    }
  },
  props:{
    rate:Number
  },
}
/*globals Vue*/
function main(){
  var database = firebase.database()
  var companiesRef = database.ref('/companies/repair-watch/0')
  companiesRef.on('value', companies=>{
    window.rootVm.store = companies.val()
    console.log(rootVm.store)
  })
  window.rootVm = new Vue({
    el:'#app',
    data:{
      editDesc:false,
      store:{
        name:'',
        description:'',
        reputs:[
        ]
      },
      requests:[]
    },
    components:{
      'rate-parts':Rate
    },
    watch:{
      'store.description'(v){

      }
    },
    methods:{

    }
  })
}
main()