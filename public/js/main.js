Vue.filter('dateFormat',(_v)=>{
  const v = new Date(_v)
  return v.toLocaleDateString() + ' ' + v.toLocaleTimeString()
})
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

const Request = {
  template:'#r',
  props:{
    id:String,
    request:Object
  }
}

/*globals Vue*/
const myCompanyName = 'takahashi_tokeiten'
function main(){
  var database = firebase.database()
  var companiesRef = database.ref(`/companies/${myCompanyName}`)
  companiesRef.on('value', companies=>{
    const storeInfo = companies.val()
    window.rootVm.store = storeInfo
    const {category} = storeInfo
    const categoryRef = database.ref(`requests/${category}`)
    categoryRef.on('value', requests=>{
       const reqs = requests.val()
       window.rootVm.requests = reqs
       window.rootVm.requestsLoading = false
    })
  })
  window.rootVm = new Vue({
    el:'#app',
    data:{
      editDesc:false,
      requestsLoading:true,
      store:{
        name:'',
        description:'',
        reputs:[
        ]
      },
      requests:{}
    },
    components:{
      'rate-parts':Rate,
      'mi-request':Request
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