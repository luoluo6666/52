<template>
    <div class="personal">
      <header class="fixheader">
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>订单确认</span>
      </header>
      <div class="scrollmain">
      <div class="confirmbg mainContent">
        <p>{{phoneInfo.deviceType}} {{phoneInfo.deviceSize}}</p>
        <p style="font-size: 25px">￥{{Money}}</p>
      </div>
      <div class="confirmTitle">
        <div class="hesitate">
          <p class="hesitateTitle">犹豫期</p>
          <p>{{params.stagee}}天</p>
        </div>
        <div class="franchise">
          <p class="hesitateTitle">免赔服务
            <img src="../../../static/img/question.png" @click="Myself">
          </p>
          <p class="j-p-allensure">{{params.freeServiceCharge}}</p>
        </div>
      </div>
      <div class="orderInfo">
        <ul>
          <li>
            <span>姓名：</span>
            <span>{{params.userName}}</span>
          </li>
          <li>
            <span>身份证号：</span>
            <span>{{params.idCard}}</span>
          </li>
          <li>
            <span>手机号：</span>
            <span>{{params.phone}}</span>
          </li>
          <li>
            <span>银行卡号：</span>
            <span>{{params.bankNumber}}</span>
          </li>
          <li>
            <span>所属银行：</span>
            <span>{{params.bankName}}</span>
          </li>
        </ul>
        <div class="footer" style="margin-top: 30px">
          <button @click="commit" :disabled="disabled">确认提交<spinner type="crescent" style="position: relative;top: -2px;fill:#fff;stroke:#fff" v-show="disabled"></spinner></button>
        </div>
      </div>
<!--全服务保障弹窗-->
      <transition name="fade">
        <div class="dialog-wrap" v-show="isShow">

          <div class="dialog-cover"  v-show="isShow" @click="closeMyself"></div>

          <transition name="drop">
            <div class="dialog-content"  v-show="isShow">
              <p class="dialog-close" @click="closeMyself">x</p>
              <div class="explain">全保障说明</div>
              <img src="../../../static/img/safe.png" alt="">
              <ul>
                <li>
                  <span>背屏保险</span>
                  <span>￥{{ 0.25*100*params.freeServiceCharge/100}}元</span>
                </li>
                <li>
                  <span>碎屏保险</span>
                  <span>￥{{0.15*100*params.freeServiceCharge/100}}元</span>
                </li>
                <li>
                  <span>意外保险</span>
                  <span>￥{{0.25*100*params.freeServiceCharge/100}}元</span>
                </li>
                <li>
                  <span>全保险</span>
                  <span>￥{{0.35*100*params.freeServiceCharge/100}}元</span>
                </li>
              </ul>
              <slot></slot>
            </div>
          </transition>
        </div>
      </transition>
      </div>
</div>
</template>
<script>
//  import dialog from '@/components/dialog';
    export default{
      props: {

      },
      data () {
        return {
          params:{},
          isShow:false,
          Money:"",
          datas:{},
          phoneInfo:{},
          disabled:false
        }

      },
      methods: {
        Myself(){
          this.isShow=true;
        },
        closeMyself () {
          this.isShow=false;
          this.$emit('on-close')
        },
        commit(){
          this.disabled=true;
          this.datas.stages=this.params.stagee;
          this.datas.borrowMoney=this.Money;
          this.datas.bankNumber=this.params.bankId;
          this.datas.fromBorrow= this.fromBorrow;
          this.$http.post('../api/user/order/creation',this.datas).then(function (res) {
            if (res.data.code == 0) {
              var sn=res.data.data;
              this.$router.push({path:'/order/finish',query:{ordersn:sn}})
            }
            else{
              this.disabled=false;
              if(res.data.msg){
                this.$toast(res.data.msg);
              }
              else{
                this.$toast("啊哦,断网了，请稍后再试");
              }
            }
          },function(res){
            this.$toast('啊哦,断网了，请稍后再试');
          })

        }
      },
      created(){
        const vm = this;
        vm.phoneInfo=JSON.parse(localStorage.getItem("phoneInfo"));
        var routerParams = this.$route.params.money;
        vm.Money=routerParams;
        if(!routerParams){
          vm.fromBorrow=false;
          vm.datas=JSON.parse(localStorage.getItem("queryParam"));
        }
        else{
          vm.fromBorrow=true;
        }
        vm.$http.post('../api/sell/application',{borrowMoney: vm.Money}).then(function (res) {
          if(res.data.code==0){
            vm.params=res.data.data
          }
          else{
            vm.$toast(res.data.msg)
          }
        })

      }
    }

</script>
<style scoped>
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .4s ease;
  }
  .confirmbg{
    background: url(../../../static/img/confirm.png);
    background-size: 100% 100%;
    padding: 15px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .confirmbg p{
    margin: 10px;
  }
  .confirmTitle {
    overflow: hidden;
    background: #fff;
  }
  .hesitate {
    float: left;
    margin: 15px 0;
    width: 50%;
    border-right: 1px solid #ccc;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #222;
  }
  .hesitateTitle {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: normal;
  }
  .franchise {
    float: left;
    margin: 15px 0;
    width: 49%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #222;
  }
  .franchise img {
    width: 15px;
  }
  .orderInfo {
    padding: 10px 0 0 0;
    background: #f0f0f0;
  }
  .orderInfo ul {
    background: #fff;
    padding: 0 15px;
    overflow: hidden;
  }
  .orderInfo ul li {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #cccccc;
    font-size: 15px;
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
  .drop-enter-active {
    transition: all 1s ease;
  }
  .drop-leave-active {
    transition: all 1s ease;
  }
  .drop-enter {
    transform: translateY(1000px);
  }
  .drop-leave-active {
    transform: translateY(1000px);
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .explain{
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  .dialog-content {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-bottom: 100px;
    overflow: auto;
    background: #fff;
    z-index: 100;
  }
  .dialog-content li{
    background: url(../../../static/img/icon_shield.png) left center no-repeat;
    background-size: 19px 20px;
    padding: 15px 30px;
    margin: 0 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
  }
  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
