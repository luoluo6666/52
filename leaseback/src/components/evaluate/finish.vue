<template>
    <div>
      <header>
        <span>订单提交成功</span>
      </header>
      <div class="title">
        <div class="step">
          <img src="../../../static/img/making_done.png" alt="">
          <p>1.订单申请</p>
        </div>
        <div class="string"></div>
        <div class="step">
          <img src="../../../static/img/making_icon03.png" alt="">
          <p>2.等待审核</p>
        </div>
      </div>
      <div class="success">
        <p class="order"><img src="../../../static/img/_yes.png" alt="">您的订单已创建成功</p>
        <p>我们将在第一时间进行订单审核、审核通过后，进行订单签约放款</p>
      </div>
      <div class="footer" style="margin-top: 30px">
        <button @click="check">
          查看订单
        </button>
      </div>
    </div>
</template>
<script>
    export default{
        methods:{
          check(){
            this.$router.push({path:"/orderList"})
          }
        }
    }
</script>
<style scoped>
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2ec5a6;
    padding:30px;
  }
  .string{
    width: 70px;
    height: 2px;
    background: #FFF;
  }
  .step{
    text-align: center;
  }
  .step img{
    width: 30px;
  }
  .step p{
    font-size: 14px;
    margin-top: 5px;
    color: #fff;
  }
  .success{
    padding: 30px 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #666;
  }
  .success .order{
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
  }
  .order img{
    width: 20px;
    vertical-align: sub;
    margin-right: 5px;
  }
  .footer {
    text-align: center;
    padding: 15px 12px; }
  .footer button {
    width: 100%;
    border: none;
    outline: none;
    font-size: 17px;
    color: #FFFFFF;
    background: #2EC5A6;
    border-radius: 4px;
    line-height: 45px; }
</style>
