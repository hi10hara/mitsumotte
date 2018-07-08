<style>
  .chat-m{

  }
  .chat-m.vender{

  }
  .chat-m.user{
    
  }
</style>
<template>
  <div class="chat-m" :class="m.from">
    {{m.text}}
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
    }
  }
}
</script>

