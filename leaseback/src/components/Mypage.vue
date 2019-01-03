<template>
    <div class="personal">
      <header class="fixheader">
        <span>个人中心</span>
      </header>
      <div class="scrollmain" style="padding-bottom: 70px">
      <div class="info mainContent">
        <div class="pic">
          <img src="../../static/img/pic_img.png">
          <span >{{userName}}</span>
        </div>
        <div class="jump" @click="toApprove">
         <span>{{params.toapprove}}</span>
          <img src="../../static/img/jump_icon.png" alt="">
        </div>
      </div>
      <ul class="infoContent">
          <li>
            <router-link to="/orderList">
              <div>
                <img src="../../static/img/order-icon.png" alt="">
                <span>我的订单</span>
              </div>
              <img src="../../static/img/go.png" alt="">
            </router-link>
          </li>
          <li>
            <router-link to="/billList">
              <div>
                <img src="../../static/img/bill-icon.png" alt="">
                <span>我的账单</span>
              </div>
              <img src="../../static/img/go.png" alt="">
            </router-link>
          </li>
          <li>
            <router-link to="/approve">
              <div>
                <img src="../../static/img/certify-icon.png" alt="">
                <span>资质认证</span>
              </div>
              <p>
                <span>{{params.approveIfo}}</span>
                <img src="../../static/img/go.png" alt="">
              </p>

            </router-link>
          </li>
        <li>
          <router-link to="/orderprogress">
            <div>
              <img src="../../static/img/check-icon.png" alt="">
              <span>进度查询</span>
            </div>
            <img src="../../static/img/go.png" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/helpCenter">
            <div>
              <img src="../../static/img/help-icon.png" alt="">
              <span>帮助中心</span>
            </div>
            <img src="../../static/img/go.png" alt="">
          </router-link>
        </li>
        <!--<li>-->
          <!--<router-link to="/aboutUs">-->
            <!--<div>-->
              <!--<img src="../../static/img/about.png" alt="">-->
              <!--<span>关于我们</span>-->
            <!--</div>-->
            <!--<img src="../../static/img/go.png" alt="">-->
          <!--</router-link>-->
        <!--</li>-->
        <li>
          <router-link to="/resetPwd">
            <div>
              <img src="../../static/img/about.png" alt="">
              <span>修改密码</span>
            </div>
            <img src="../../static/img/go.png" alt="">
          </router-link>
        </li>
        <li class="exit" @click="exit">
          <div>
            <img src="../../static/img/get-icon.png" alt="">
            <span>退出登录</span>
          </div>
          <img src="../../static/img/go.png" alt="">
        </li>
      </ul>
      <Myfooter :idx="1"></Myfooter>

    </div>
      </div>
</template>
<script>
  import Myfooter from '@/components/Myfooter';

    export default{
      data(){
        return{
          params:{
            approveIfo:'',
            toapprove:''
          },
          userName:''
        }
      },
      methods:{
        toApprove(){
          if(this.params.toapprove=="未认证"){
            this.$router.push({path:"/approve"})
          }
          else{
            return
          }
        },
        exit(){
          localStorage.clear();
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isAndroid==true){
            window.Android.showSignOut();
          }
          if(isiOS==true){
//            window.Oc.showSignOut();
            window.webkit.messageHandlers.showSignOut.postMessage({})
          }

        }
      },
      created(){
        const vm=this;
        vm.$http.post('api/user/auth/main').then(function (res) {
          if(res.data.code==0){
            vm.params=res.data.data;
           if(vm.params.ocrAuth==false){
             vm.params.approveIfo="实名认证未通过";
             vm.params.toapprove="未认证"
           }else if(vm.params.authPerson==false){
             vm.params.approveIfo="个人信息认证未通过";
             vm.params.toapprove="未认证"
           }else if(vm.params.authLink==false){
             vm.params.approveIfo="联系人认证未通过";
             vm.params.toapprove="未认证"
           }else if(vm.params.authOperator==false){
             vm.params.approveIfo="运营商认证未通过";
             vm.params.toapprove="未认证"
           }
            else{
             vm.params.approveIfo="认证通过";
             vm.params.toapprove="已认证"
           }
          }
        })
        vm.$http.post('api/user/info/getUserInfo').then(function (res) {
          if(res.data.code==0){
            if(res.data.data.userName=='' || res.data.data.userName==null){
              vm.userName=res.data.data.mobile
            }
            else{
              vm.userName=res.data.data.userName

            }


          }
        })
      },
      components: {
        Myfooter,

      }
    }
</script>
<style scoped>
  .info{
    padding: 25px 15px;
    background: url(../../static/img/userInfo.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .pic img{
    width: 60px;
    vertical-align: middle;
  }
  .pic span{
    margin-left: 10px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .jump img{
    width: 12px;
    vertical-align: text-top;
    margin-left: 10px;
  }
  .infoContent{
    margin-top: 10px;
    padding: 0 15px;
    background: #fff;
    overflow: hidden;
  }
  .infoContent li a{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #dcdcdc;
  }
  .infoContent .exit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #dcdcdc;
  }
  .infoContent li div img{
    width: 15px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .infoContent li div span{
    vertical-align: middle;
  }
  .infoContent li img{
    width: 10px;
  }
  .infoContent li p span{
    font-size: 13px;
    color: #666;
    vertical-align: text-top;
  }
</style>
