<style>
  .chat-m{
  }
  .chat-m.vendor{
    text-align:left;
  }
  .chat-m.user{
    text-align:right;
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
    <div class="m">{{m.message}}</div>
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
        console.log(this.id)
        window.database.ref(`/requests/${this.id}`).set(this.m)
      }, 4000)
    }
  }
}
</script>

