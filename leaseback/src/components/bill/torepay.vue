<template>
    <div>
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>收银台</span>
      </header>
      <div class="scrollmain">
      <ul class="pay">
        <li>
          <span>支付类型</span>
          <span>张振订单支付</span>
        </li>
        <li>
          <span>支付金额</span>
          <span>600:00元</span>
        </li>
      </ul>
      <div class="remark">
        备注说明：<input type="text" placeholder="请在此填写您的备注信息">
      </div>
      <p>选择付款方式</p>
      <div class="way">
        <span> <img src="../../../static/img/zhifubao.png" alt=""> 支付宝</span>
        <img src="../../../static/img/_yes.png" alt="">
      </div>
      <div class="money">
        <p>金额</p>
        <button>去支付</button>
      </div>
</div>

    </div>
</template>
<script>
    export default{
        props: []
    }
</script>
<style scoped>
  p{
    margin: 10px 15px;
  }
  .pay li, .way{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
  }
  .way img{
    width: 20px;
  }
  .remark{
    margin: 10px 15px;
  }
  .money{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .money button{
    width: 50px;
    height: 40px;
    margin-top: 10px;
    border-radius: 3px;
    margin-right: 15px;
    border: 1px solid #fe7287;
    background: #fe7287;
  }
</style>
