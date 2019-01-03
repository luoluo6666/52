<template>
    <div>
      <header class="fixheader">
        <router-link to="/home" >
          <img src="../../../static/img/backbtn.png" alt="">
        </router-link>
        <!--<a href="javascript:history.go(-1);">-->
        <!--<img src="../../../static/img/backbtn.png" alt="">-->
        <!--</a>-->
        <span>资质认证</span>
      </header>
      <div class="scrollmain">
        <img src="../../../static/img/approve.png" alt="" class="mainContent">
        <ul class="approve">
          <li @click="toBank">
              <div class="step">
                <img src="../../../static/img/shiming.png" alt="">
                <div class="stepTitle">
                  <p class="one">实名认证</p>
                  <p class="two">请准备好你的身份证和储蓄卡</p>
                </div>
              </div>
              <div class="step1">
                <img v-if="ocrAuth" src="../../../static/img/certify_yes.png" class="done">
                <img src="../../../static/img/go.png" alt="">
              </div>
          </li>
          <li @click="toAuth">
              <div class="step">
                <img src="../../../static/img/userifo.png" alt="">
                <div class="stepTitle">
                  <p class="one">个人信息认证</p>
                  <p class="two">请您填写真实有效的信息</p>
                </div>
              </div>
              <div class="step1">
                <img v-if="authPerson" src="../../../static/img/certify_yes.png" class="done">
                <img src="../../../static/img/go.png" alt="">
              </div>
          </li>
          <li  @click="toConnect">
              <div class="step">
                <img src="../../../static/img/connect.png" alt="">
                <div class="stepTitle">
                  <p class="one">联系人认证</p>
                  <p class="two">确认您的联系人信息</p>
                </div>
              </div>
              <div class="step1">
                <img v-if="authLink" src="../../../static/img/certify_yes.png" class="done">
                <img src="../../../static/img/go.png" alt="">
              </div>
          </li>
          <li @click="toOperator">
              <div class="step">
                <img src="../../../static/img/yunyings.png" alt="">
                <div class="stepTitle">
                  <p class="one">运营商认证</p>
                  <p class="two">请根据提示进行授权认证</p>
                </div>
              </div>
              <div class="step1">
                <img v-if="authOperator" src="../../../static/img/certify_yes.png" class="done">
                <img src="../../../static/img/go.png" alt="">
              </div>
          </li>
        </ul>
        <p class="top">有效期说明</p>
        <p class="des">
          为了让您获取最新的信用额度，快周转会给授权认证设置相应的有效期。
          <span>到期后，授权状态将失效</span>，需要您重新授权认证。快周转会根据您的授权信息，
          <span>重新评估</span>，给您匹配最新的信用额度。
        </p>
      </div>
    </div>
</template>
<script>
  import global_ from '../../components/Global/global.vue'

    export default{
      data(){
        return{
          ocrAuth:false,
          authPerson:false,
          authLink:false,
          authOperator:false
        }
      },

      created(){
        const vm=this;
        vm.$http.post('api/user/auth/main').then(function (res) {
          if(res.data.code==0){
            vm.ocrAuth=res.data.data.ocrAuth;
            vm.authPerson=res.data.data.authPerson;
            vm.authLink=res.data.data.authLink;
            vm.authOperator=res.data.data.authOperator
          }
        })
      },
      methods:{
        toBank(){
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(this.ocrAuth==false){
            if(isAndroid==true){
              window.Android.showIDAuthentication();
            }
            if(isiOS==true){
//              window.Oc.showIDAuthentication();
              window.webkit.messageHandlers.showIDAuthentication.postMessage({})
            }
          }
          else{
            return
          }
        },
        toAuth(){
          if(this.authPerson==false && this.ocrAuth==true){
            this.$router.push({path: '/approve/toAuth'});
          }
          else if(this.ocrAuth==false){
            this.$toast("请先完成实名认证")
          }
          else{
            return
          }
        },
        toConnect(){
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(this.authLink==false && this.ocrAuth==true){
            if(isAndroid==true){
              window.Android.showContactsAuthentication();
            }
            if(isiOS==true){
//              window.Oc.showContactsAuthentication()
              window.webkit.messageHandlers.showContactsAuthentication.postMessage({})
            }

          }
          else if(this.ocrAuth==false){
            this.$toast("请先完成实名认证")
          }
          else{
            return
          }
        },
        toOperator(){
          if(this.authOperator==false && this.ocrAuth==true){
          var gettoken=localStorage.getItem("token");
          window.location.href=global_.serverSrc+"member/operator/trailAuth?token="+gettoken;

//            this.$router.push({path: '/approve/toOperator'});
          }
          else if(this.ocrAuth==false){
            this.$toast("请先完成实名认证")
          }
          else{
            return
          }
        }
      }
    }
</script>
<style scoped>
  .approve li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    border-bottom: 10px solid #eee;
  }
  .approve .step img{
    width:40px;
    vertical-align: middle;
  }
  .step1 img{
    width: 10px;
  }
  .step1 span{
    font-size: 12px;
    color: #f14646;
    vertical-align: text-top;
  }
  .stepTitle{
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
  }
  .stepTitle .one{
    font-size: 16px;
    color: #323232;
    font-weight: bold;
  }
  .stepTitle .two{
    margin-top: 5px;
    font-size: 12px;
    color: #969696;
  }
  .top {
    margin: 30px 12px 6px 12px;
    font-size: 14px;
    color: #666;
    font-weight: 600;
  }
  .des {
    margin: 0 12px 20px 12px;
    font-size: 14px;
    color: #B7B7B7;
  }
  .des span{
    color: #666;
    font-weight: 600;
  }
  .step1 .done{
    width: 50px;
  }
</style>
