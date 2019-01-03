<template>
  <div class="body" id="paybill">
    <header class="fixheader">
      <a href="javascript:history.go(-1);">
        <img src="../../../static/img/backbtn.png" alt="">
      </a>
      <span>账单还款</span>
    </header>
    <div class="cen">
      <div class="input">
        <span>订单号</span>
        <span>{{this.$route.query.ordersn}}</span>
      </div>
      <div class="input">
        <span>金   额</span>
        <span class="money">{{list.trademoney}}</span>
      </div>
      <div class="x_input">
        <x-input title="银行卡号" placeholder="请输入银行卡号"  v-model="list.bankNumber" text-align="right"></x-input>
        <x-input title="持卡人身份证号" mask="" placeholder="请输入身份证号码"   v-model="list.idcardno" text-align="right"></x-input>
        <x-input title="持卡人真实姓名" placeholder="请输入真实姓名" type="text"  v-model="list.uname" text-align="right"></x-input>
        <x-input title="银行卡预留手机号" placeholder="请输入预留手机号" type="text"  v-model="list.uphone" text-align="right"></x-input>
      </div>
    </div>
    <div class="but">
      <button @click="sub">立即还款</button>
    </div>
    <div class="tck">
      <popup v-model="show" position="bottom" should-scroll-top-on-show>
        <div calss="tck_cen">
          <div class="tck_text">
            <p>预留手机号：{{list.uphone}}</p>
            <p class="text_p">
              <input type="number" placeholder="请输入验证码" v-model="paymsg">
              <button v-if="!yzm" class="yzm" :disabled="timedisabled" @click="timeclick">{{time}}<spinner type="crescent" style="position: relative;top: -2px;fill:#fff;stroke:#fff" v-show="timedisabled"></spinner></button>
              <button v-else class="fs">{{time}}秒</button>
            </p>
            <div class="yzm_but">
              <button class="yzm_sub" :disabled="disabled" @click="pay()">确定支付<spinner type="crescent" style="position: relative;top: -2px;fill:#fff;stroke:#fff" v-show="disabled"></spinner></button>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { XInput ,Popup} from 'vux'
  export default {
    name: "",
    data(){
      return{
        idnum:'',
        show:false,
        yzm:false,
        time:"获取验证码",
        list:"",
        paymsg:'',
        disabled:false,
        timedisabled:false
      }
    },
    components: {
      XInput,
      Popup
    },
    filters: {
      numberFun: function(value){
        let num = Number(value).toFixed(2);
        return num;
      }
    },
    mounted() {
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.$http.post('../api/pay/cashier/PostPayment',
        {
          type:this.$route.query.type,
          remarks:this.$route.query.remarks,
          mb:"mbrepay",
          orderid:this.$route.query.orderid,
          ordersn:this.$route.query.ordersn,
          rid:this.$route.query.rid,
          r_stages:this.$route.query.r_stages,
          sign:this.$route.query.sign
        }).then(function (res) {
          if(res.data.code === 0){
            this.$vux.loading.hide()
            this.list = res.data.data
          }else{
            this.$vux.loading.hide()
            this.$toast(res.data.msg)
          }
      })
    },
    methods: {
      // 获取单号
      billlist(){
        this.$http.post('../api/pay/cashier/PostPayment',
          {
            type:this.$route.query.type,
            remarks:this.$route.query.remarks,
            mb:"mbrepay",
            orderid:this.$route.query.orderid,
            ordersn:this.$route.query.ordersn,
            rid:this.$route.query.rid,
            r_stages:this.$route.query.r_stages,
            sign:this.$route.query.sign
          }).then(function (res) {
          if(res.data.code === 0){
            this.list.tradeno = res.data.data.tradeno
          }
        })
      },
      sub(){
        // 银行验证正则
        // const bank =  /^\d{16}|\d{19}$/
        // const banknum = this.list.cardno.replace(/\s+/g, "")
        //身份证验证正则
        // const idyz =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        // const idnum = this.idnum.replace(/\s+/g, "")
        //手机号正则
        // const phone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
        // const phonenum = this.list.uphone.replace(/\s+/g, "")
          if (!this.list.uname  || this.list.uname===''){
          this.$toast("请输入名字")
        } else if (this.list.uphone === ""){
          this.$toast("请输入手机号")
        } else {
          if(this.$route.query.type ==="helipay"){
            this.hlbddyz()
          } else if(this.$route.query.type ==="yeepay"){
            this.ybddyz()
          }
        }
      },
      pay(){
        if(this.$route.query.type ==="helipay"){
          this.hlbpay()
        } else if(this.$route.query.type ==="yeepay"){
          this.ybpay()
        }
      },
      //hlb订单验证
      hlbddyz(){
        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.$http.post('../api/heliPay/pay',
          {
            orderNo:this.list.tradeno,
            cardno:this.list.bankNumber,
            idcardno:this.list.idcardno,
            idcardPhone:this.list.uphone,
            cardName:this.list.uname
          }).then(function (res) {
          if(res.data.code === 0){
            this.hlbyzm()
          }else{
            // 隐藏
            this.$vux.loading.hide()
            this.billlist()
            this.$toast(res.data.msg)
          }
        })
      },
      //yb订单验证
      ybddyz(){
        // 显示
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.$http.post('../api/yoo/yooPay',
          {
            orderNo:this.list.tradeno,
            cardno:this.list.bankNumber,
            idcardno:this.list.idcardno,
            idcardPhone:this.list.uphone,
            cardName:this.list.uname
          }).then(function (res) {
          if(res.data.code === 0){
            // 隐藏
            this.$vux.loading.hide()
            if(this.time === "获取验证码"){
              this.countDown(60)
            } else {
            }
            this.show = true
          }else{
            // 隐藏
            this.$vux.loading.hide()
            this.billlist()
            this.$toast(res.data.msg)
          }
        })
      },
      //hlb验证码
      hlbyzm(){
        this.$http.post('../api/heliPay/sendCode',{orderNo:this.list.tradeno,idcardPhone:this.list.uphone}).then(function (res) {
          this.timedisabled = false
          if(res.data.code === 0){
            console.log(this.time)
            // 隐藏
            this.$vux.loading.hide()
            if(this.time === "获取验证码" || this.time === "重新获取"){
              this.countDown(60)
            } else {
            }
            this.show = true
          }else{
            // 隐藏
            this.$vux.loading.hide()
            this.billlist()
            this.$toast(res.data.msg)
          }
        })
      },
      //易宝重新发送验证码
      ybagainyzm(){
        this.$http.post('../api/yoo/PayshortRetransmission',{orderNo:this.list.tradeno,idcardPhone:this.list.uphone}).then(function (res) {
          this.timedisabled = false
          if(res.data.code === 0){
            if(this.time === "重新获取"){
              this.countDown(60)
            } else {
            }
          }else{
            this.billlist()
            this.$toast(res.data.msg)
          }
        })
      },
      //点击获取验证码触发事件
      timeclick(){
        this.timedisabled = true
        if(this.$route.query.type ==="helipay"){
              this.hlbyzm()
        } else if(this.$route.query.type ==="yeepay"){
            if(this.time === '重新获取'){
              this.ybagainyzm()
            }
        }
      },
      //验证码倒计时
      countDown (time) {
        this.yzm = true
        this.time = time
        let count = time
        setTimeout(() => {
          count--
          if (time <= 0) {
            this.time = '重新获取'
            this.yzm = false
          } else if (count !== time) {
            this.time =  count
            this.countDown(count)
          }
        }, 1000)
      },
      //合利宝支付
      hlbpay(){
        this.disabled = true
        this.$http.post('../api/heliPay/quickPay',{orderNo:this.list.tradeno,msg:this.paymsg}).then(function (res) {
          if(res.data.code === 0){
            this.disabled = false
            this.$toast(res.data.msg)
            this.$router.push({path:'billlist'});
          }else{
            this.disabled = false
            this.$toast(res.data.msg)
            this.billlist()
          }
        })
      },
      //易宝支付
      ybpay(){
        this.disabled = true
        this.$http.post('../api/yoo/payConfirm',{orderNo:this.list.tradeno,msg:this.paymsg}).then(function (res) {
          if(res.data.code === 0){
            this.disabled = false
            this.$toast(res.data.msg)
            this.$router.push({path:'billlist'});
          }else{
            this.disabled = false
            this.$toast(res.data.msg)
            this.billlist()
          }
        })
      },
      jumpto(){
        this.$router.push({name:'pay',params:{rid:this.$route.params.rid,ordersn:this.$route.params.ordersn}});
      }
    }
  }
