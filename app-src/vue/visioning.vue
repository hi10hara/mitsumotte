<style>
.scan-enter-active, .scan-leave-active{
  transition:opacity .3s ease;
  opacity:1;
}
.scan-enter, .scan-leave-to{
  opacity:0;
}
.visioning{
  top:0;
  left:0;
  height:100%;
  width:100%;
  position:fixed;
  z-index:10000;
  padding-top:20%;
  font-size:12vw;
  font-weight:bold;
  color:white;
  background-color:rgba(20,20,20, 0.8);
}
.loader,
.loader:before,
.loader:after {
  background: #ffffff;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #ffffff;
  margin: 88px auto;
  position: relative;
  font-size: 25px;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}

@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

</style>
<template>
  <transition name="scan">
  <div class="visioning" v-if="$store.state.scanning">
    Scanning....
    <div class="loader"></div>
  </div>
  </transition>
</template>

