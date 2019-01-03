<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import Loading from './components/Loading.vue'
    function getUrlParam(key) {
      var reg = new RegExp(key + '=([^&]*)');
      var results = location.href.match(reg);
      return results ? results[1] : null;
    }
    var token = getUrlParam("token");
    if(token==null){
//        this.$toast('未获取到用户信息')
    }
    else{
      localStorage.setItem("token", token);
    }
    export default{
      name:'app',
      data(){
        return{
          isRouterAlive:true
        }
      },
      provide(){
        return{
          reload:this.reload
        }
      },
      methods:{
        reload(){
          this.isRouterAlive=false;
          this.$nextTick(function () {
            this.isRouterAlive=true;
          })
        }
      }
//      created() {
//        document.body.removeChild(document.getElementById('sk-wave'))
//      }


    }


</script>



