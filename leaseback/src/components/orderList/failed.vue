<template>
  <div style="margin-top: 100px;" class="scrollmain">
    <div class="empty" v-if=" items=='' ">
      <img src="../../../static/img/coupon_null.png" alt="" >
      <p>暂无数据 </p>
    </div>

    <ul class="list">
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
              <span style="color: #fa5353">{{item.monpay}}</span>
            </li>
          </ul>
        </div>
        <p class="price" v-show="item.flag==3">
          <button class="sign" @click="sign()" >去还款</button>
        </p>

      </li>
    </ul>
  </div>
</template>
<script>
  //  import failedDatas from '../../data/failed.json';
  export default{
    data() {
      return{
        items:[]
      };
    },
    created: function(){
      this.getdata();             //定义方法
    },
    methods: {
      getdata: function(){
        const vm = this;
        vm.$http.post('../api/user/order/getListData',{"status":2}).then(function(res){  //接口返回数据
            if(res.data.code==0){
              vm.items=res.data.data;
            }
            else {
              vm.$toast('获取订单失败')
            }

          })
      },
      toDetails: function (id) {
        this.$router.push({path:'/orderList/orderDetail',query:{id:id}});
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
