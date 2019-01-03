<template>
    <div class="personal">
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>授权认证</span>
      </header>
      <div class="cridet">
        <img src="../../../static/img/cridet.png">
      </div>
      <div class="import">
        <div class="form-style">
          <label>手机号码</label>
          <input type="number" value="15981934889" readonly="true">
        </div>
        <div class="form-style">
          <label>服务密码</label>
          <input type="number" placeholder="输入手机服务密码" >
        </div>
      </div>
      <div class="apply">
        <button  v-if="operator" @click="openMask">立即授权</button>

        <button v-if="message" @click="openMask" >确定</button>


      </div>
      <div class="swarmtip">温馨提示</div>
      <div class="option">
        <p> 1、本人实名认证手机号。</p>
        <p> 2、授权过程中请不要刷新和退出页面。</p>
        <p> 3、若您不知道自己的运营商服务密码，可以打对应的运营商客服电话咨询。</p>
        <p> 4、移动客服电话：10086</p>
        <p> 5、联通客服电话：10010</p>
        <p> 6、电信客服：10000</p>
      </div>
      <dialog-bar v-model="sendVal"  tip1="认证中..." tip2="请耐心等待" src="operator" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" v-if="operator"></dialog-bar>
      <dialog-bar v-model="sendVal"  tip1="提交中..." tip2="" src="message" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" v-if="message"></dialog-bar>
    </div>
</template>
<script>
  import dialogBar from '../../components/dialog.vue'
  export default {
    components:{
      'dialog-bar': dialogBar
    },
    data(){
      return{
        sendVal: false,
        message:false,
        operator:true
      }
    },
    methods:{
      openMask(index){
        this.sendVal = true;
//        this.message=true;
//        this.operator=false
      },
      clickCancel(){
        console.log('点击了取消');
      },
      clickDanger(){
        console.log('这里是danger回调')
      },
      clickConfirm(){
        console.log('点击了confirm');
      }
    }
  }
</script>
<style scoped>
  .cridet{
    padding: 15px 0;
    text-align: center;
    background: #fff;
  }
  .cridet img{
    width: 50%;
  }
  .import{
    margin-top: 20px;
    background: #fff;

  }
  .form-style{
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .form-style label{
    display: inline-block;
    margin-left: 15px;
    width: 100px;
    font-size: 15px;
  }
  .form-style input{
    font-size: 15px;
  }
  .swarmtip {
    font-size: 15px;
    color: #666666;
    font-weight: bold;
    margin: 0 15px;
  }
  .option {
    margin-top: 10px;
  }
  .option p {
    margin: 3px 15px;
    font-size: 14px;
    color: #666666;
  }
</style>