</script>
<style>
  #paybill .weui-cell:before{
    left: 0;
  }
  #paybill .vux-popup-dialog{
    background: none;
  }
</style>
<style scoped>
  .body{
    height: 100%;
    padding-top: 42px;
    background:#eeeeee;
  }
  .cen{
    margin: 10px 0px;
    background: #fff;
  }
  .input{
    padding: 10px 15px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ebebeb;
  }
  .input .money{
    color: #2ec5a6;
  }
  .but{
    margin-top: 35px;
    padding: 0px 15px;
  }
  .but button{
    background: #2ec5a6;
    color: #fff;
    font-size: 16px;
    width: 100%;
    padding: 10px 0px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .tck_text{
    background: #fff;
    padding-left: 20px;
    -webkit-border-radius: 15px 15px 0px 0px ;
    -moz-border-radius: 15px 15px 0px 0px ;
    border-radius:  15px 15px 0px 0px ;
  }
  .tck_text p{
    padding: 15px 0px;
    border-bottom: 1px solid #e5e5e5;
  }
  .text_p{
    padding: 10px 0px!important;
  }
  .yzm{
    display: inline-block;
    width: 110px;
    height: 40px;
    line-height:40px;
    color: #fff;
    border: 0px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    text-align: center;
    background: #2ec5a6;
  }
  .fs{
    display: inline-block;
    padding:0px 10px;
    line-height:40px;
    width: 100px;
    text-align: center;
    color: #666666;
    border: 0px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #dcdcdc;
  }
  .x_input{
    font-size: 14px;
  }
  .yzm_but{
    padding: 20px 15px 20px 0px;
  }
  .yzm_sub{
    background: #2ec5a6;
    color: #fff;
    font-size: 16px;
    width: 100%;
    line-height:40px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
</style>
