<template>
  <div>
    <header>
      <span>支付失败</span>
    </header>
    <div class="pay">
      <img src="../../../static/img/payfail.png" alt="">
    </div>

    <div class="message">
      <p>支付失败</p>
      <button @click="toPayindex" class="topay">查看账单</button>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
      }
      },
      methods:{
        toPayindex (){
          this.$router.push({name:"billList"})
        }
      }

  }
</script>
<style>
  .pay{
    margin: 20px auto;
    width: 50px;
    height: 50px;
    text-align: center;
  }
  .pay img{
    width: 100%;
  }
  .message{
    text-align: center;
  }
  .topay{
    width: 80%;
    border: none;
    outline: none;
    font-size: 17px;
    color: #FFFFFF;
    background: #2EC5A6;
    border-radius: 10px;
    line-height: 35px;
    box-shadow: 0px 6px 10px #ffdbe0;
    margin-top: 20px;
  }
</style>
