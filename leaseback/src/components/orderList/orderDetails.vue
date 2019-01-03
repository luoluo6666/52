<template>
  <div >
    <header class="fixheader" >
      <a href="javascript:history.go(-1);">
        <img src="../../../static/img/backbtn.png" alt="">
      </a>
      <span>订单详情</span>
    </header>
    <div class="scrollmain">
      <ul class="mainContent">
        <li>
          <span>订单编号</span>
          <span class="orderSn">{{params.sn}}</span>
        </li>
        <li>
          <div>
            <span>订单状态</span>
            <p class="tip">{{fail}}</p>
          </div>
          <span style="color: #ffb707">{{content}}</span>
        </li>
        <li>
          <span>订单金额</span>
          <span><b>{{params.price}}元</b></span>
        </li>
      </ul>
      <div class="title">
        <span> 订单进度:</span>
        <div class="orderStep">
          <div class="step">
            <span class="time">{{params.creatadate}}</span>
            <div class="progressName" ><div class="orderCircle step1"></div> 提交订单 </div>
          </div>
          <div class="step first">
            <span class="time"> {{params.reviewTime}}</span>
            <div class="progressName" >
              <div class="string"></div>
              <div class="orderCircle step2"></div> 订单审核</div>
          </div>
          <div class="step">
            <span class="time"> {{params.finshTimeNew}}</span>
            <div class="progressName" >
              <div class="string"></div>
              <div class="orderCircle step4"></div> {{result}}
            </div>
          </div>
          <div class="step test">
            <span class="time"> {{params.signTime='null'? '':params.signTime}}</span>
            <div class="progressName" >
              <div class="string"></div>
              <div class="orderCircle step3"></div> 订单签约
            </div>
          </div>
          <div  class="step" v-show="show">
            <span class="time"> {{finish}}</span>
            <div class="progressName" >
              <div class="string"></div>
              <div class="orderCircle step5"></div> {{repayment}}
            </div>
          </div>
        </div>
      </div>
      <div class="title" style="border-top: 10px solid #eee">
        用户信息
      </div>
      <ul>
        <li>
          <span>姓名</span>
          <span>{{params.username}}</span>
        </li>
        <li>
          <span>手机号</span>
          <span>{{params.phone}}</span>
        </li>
      </ul>
      <div class="footer" style="padding: 15px" v-show="params.flag==1 && params.payStatus==1">
        <button  @click="sign()" >去还款</button>
      </div>
      <div class="footer" style="padding:30px 15px" v-show="bth">
        <button class="j-borrow-submit" @click="imgshow = true">
          点击前往推荐平台取钱
        </button>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="imgshow" class="dialog-demo">
          <div class="img-box">
            <img :src="platformImageAddr" style="max-width:100%" @click="jump()">
          </div>
          <div @click="imgshow = false">
            <span class="vux-close" style="font-size: 30px;">×</span>
          </div>
        </x-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import { XDialog,TransferDomDirective as TransferDom} from 'vux'
  export default{
    data(){
      return{
        params:{},
        content:'',
        fail:'',
        result:'审核通过',
        repayment:'',
        lastTime:'',
        show:false,
        finish:'',
        platformImageAddr:'',
        platformLink:'',
        imgshow:false,
        platformId:'',
        bth:false
      }
    },
    directives: {
      TransferDom
    },
    components: {
      XDialog
    },
    methods:{
      jump(){
        var fd = new FormData()
        fd.append('platformId', this.platformId)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post('api/user/order/insertPlatformRecord',fd,config).then(function (res) {
          if(res.data.code ===0){
            this.$router.push({path:'/orderList/link',query:{href:this.platformLink}});
          }
        })
      },
      hmd(){
        this.$http.post('api/user/order/getImportPlatform').then(function (res) {
          if(res.data.code === 0){
            this.platformImageAddr = res.data.data.platformImageAddr
            this.platformLink = res.data.data.platformLink
            this.platformId = res.data.data.platformId
            this.imgshow = true
            this.bth = true
          } else if(res.data.code === 104){
            this.bth = false
          }
        })
      },
      sign(){
        this.$router.push({path:'/billList'});
      }
    },
    mounted(){
      const vm = this;
      console.log(this.$route.query.id);
      vm.id=vm.$route.query.id;
      vm.$http.post('../api/user/order/detail',{"saleid":vm.id}).then(function (res) {
        if(res.data.code==0){
          vm.params=res.data.data;
          if(vm.params.flag==0){
            if(vm.params.firstInstanceStatus==6 || vm.params.secondInstanceStatus !=5){
              vm.content="审核中"
            }
            else{
              if(vm.params.secondInstanceStatus==5){
                vm.content="合同待签约"
              }
              if(vm.params.thirdInstanceStatus==3){
                vm.content="图片资料审核驳回"
              }
            }
          }
          if(vm.params.flag==1){
            vm.content="审核通过"
          }
          if(vm.params.flag==2){
            vm.content="审核失败";
            vm.fail="评分不足"
            this.hmd()
          }
          if(vm.params.flag==3){
            vm.content="还款中"
          }
          if(vm.params.flag==4){
            vm.content="还款完成"
          }
          if(vm.params.flag==5){
            vm.content="订单废弃"
          }
          if(vm.params.flag==6){
            vm.content="订单驳回"
          }
          if(vm.params.flag==7){
            vm.content="未完成订单首付"
          }
//判断订单进度
          if(vm.params.flag==0){
            if(vm.params.firstInstanceStatus==6){
              $(".step1").addClass('do')
            }
            if(vm.params.firstInstanceStatus!=6 && vm.params.firstInstanceStatus!=1){
              $(".step1").addClass('do');
              $(".step2").addClass('doing')
            }
            if(vm.params.secondInstanceStatus==5){
              $(".step1").addClass('do');
              $(".step2").addClass('do');
              $(".step4").addClass('do');
              $(".step3").addClass('doing')
            }
          }
          if(vm.params.flag==1){
            $(".step1").addClass('do');
            $(".step2").addClass('do');
            $(".step3").addClass('do');
            $(".step4").addClass('do');
            $(".step5").addClass('doing');
            vm.show=true;
            if(vm.params.payStatus=="1"){
              vm.repayment="待还款";
            }
            else{
              vm.repayment="打款中";
            }
          }
          if( vm.params.flag==3){
            $(".step1").addClass('do');
            $(".step2").addClass('do');
            $(".step3").addClass('do');
            $(".step4").addClass('do');
            $(".step5").addClass('doing');
            vm.repayment="还款中";
            vm.show=true;
          }
          if(vm.params.flag==2){
            $(".step1").addClass('do');
            $(".first").addClass('hide');
            $(".test").addClass('hide');
            $(".step4").addClass('fail');
            $(".step5").addClass('hide');
            vm.show=false;
            vm.result='审核失败';
            vm.lastTime=vm.params.gmtPaymentFinish
          }
          if(vm.params.flag==4){
            $(".step1").addClass('do');
            $(".step2").addClass('do');
            $(".step3").addClass('do');
            $(".step4").addClass('do');
            vm.show=true;
            vm.repayment="还款完成";
            vm.finish=vm.params.gmtPaymentFinish;
            $(".step5").addClass('do');

          }
          if(vm.params.flag==5){
            vm.result='订单取消'
          }
        }
      })
    },
  }
