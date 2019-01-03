<template>
  <div>
    <header>
      <span>支付成功</span>
    </header>
    <div class="pay">
      <img src="../../../static/img/paySuccess.png" alt="">

    </div>
    <div class="message">
      <p>支付成功</p>
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
  border: 2px solid #2EC5A6;
  border-radius: 50%;
  height: 50px;
  text-align: center;
}
  .pay img{
    width: 80%;
    margin-top: 10px;
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
