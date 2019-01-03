<template>
    <div style="height: 100%;">
      <header class="fixheader" >
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>订单详情</span>
      </header>
      <div class="iframe">
        <iframe :src="href" frameborder="0"></iframe>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            href:''
          }
        },
        mounted(){
                if(this.$route.query.href.indexOf("http://") !== -1 || this.$route.query.href.indexOf("https://")!== -1){
                   this.href = this.$route.query.href
                } else {
                  this.href = "http://" +  this.$route.query.href
                }
        }
    }
</script>

<style scoped>
 .iframe{
   width: 100%;
   height: 100%;
   padding-top: 42px;
 }
  .iframe iframe{
    width: 100%;
    height: 100%;
  }
</style>
