<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">{{title}}</div>
      <div class="content" v-html="content"></div>
      <div  v-if="src== 'operator' " class="operator">
        <img src="../../static/img/operator.gif" alt="">
      </div>
      <div  v-if="src== 'message' " class="message">
        <img src="../../static/img/messageOperator.gif" alt="" style="width:120px;">
        <p class="showdown"></p>
      </div>
      <div class="tip">
        <p>{{tip1}}</p>
        <p>{{tip2}}</p>
      </div>

      <div class="btns">
        <div v-if="type == 'cancel'" class="default-btn" @click="closeBtn">
          {{cancelText}}
        </div>

        <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
          {{confirmText}}
        </div>
      </div>
      <!--<dialog-bar v-model="sendVal" type="danger" title="我是标题" content="我是内容" picture="img" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></dialog-bar>-->

      <!--<div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>-->
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      value: {},
      // 类型包括 defalut 默认， danger 危险， confirm 确认，
      type:{
        type: String,
        default: ''
      },
      src:{
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },

      title: {
        type: String,
        default: ''
      },
      tip1: {
        type: String,
        default: ''
      },
      tip2: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确认'
      },
    },
    data(){
      return{
        showMask: false
      }
    },
    methods:{
      closeMask(){
        this.showMask = false;
      },
      closeBtn(){
        this.$emit('cancel');
        this.closeMask();
      },

      confirmBtn(){
        this.$emit('confirm');
        this.closeMask();
      }
    },
    mounted(){
      this.showMask = this.value;
    },
    watch:{
      value(newVal, oldVal){
        this.showMask = newVal;
      },
      showMask(val) {
        this.$emit('input', val);
      }
    },
  }
</script>
<style>
  .dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    min-width: 320px;
    max-width: 780px;
  }
  .dialog-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    border-radius: 8px;
    text-align: center;
    background: #ffffff;
   }
  .dialog-title{
    padding: 10px 30px;
    font-size: 18px;
    color: #696969;
    font-weight: 600;
    box-sizing: border-box;
  }
  .content{
    color: #797979;
    line-height: 26px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .inp{
    margin: 10px 0 0 20px;
    width: 200px;
    height: 40px;
    padding-left: 4px;
    border-radius: 4px;
    border: none;
    background: #efefef;
    outline: none;}
  .inp:focus{
     border: 1px solid #509EE3;
   }
  .btns{
    padding: 20px 50px;
    }
  .btns> div{
        display: inline-block;
        padding: 0 14px;
        color: #ffffff;
        background: #2ec5a6;
        margin-right: 12px;
        cursor: pointer;
      }
  .default-btn{
    color: #787878;}
  .default-btn:hover{
     color: #509EE3;
   }

  .danger-btn{
    background: #EF8C8C;}
  .danger-btn:hover{
     background: rgb(224, 135, 135);
   }
  .danger-btn:active{
     background: #EF8C8C;
   }

  .confirm-btn{
    color: #ffffff;
    background: #509EE3;}
  .confirm-btn:hover{
     background: #6FB0EB;
   }

  .close-btn{
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;}
  .close-btn:hover{
     font-weight: 600;
   }
  .operator{
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    background: #eee;

  }
  .message{
    width: 140px;
    margin: 0 auto;
  }
  .showdown{
    display: block;
    height: 30px;
    background: #eee;
    margin: -50px auto 0;
    border-radius: 50%;
  }
  .tip{
    margin-top: 10px;
  }
</style>
