<template>
    <div class="personal">
      <header>
        <a href="javascript:history.go(-1);">
        <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>修改密码</span>
      </header>
      <div class="import">
        <div class="form-style">
          <label>输入新密码</label>
          <input type="password" placeholder="6-10位数字或字母" v-model="newPwd">
        </div>
        <div class="form-style">
          <label>确认新密码</label>
          <input type="password" placeholder="请再次输入新密码" v-model="confirmPwd">
        </div>
      </div>
      <div class="apply">
        <button @click="commit" :disabled="disabled">确认修改<spinner type="crescent" style="position: relative;top: -2px;fill:#fff;stroke:#fff" v-show="disabled"></spinner></button>
      </div>


    </div>
</template>
<script>
    export default{
      data(){
        return{
          newPwd:'',
          confirmPwd:'',
          disabled:false
        }
      },
      methods:{
        commit(){
          var vm=this;
          var regpwd=/^[A-Za-z0-9]{6,12}$/
          if( vm.newPwd ==''){
            vm.$toast("请检查新密码");
            return false;
          }
          if( vm.confirmPwd ==''){
            vm.$toast("请再次确认新密码");
            return false;
          }
          if(!regpwd.test(vm.newPwd) &&  !regpwd.test(vm.confirmPwd)){
            vm.$toast("输入的密码格式不正确");
            return false;
          }
          if( vm.newPwd != vm.confirmPwd){
            vm.$toast("两次输入的密码不一致");
            return false;
          }
          else{
            vm.disabled = true
            vm.$http.post('api/user/info/updatePassword',{password:vm.newPwd}).then(function (res) {
              if(res.data.code==0){
                vm.disabled =false
                vm.$toast("修改密码成功");
                setTimeout(function () {
                  vm.$router.push({path: '/home'})
                }, 3000);
              } else{
                vm.disabled =false
                vm.$toast("服务端异常");
              }

            })
          }
        }

      },
        props: []
    }
</script>
<style scoped>
  .import{
    margin-top: 20px;
    background: #fff;

  }
  .form-style{
    font-size: 14px;
    color: #333333;
    padding: 13px 0;
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
</style>
