<template>
    <div>
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../static/img/backbtn.png" alt="">
        </a>
        <span>订单进度</span>
      </header>
      <div class="empty" v-show="getList==false">
        <img src="../../static/img/coupon_null.png" alt="" >
        <p>暂无订单</p>
      </div>
      <div v-show="getList">
        <div class="progressImg">
          <div class="step">
            <div class="stepImg">
              <div class="circle circle1">
                <img :src="img1" alt="">
              </div>
              <div class="across across1"></div>
            </div>
            <p>提交订单</p>
            <p class="j_put">{{params.createdate}}</p>
          </div>
          <div class="step">
            <div class="stepImg">
              <div class="across across21" style="left: 0;"></div>
              <div class="circle circle2">
                <img :src="img2" alt="" >
                <!--<img src="http://st.zbajie.deve/leaseback//mobile/images/refuse.png" alt="" id="firstTrial">-->
              </div>
              <div class="across across22" ></div>
            </div>
            <p>订单审核</p>
            <p v-show="params.status==2" style="color: rgb(186, 94, 50);">评分不足</p>
            <p v-show="params.status2==1" >{{params.updatetime2}}</p>
          </div>
          <div class="step">
            <div class="stepImg">
              <div class="across across31" style="left:0"></div>
              <div class="circle circle3">
                <img :src="img3" alt="" >
              </div>
              <div class="across across32"></div>
            </div>
            <p>订单签约</p>
            <p v-show="params.status3==1">{{params.updatetime3}}</p>
          </div>
          <div class="step">
            <div class="stepImg">
              <div class="across across41" style="left:0"></div>
              <div class="circle circle4">
                <img :src="img4" alt="" >
              </div>
            </div>
            <p>{{money}}</p>
            <p  v-show="params.status==4" >{{params.gmtPaymentFinish}}</p>
          </div>
        </div>
        <ul class="orderDes">
        <li>
          <span>订单编号</span>
          <span>{{params.sn}}</span>
        </li>
        <!--<li>-->
          <!--<span class="one">借款用途</span>-->
          <!--<span>{{params.orderuse}}</span>-->
        <!--</li>-->
        <li>
          <span class="one">订单金额</span>
          <span class="two red j_order_price">{{params.price}}元</span>
        </li>
      </ul>
       </div>
      <div class="footer" v-show="params.status==1 && params.payStatus==1">
        <button class="sign" @click="sign()" >去还款</button>
      </div>
    </div>
</template>
<script>
    export default{
      data(){
        return{
          params:{},
          img1:'',
          img2:'',
          img3:'',
          img4:'',
          getList:'',
          money:'还款'
        }
      },
      mounted(){
        var vm=this;
        vm.$http.get('api/user/order/getOrderProgoress').then(function (res) {
          if(res.data.code==0){
            vm.getList=true;
            vm.params=res.data.data;
            if( vm.params.status==0){
              vm.img1="../../static/img/access.png";
              $('.circle1,.across1').addClass('circleDone');
              if( vm.params.status3 ==5){
                vm.img2="../../static/img/access.png";
                $('.circle2,.across22,.across21').addClass('circleDone');
              }
            }
            if(vm.params.status==1 ){
              vm.img1="../../static/img/access.png";
              $('.circle1,.across1').addClass('circleDone');
              vm.img2="../../static/img/access.png";
              $('.circle2,.across22,.across21').addClass('circleDone');
              if(vm.params.status3==1){
                vm.img3="../../static/img/access.png";
                $('.circle3,.across32,.across31').addClass('circleDone');
              }
              if(vm.params.payStatus=='1'){
                vm.money='还款中'
              }
              else if(vm.params.payStatus=='0'){
                vm.money='打款中'
              }
            }
            if(vm.params.status==2 ){
              vm.img1="../../static/img/access.png";
              $('.circle1,.across1').addClass('circleDone');
              vm.img2="../../static/img/refuse.png";
              $('.circle2,.across22,.across21').addClass('circleDone');
            }
            if(vm.params.status==3){
              vm.img1="../../static/img/access.png";
              $('.circle1,.across1').addClass('circleDone');
              vm.img2="../../static/img/access.png";
              $('.circle2,.across22,.across21').addClass('circleDone');
              vm.img3="../../static/img/access.png";
              $('.circle3,.across32,.across31').addClass('circleDone');
              vm.money='还款中'
            }
            if(vm.params.status==4){
              vm.img1="../../static/img/access.png";
              $('.circle1,.across1').addClass('circleDone');
              vm.img2="../../static/img/access.png";
              $('.circle2,.across22,.across21').addClass('circleDone');
              vm.img3="../../static/img/access.png";
              $('.circle3,.across32,.across31').addClass('circleDone');
              vm.img4="../../static/img/access.png";
              $('.circle4,.across41').addClass('circleDone');
              vm.money='还款完成'
            }
          }
          else if(res.data.code==10508){
            vm.getList=false;
          }
        })
      },
      methods:{
      sign(){
        this.$router.push({path:'/billList'});
      }
    }
    }
</script>
<style>
  .empty{
    text-align: center;
    margin-top: 50px;
  }
  .empty img{
    width: 100px;
  }
  .progressImg {
    height: 150px;
    padding: 0 5px;
    margin: 15px;
    background: url(../../static/img/progress.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .progressImg .step {
    width: 25%;
    margin-top: 48px;
    float: left;
    text-align: center;
  }
  .progressImg .step p {
    margin-top: 10px;
    font-size: 12px;
    color: #27052B;
  }
  .stepImg {
    position: relative;
  }
  .circle {
    position: relative;
    display: inline-block;
    width: 25px;
    padding-bottom: 25px;
    background: #fff;
    border-radius: 50%;
    vertical-align: middle;
    box-shadow: inset 0 1px 3px 0 #458264;
  }
  .across {
    position: absolute;
    width: 45%;
    top: 40%;
    left: 57%;
    height: 5px;
    background: #fff;
    z-index: 10;
  }
  .orderDes li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 15px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .orderDes li span{
    font-size: 14px;
    color: #646464;
  }
  .circleDone{
    background: #000;
  }
  .circle img{
    position: absolute;
    left: 5px;
    top: 7px;
    width: 15px;
    z-index: 20;
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
    line-height: 40px; }
</style>