</script>
<style scoped>
  li{
    display: flex;
    justify-content: space-between;
    padding: 15px 5px;
    margin: 0 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #646464;
  }
  li span b{
    color: #f5687d;
    font-weight: normal;
  }
  .title{
    padding: 15px;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  .title img{
    width: 22px;
    vertical-align: bottom;
  }
  .orderStep{
    padding: 10px 10px 0;;
  }
  .orderCircle{
    display: inline-block;
    vertical-align: middle;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #bfbfbf;
  }
  .step{
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    position: relative;
    font-size: 14px;
    color: #646464;
  }
  .string{
    position: absolute;
    top: -14px;
    right: 75px;
    height: 31px;
    width: 2px;
    background: #eee;
    z-index: -7;
  }
  .doing{
    background: #2ec5a6;
  }
  .hide{
    display: none;
  }
  .do{
    height: 18px;
    width: 18px;
    background: url(../../../static/img/_yes01.png) no-repeat;
    background-size: cover;
  }
  .fail{
    height: 18px;
    width: 18px;
    background: #fff url(../../../static/img/fail_icon.png) no-repeat;
    background-size: cover;
  }
  .time{
    float: right;
    margin-right: 15px;
    margin-top: 2px;
    font-size: 13px;
  }
  .tip{
    margin-top: 5px;
    font-size: 12px;
    color: #feb853;
  }
  .orderSn{
    color: #000;
  }
  .footer button {
    width: 100%;
    border: none;
    outline: none;
    font-size: 17px;
    color: #FFFFFF;
    background: #2EC5A6;
    border-radius: 4px;
    line-height: 45px;
  }
  .progressName{
    width: 85px;
  }
</style>
