<template>
    <div>
      <header>
        <a  href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>账单列表</span>
      </header>
      <div class="scrollmain">
      <div v-if="items==''" class="empty">
        <img src="../../../static/img/coupon_null.png" alt="" >
        <p>暂无账单 </p>
      </div>
      <div v-if="items !='' ">
        <ul class="status0">
          <li v-for="item in items">
            <ul class="status">
              <li v-for="detail in item.listRepayment" >
                <div>
                  <span >订单编号 ：  <span @click="billDetail(item.sn)">{{item.sn}}</span></span>
                  <span>{{detail.status}}</span>
                </div>
                <div>
                  <span>借款时间</span> <span>{{item.createdate |filterFun}}</span>
                </div>
                <div>
                  <span>还款日</span> <span>{{detail.repaymentdate |filterFun}}</span>
                </div>
                <div>
                  <span>账单金额</span> <span>{{detail.corpus}}</span>
                </div>
                <div>
                  <span>应还</span> <span>{{detail.totalAmount}}</span>
                </div>
                <div class="footer" style="border-bottom: 0;">
                  <button  @click="repayment(item.sn,detail)"  :disabled="disabled">
                    {{topay}}
                  </button>
                </div>
                <!--<button @click="repayment(item.sn,detail)"  :disabled="disabled" style="float: right"></button>-->
                <!--<div class="list">-->
                  <!--<p style="font-size: 14px">应还：￥<span class="total">{{detail.totalAmount}}</span>元</p>-->
                  <!--<button @click="repayment(item.sn,detail)"  :disabled="disabled">{{topay}}</button>-->
                <!--</div>-->

              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
      </div>
</template>
<script>
  import global_ from '../../components/Global/global.vue'
    export default{
      data(){
        return{
          items:{},
          status:'',
          disabled:false,
          topay:'去还款'
        }
      },
      filters: {
        filterFun: function (value) {
          if(value&& value.length > 8) {
            value= value.substring(0,10);
          }
          return value;
        }
      },
      mounted(){
        var vm=this;
        vm.$http.post('api/user/bill/getListData').then(function (res) {
          if(res.data.code === 0){
            vm.items=res.data.data
            for (var i=0;i< vm.items.length;i++) {
              vm.items[i].index = i;
              for(var j=0;j< vm.items[i].listRepayment.length;j++){
                if(vm.items[i].listRepayment[j].delflag=="0"){
                  vm.items[i].listRepayment[j].status="待还款"
                }
                if(vm.items[i].listRepayment[j].delflag=="2"){
                  vm.items[i].listRepayment[j].status="逾期未还"
                }
                if(vm.items[i].listRepayment[j].isPayType==0){
                  vm.topay='去还款'
                }
                if(vm.items[i].listRepayment[j].isPayType==1){
                  vm.disabled=true;
                  vm.topay='还款处理中'
                }
              }

            }

          }
        })
//        vm.$http.post('api/checkRid').then(function (res) {
//          if(res.data.code==0){
//
//          }
//          else{
//            vm.disabled=true;
//            vm.topay='还款处理中'
//          }
//        })
      },
        methods:{
          jumpto(){
            this.$router.push({path:'/home'});
        },
      billDetail(sn){
        this.$router.push({path:'/billList/billDetail',query:{sn:sn}});
      },
          repayment(sn,detail){
            var rid=detail.id;
            var stages=detail.stages;
            this.$router.push(
              {
                name:'pay',
                query:
                  {
                    mb:'mbrepay',
                    rid:rid,
                    r_stages:stages,
                    ordersn:sn
                  }
              }
              );
          }
        }
    }
</script>
<style scoped>
  .empty{
    text-align: center;
    margin-top: 50px;
  }
  .empty img{
    width: 100px;
  }
.status0{
  overflow: hidden;
}
  .status{
    padding: 10px 15px;
    /*border-top: 1px solid #eee;*/
    /*border-bottom: 1px solid #eee;*/
  }
  .status li div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 ;
    margin: 5px 0;
    border-bottom: 1px solid #eee;
  }
  .status .list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
  }
  /*li button{*/
    /*padding:0 3px;*/
    /*height: 25px;*/
    /*border-radius: 3px;*/
    /*border: 1px solid #fe7287;*/
    /*background: #fe7287;*/
    /*color: #fff;*/
  /*}*/
  li button[disabled]{
    width: 100%;
    border: none;
    outline: none;
    font-size: 17px;
    color: #FFFFFF;
    background: #ddd;
    border-radius: 4px;
    line-height: 40px;
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
