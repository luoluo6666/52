<template>
    <div>
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../static/img/backbtn.png" alt="">
        </a>
        <span>登录</span>
      </header>
      <input v-model="phone" placeholder="请输入手机号码">
      <input type="text" v-model="pwd" placeholder="请输入密码">
      <button @click="submit">提交</button>

    </div>
</template>
<script>
    export default{
      data(){
        return{
          phone:'',
          pwd:''
        }
      },
      methods:{
        submit:function () {
          console.log(this.phone)
          this.$http.post('http://m.xiaoyuan52.com/login/doLogin',{phone:this.phone,pwd:this.pwd},{emulateJSON:true})
            .then(function (res) {
            console.log(1)
          })
        }
      }

    }
</script>
<style>
</style>
