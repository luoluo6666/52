<template>
    <div class="body" id="payindex">
      <header class="fixheader">
        <a @click="back()">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>收银台</span>
      </header>
      <div class="cen">
         <div class="text">
           <span>支付类型</span>
           <span>{{list.mname}}的订单还款</span>
         </div>
        <form  id="notPassForm" method="get" name="myform">
        <div class="textarea">
          <x-textarea :max="40"  placeholder="请输入" v-model="text" :show-counter="false"></x-textarea>
        </div>
          <input type="hidden" name="remarks" :value="text">
          <input type="hidden" name="mb" value="mbrepay" />
          <input type="hidden" name="orderid" :value="payamount.orderid">
          <input type="hidden" name="ordersn" :value="qureyParams.ordersn">
          <input type="hidden"  name="rid" :value="qureyParams.rid" >
          <input type="hidden" name="r_stages" :value="qureyParams.r_stages" >
          <input type="hidden"  name="sign" :value="list.sign" >
          <input type="hidden" name="type" value="alipay">

        <div class="payradio">
          <p class="pay_tit">还款方式</p>
          <div class="radio" v-for="(item,key) in list.repaymenTypes">
            <div class="radio_cen" @click="change(key)">
              <span class="paytype" v-if="item === 'helipay'"><img src="../../../static/img/hlb.png" alt="">合利宝支付</span>
              <span class="paytype" v-else-if="item === 'yeepay'"><img src="../../../static/img/yb.png" alt="">易宝支付</span>
              <span class="paytype" v-else-if="item === 'alipay'"><img src="../../../static/img/zfb.png" alt="">支付宝支付</span>
              <span class="input" v-if="payindex === key"><img src="../../../static/img/duihao.png" alt=""></span>
              <span v-else class="yuan"></span>
            </div>
          </div>
        </div>
        <div class="money">
          <span>到期还款</span>
          <span class="mon_cen">￥{{payamount.payamount}}</span>
        </div>
        <div class="but">
          <button v-show="paytype === 'alipay'"  type='submit' @click="jumptoAlipay">立即还款</button>
          <span v-show="paytype != 'alipay'" @click="jumpto">立即还款</span>
        </div>
       </form>
      </div>
    </div>
</template>

<script>
  import { XTextarea } from 'vux'
  import global_ from '../../components/Global/global.vue'
    export default {
        name: "",
        components: {
          XTextarea
        },
      data(){
          return{
            qureyParams:'',
            text:'',
            payindex:0,
            list:"",
            payamount:"",
            paytype:'',
            dataParams:''
          }
      },
      mounted() {
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.qureyParams=this.$route.query
        this.$http.post('../api/pay/cashier/payment',{r_stages:1,mb:'mbrepay',rid:this.$route.query.rid,ordersn:this.$route.query.ordersn}).then(function (res) {
              if(res.data.code === 0){
                this.$vux.loading.hide()
                 this.list = res.data.data
                this.payamount = res.data.data.resultMap;
                this.paytype=res.data.data.repaymenTypes[0]
              }else{
                this.$vux.loading.hide()
                this.$toast(res.data.msg)
              }
        })
      },
      methods: {
        back(){
          this.$router.push({path:'/billList',query:{ordersn:this.$route.query.ordersn}});
        },
        change(index){
          this.payindex = index;
          this.paytype =this.list.repaymenTypes[index]
          console.log(this.paytype);
        },
        jumptoAlipay(){
          var token=localStorage.getItem("token");
          $("#notPassForm").attr("action",global_.serverSrc+'newAliPay/doPostAliPay').submit();
        },
        jumpto(){
          var token=localStorage.getItem("token");
              this.$router.push(
                {
                  name:"paybill",
                  query:
                  {
                    type:this.paytype,
                    remarks:this.text,
                    md:"mbrepay",
                    orderid:this.list.resultMap.orderid,
                    ordersn:this.$route.query.ordersn,
                    rid:this.$route.query.rid,
                    r_stages:this.$route.query.r_stages,
                    sign:this.list.sign
                  }
                }
              )
            }
        }
    }
</script>
<style scoped>
  .body{
    height: 100%;
    padding-top: 42px;
    background:#eeeeee;
  }
.text{
  margin: 10px 0px;
  background:#fff;
  padding:10px 15px;
  display:flex;
  font-size: 14px;
  justify-content: space-between;
}
.textarea{
  background:#fff;
  font-size: 14px;
  color: #999999;
}
  .payradio{
    margin-top: 10px;
    background:#fff;
    padding-left: 15px;
    font-size: 14px;
  }
  .pay_tit{
    padding: 10px 0px;
  }
  .radio_cen{
    padding: 10px 25px 10px 0;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .paytype img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .yl img{
    height: 15px;
  }
  .yuan{
    display: inline-block;
    width: 22.5px;
    height: 22.5px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #c5c5c5;
  }
  .input{
    display: inline-block;
    width: 22.5px;
    height: 22.5px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: #2ec5a6;
    text-align: center;
  }
  .input img{
    width: 70%;
    vertical-align: middle;
  }
  .money{
    margin: 10px 0px;
    background:#fff;
    padding:10px 15px;
    display:flex;
    font-size: 16px;
    justify-content: space-between;
  }
  .money .mon_cen{
    color: #f76276;
  }
  .but{
    margin-top: 35px;
    padding: 0px 15px;
  }
  .but button,.but span{
    background: #2ec5a6;
    color: #fff;
    font-size: 16px;
    width: 100%;
    padding: 10px 0px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
  }
</style>
