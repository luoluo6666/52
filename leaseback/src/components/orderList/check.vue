<template>
    <div style="margin-top: 100px;" class="scrollmain">
      <div class="empty" v-if="items==''">
        <img src="../../../static/img/coupon_null.png" alt="" >
        <p>暂无数据 </p>
      </div>

      <ul class="list">
        <!--<li v-for="item in items" >-->
          <!--<div @click="toDetails(item.id)">-->
            <!--<div class="sn">-->
              <!--<img src="../../../static/img/order.png" alt="">-->
              <!--<span>订单号：{{item.sn}}</span>-->
              <!--<span class="status">{{orderStatus}}</span>-->
            <!--</div>-->
            <!--<div class="pname" @click="toDetails(item.id)">-->
              <!--<img src="../../../static/img/phone11.png" alt="">-->
              <!--<div>-->
                <!--<p class="phone">{{item.pname}}</p>-->
                <!--<p class="stage">犹豫期：<span style="color:#00b483">{{item.stagingnumber}}天</span></p>-->
              <!--</div>-->
              <!--<img src="../../../static/img/go.png" alt="" class="go">-->
            <!--</div>-->
          <!--</div>-->
          <!--<p class="price">-->
            <!--回收价: <span style="color: #fa5353">￥{{item.monpay}}</span>-->
            <!--<span v-if="orderStatus=='合同待签约'"><button class="sign" @click="sign(item.id)">合同待签约</button></span>-->
          <!--</p>-->

        <!--</li>-->
        <li v-for="item in items" >
          <div class="sn" @click="toDetails(item.id)">
            <img src="../../../static/img/order.png" alt="">
            <span>订单号：{{item.sn}}</span>
            <span class="status">{{item.orderStatus}} <img src="../../../static/img/go.png" alt="" class="go"></span>
          </div>
          <div class="pname" @click="toDetails(item.id)">
            <ul class="checkDetail">
              <li>
                <span>申请时间</span>
                <span>{{item.creatadate}}</span>
              </li>
              <li>
                <span>期限</span>
                <span style="color:#00b483">{{item.stagingnumber}}天</span>
              </li>
              <li>
                <span>借款金额</span>
                <span style="color: #fa5353">{{item.monpay}}元</span>
              </li>
            </ul>
          </div>
          <p class="price" v-if="orderStatus=='合同待签约'">
            <button class="sign" @click="sign(item.id,item.contract)">合同待签约</button>
          </p>

        </li>
      </ul>
    </div>
</template>
<script>
//  import failedDatas from '../../data/failed.json';
import global_ from '../../components/Global/global.vue'
    export default{
      data() {
        return {
          items: [],
          orderStatus:''
        };
      },
      created: function () {
        this.getdata();             //定义方法
      },
      methods: {
        getdata: function () {
          const vm = this;
          vm.$http.post('../api/user/order/getListData', {"status": 0},{ _timeout:3000}).then(function (res) {  //接口返回数据
             if(res.data.code==0){
               vm.items = res.data.data;
               for (var i=0;i< vm.items.length;i++) {
                 vm.items[i].index = i;
                 if(vm.items[i].flag==0){
                   if(vm.items[i].firstInstanceStatus==6){
                     vm.orderStatus="审核中"
                   }
                   if(vm.items[i].secondInstanceStatus==5){
                     vm.orderStatus="合同待签约"

                   }
                   if(vm.items[i].secondInstanceStatus==3){
                     vm.orderStatus="图片资料驳回"
                   }
                 }
               }

             }
            else{
               vm.$toast('获取订单失败')
             }
          },
            function(res){
              console.log(err.status);
            })


        },
        toDetails: function (id) {
          this.$router.push({path:'/orderList/orderDetail',query:{id:id}});
        },
        sign:function (id,contract) {
          var gettoken=localStorage.getItem("token");
          if(contract=='0'){
            this.$toast('合同暂未生成，请稍后再试')
          }else{
            window.location.href=global_.serverSrc+"mobile/member/contract/look/"+id+"?token="+gettoken;
          }

        }
      }
    }
</script>
<style scoped>
  .empty{
    text-align: center;
    margin-top: 130px;
  }
  .empty img{
    width: 100px;
  }
  .list li{
    border-bottom: 10px solid #eee;
  }
  .list .go{
    /*float: right;*/
    width: 10px;
    /*margin-top: 25px;*/
  }
  .sn{
    padding: 10px;
    border-bottom: 1px solid #eee;
    font-size: 13px;
  }
  .status{
    float: right;
    color:#2ec5a6;
    font-size: 14px;
  }
  .sn img{
    width: 12px;
    vertical-align: bottom;
  }
  .pname{
    margin: 10px 15px;
  }
  .pname img{
    width: 60px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .pname div{
    display: inline-block;
    padding: 10px 0;
    vertical-align: middle;
  }
  .price{
    padding: 5px 15px;
    border-top:1px solid #eee;
    font-size: 15px;
    color: #666666;
    overflow: hidden;
  }

  .sign{
    padding: 3px 5px;
    border: 1px solid #fe7287;
    background: #fe7287;
    border-radius: 5px;
    float: right;
    color: #fff;
  }
  .checkDetail{
    padding:0;
  }
  .checkDetail li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border: none;
    color: #333;
    font-size: 14px;
  }
</style>
