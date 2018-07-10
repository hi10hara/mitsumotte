<style>
  .chat-m{
  }
  .chat-m.vendor{
    text-align:left;
    color:rgb(30,100,1);
  }
  .chat-m.user{
    text-align:right;
    color:rgb(100,0,1);
  }
  .m>.arrow{
    position:absolute;
    height:5px;
    bottom:-10px;
  }
  .vendor>.m>.arrow{
    left:0;
    border-left:solid 10px rgb(233,233,233);
    border-bottom:solid 10px transparent;
  }
  .user>.m>.arrow{
    right:0;
    border-right:solid 10px rgb(233,233,233);
    border-bottom:0;
    border-bottom:solid 10px transparent;
  }
  .chat-m>.m{
    white-space: pre-wrap;
    display:inline-block;
    padding:5px 10px;
    box-shadow:0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    border-radius:2px;
    background-color:white;
    margin:10px;
    width:auto;
    position:relative;
  }
  .chat-m>.at{
    font-size:15px;
    color:gray;
    margin-left:20px;
  }
</style>
<template>
  <div ref="m" class="chat-m" :class="m.from">
    <div class="at">{{m.at | formatDatetime}}</div>
    <div class="m">{{m.message}}<div class="arrow"/></div>
  </div>
</template>
<script>
export default {
  props:{
    m:{
      type:Object,
      default(){
        return {}
      }
    },
    type:{
      type:String,
    },
    id:{
      type:String,
      default:''
    }
  },
  mounted(){
    const {m} = this.$refs
    m.scrollIntoView()
    const type = this.m[this.type]
    if(!type){
      setTimeout(()=>{
        this.m[this.type] = true
        window.database.ref(`/requests/${this.id}`).set(this.m)
      }, 4000)
    }
  }
}
</script>

