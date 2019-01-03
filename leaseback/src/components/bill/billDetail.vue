<template>
    <div>
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>账单详情</span>
      </header>
      <div class="top">
        <div class="top_div">
            <div class="top_head">
              <div>
                <span>剩余待还(元)</span>
                <p>{{list.tt | numberFun }}</p>
              </div>
            </div>
          <div class="top-cen">
            <span>最后还款日</span><span>{{list.createdate | filterFun}}</span>
          </div>
        </div>
      </div>
      <div class="cen">
        <cell title="订单编号" :value="sn"></cell>
        <cell></cell>
      </div>
      <div class="but">
        <button @click="repayment">立即还款</button>
      </div>
    </div>
</template>
<script>
  import { Cell } from 'vux'
  import global_ from '../../components/Global/global.vue'
    export default{
      components: {
        Cell
      },
     filters:{
       numberFun: function(value){
         let num = Number(value).toFixed(2) ;
         return num;
       },
       filterFun: function (value) {
         if(value&& value.length > 8) {
           value= value.substring(0,10);
         }
         return value;
       }
     },
      data(){
        return{
          sn:"",
          list:""
        }
      },
      mounted(){
        this.sn=this.$route.query.sn;
        this.$http.post('../api/user/bill/detil',{"ordersn":this.sn}).then(function (res) {
          if(res.data.code === 0){
            this.list = res.data.data
          }else {
            this.$toast(res.data.msg)
          }
        })
      },
      methods:{
        repayment(item){
          const rid=this.list.listOutNoPay[0].id;
          const stages=this.list.listOutNoPay[0].stages;
          const sn=this.sn;
          const token=localStorage.getItem("token")
          this.$router.push({name:'pay',query:{mb:'mbrepay',rid:rid,r_stages:stages,ordersn:sn}});
        }
      }
    }
</script>
<style  scoped>
  .top{
    padding: 15px;
  }
  .top_div{
    background: url(../../../static/img/billdetailimg.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .top_head{
    padding: 0px 20px;
    text-align: center;
    color: #fff;
  }
  .top_head div{
    border-bottom: 1px solid #fff;
  }
  .top_head span{
    display: inline-block;
    padding: 10px 0px;
    font-size: 15px;
  }
  .top_head p{
    font-size: 37.5px;
    padding: 15px 0px;
  }
  .top-cen{
    padding: 10px 15px;
    display:flex;
    justify-content: space-between;
    color: #fff;
  }
  .cen{
    font-size: 14px;
    margin-top: 20px;
  }
  .but{
    margin-top: 15px;
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
</style>
