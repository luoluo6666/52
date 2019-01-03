<template>
    <div>
      <header>
        <router-link to="/approve" >
          <img src="../../../static/img/backbtn.png" alt="">
        </router-link>
        <span>银行卡认证</span>
      </header>
      <div class="scrollmain">
      <img src="../../../static/img/cardStep.png" alt="">
      <div class="remind">
        <img src="../../../static/img/tixing.png">
        请绑定本人的储蓄卡，否则认证将不通过
      </div>
      <ul class="cardInfo">
        <li>
          <span>客户姓名：</span>
          <span>{{userName}}</span>
        </li>
        <li>
          <span>手机号码：</span>
          <span>{{mobile}}</span>
        </li>
        <li>
          <span>请输入卡号：</span>
          <input name="bankNumber" type="number" v-model="bankNum"  placeholder="请输入银行卡号">
        </li>
        <li>
          <span>请选择银行：</span>
          <input v-model="bankName"  placeholder="请选择支持的银行卡" @click="showPicker0" onfocus="this.blur();">
        </li>
      </ul>
      <div class="back_footer">
        <button @click="next">立即认证</button>
      </div>
      <awesome-picker
        ref="picker0"
        :textTitle="picker0.textTitle"
        :data="picker0.data"
        :anchor="picker0.anchor"
        @confirm="handlePicker0Confirm">
      </awesome-picker>
      <div v-show="doing" class="doing">
        <div class="imgdoing">
          <img  src="../../../static/img/operator.gif" alt="">
          <p>正在认证中...</p>
        </div>

</div>
      </div>
    </div>
</template>

<script>

//解决手机端键盘遮挡输入框
  $('input').focus(function(){
    document.activeElement.blur();

  });

  const data1 = [
     '中国工商银行', '交通银行','招商银行','中国农业银行','中国建设银行','中国银行','中国人民银行','中国民生银行',
    '中国光大银行', '中国邮政储蓄银行','中国进出口银行','中国农业发展银行','中信银行','兴业银行','上海浦东发展银行',
    '华夏银行','深圳发展银行', '广东发展银行','国家开发银行'];

    export default{
      data(){
        return {
          bankName:'',
          bankNum:'',
          userName:'',
          mobile:'',
          doing:false,
          picker0: {
            anchor: [],
            textTitle: '选择银行',
            data: [data1]
          }
        }
      },
      methods:{
        showPicker0 () {
          this.$refs.picker0.show()
        },
        handlePicker0Confirm (v) {
          this.picker0.anchor = v;
          let a=eval(JSON.stringify(v));
          this.bankName = v ? a[0].value : null;
        },

        next(){
          const vm=this;
          var strExp=/^\d{16}|\d{19}$/;
          if(vm.bankNum==''){
            vm.$toast("请输入银行卡号");
            return false;
          }
          if(!strExp.test(vm.bankNum)){
            this.bankNum='';
            this.$toast("银行卡位数不正确，请重新输入");
            return false;
          }
          if(vm.bankName==''){
            vm.$toast("请选择所属银行");
            return false;
          } else {
            vm.doing=true;
            vm.$http.post('../api/user/auth/doBank',{bankName:this.bankName,bankNum:this.bankNum}).then(function (res) {
            if(res.data.code==0){
              vm.doing=false;
              vm.$toast("银行卡认证成功");
              setTimeout(function () {
                vm.$router.push({path: '/approve'})
              }, 3000);
            } else if(res.data.code==10405){
              vm.doing=false;
                vm.$toast("未获取到银行卡信息,请确认您的银行卡号");
            }
              else{
              vm.doing=false;
              if(res.data.msg){
                vm.$toast(res.data.msg);
              }
              else{
                vm.$toast("啊哦,断网了，请稍后再试");
              }
            }
          },function(res){
              vm.doing=false;
              alert(res.status)
              vm.$toast('啊哦,断网了，请稍后再试');
            })
          }
        }

      },

      created(){
        const vm=this;
        vm.$http.post('../api/user/info/getUserInfo').then(function (res) {
          if(res.data.code==0){
            vm.userName=res.data.data.userName;
            vm.mobile=res.data.data.mobile;
          }
        })
      }

    }
</script>
<style scoped>
  .remind {
    padding: 10px 15px;
    font-size: 14px;
    color: #fec675;
    border-bottom: 10px solid #f0f0f0;
  }
  .remind img {
    width: 20px;
    vertical-align: text-bottom;
  }
  .cardInfo {
    margin: 0 15px;
  }
  .cardInfo li {
    padding: 15px 0;
    font-size: 15px;
    border-bottom: 1px solid #dcdcdc;
    color: #646464;
  }
  .cardInfo li span {
    display: inline-block;
    width: 90px;
  }
  .doing{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background:rgba(0,0,0,.2);;
    z-index: 999;
  }
  .imgdoing{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70%;
    border-radius: 5px;
    padding: 20px 0;
    text-align: center;
    transform: translate(-50% ,-50%);
    background: #fff;
    z-index: 9999;
  }
  .imgdoing img{
    width: 100px;
  }
  input{
    font-size: 15px;
  }
</style>
