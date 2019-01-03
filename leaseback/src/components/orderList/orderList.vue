<template>
    <div>
      <div class="fixheader">
      <header >
        <router-link to="/home">
          <img src="../../../static/img/backbtn.png" alt="">
        </router-link>
        <span>订单列表</span>
      </header>
      <div class="orderList">
        <ul class="order">
          <li>
            <router-link to="/orderList/check">审核中</router-link>
          </li>
          <li>
            <router-link to="/orderList/failed">审核失败</router-link>
          </li>
          <li>
            <router-link to="/orderList/success">审核成功</router-link>
          </li>

        </ul>
      </div>
      </div>
      <router-view></router-view>
    </div>

</template>
<script>

    export default{
//      data() {
//        return {
//          items: helpDatas
//        }
//      }
    }
</script>
<style scoped>
  .order li a{
    font-size: 15px;
    padding-bottom: 10px;
  }
  .router-link-active{
    display: inline-block;
    height: 30px;
    border-bottom:2px solid #2ec5a6;
    color:#2ec5a6

  }
  .orderList{
    background: #eee;
    overflow: hidden;
  }
  .order{
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
  }
  .order li{
    padding-top: 15px;
  }
</style>
