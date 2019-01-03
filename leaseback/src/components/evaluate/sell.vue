<template>
    <div>
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>申请出售</span>
      </header>
      <div class="scrollmain">
      <div class="priceMain">
        <p class="phoneType">手机型号：{{datas.deviceType}} {{datas.deviceSize}} </p>
        <p class="phonePrice">恭喜！您的手机估价：</p>
        <p class="money">￥{{params.assessPriceAbout}}元</p>
      </div>
      <ul class="serviceNotes">
        <li>
          <img src="../../../static/img/notes.png" style="width: 18px">
          <span class="service">服务须知</span>
        </li>
        <li>
          <div>
            <span class="service">犹豫期</span>
            <div class="switch1">
              <img src="../../../static/img/button.png" >
            </div>
          </div>
          <p class="detail1" id="show1">您可以在犹豫期使用您的手机，期限为7天，第7天您可以
            考虑是否出售自己的手机，如果第7天选择赎回，您只需要支付手机评估价1.25%的赎金</p>
        </li>
        <li>
          <div>
            <span class="service">赎回手机</span>
            <div class="switch2">
              <img src="../../../static/img/button.png">
            </div>
          </div>
          <p class="detail2" id="show2">您可以赎回您的手机，赎回价格{{params.assessPriceAbout}}元</p>
        </li>

      </ul>
      <div class="back_footer">
        <button @click="gosale">申请出售</button>
      </div>
</div>
    </div>
</template>
<script>
  import {name} from '../../../static/range.js'

    export default{
      data(){
        return{
          datas:{},
          params:{}
        }

      },
        methods:{
          gosale(){
            const vm = this;
            vm.$http.post('../api/user/order/ajaxCheckUserSale').then(function (res) {
              if(res.data.code==0){
                  vm.$router.push({name: 'orderConfirm',params:{money:vm.params.assessPriceAbout}})

              } else if(res.data.code==10303){
                    vm.$toast(res.data.msg);
                    setTimeout(function () {
                      vm.$router.push({path: '/orderList'})
                    }, 1500);
                  } else if(res.data.code==10402){
                      vm.$toast(res.data.msg);
                      setTimeout(function () {
                        vm.$router.push({path: '/'})
                      }, 1500);
              }else if(res.data.code==10401){
                vm.$toast(res.data.msg);
                setTimeout(function () {
                  vm.$router.push({path: '/login'})
                }, 1500);
              }else if(res.data.code==10403){
                vm.$toast(res.data.msg);
                setTimeout(function () {
                  vm.$router.push({path: '/approve'})
                }, 1500);
              }else if(res.data.code==10206){
                vm.$toast(res.data.msg);
                setTimeout(function () {
                  vm.$router.push({path: '/'})
                }, 1500);
              }
              else{
                vm.$toast("服务端异常");
              }

              })
          }
        },
      mounted(){
        name();
        this.datas=JSON.parse(localStorage.getItem("phoneInfo"));
        this.$http.get('../api/sell/assessPriceAbout/7').then(function (res) {
          if(res.data.code==0){
            console.log(res)
            this.params=res.data.data
          }
          else{
            this.$toast("服务端异常")
          }
        })
      }
    }
</script>
<style>
  .priceMain {
    padding: 10px 15px 25px 15px;
    position: relative;
    background: url(../../../static/img/cycleBg.png);
    background-size: 100% 100%;
  }
  .serviceNotes{
    margin: 0;
    width: 100%;
    list-style: none;
    overflow: hidden;
    padding: 0 15px;
  }
  .serviceNotes li {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }
  .serviceNotes img {
    width: 30px;
    vertical-align: middle;
  }
  .serviceNotes .service {
    font-size: 16px;
    color: #222222;
    vertical-align: middle;
  }
  .serviceNotes .switch1,.switch2{
    float: right;
    vertical-align: middle;
  }
  .phoneType {
    margin: 20px 0;
    font-size: 18px;
    color: #fff;
  }
  .phonePrice {
    margin: 25px 0;
    font-size: 20px;
    color: #fff;
  }
  .money{
    font-size: 24px;
    color: #fff;
  }
  .detail1,.detail2{
    margin-top: 10px;
    font-size: 13px;
    color: #666;
    line-height: 20px;
  }
</style>
