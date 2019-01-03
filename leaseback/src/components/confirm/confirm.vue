<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="message-content">
      <div>
        <span class="title">温馨提示</span>
        <span class="mask" @click="cancel"> X </span>
      </div>
      <p class="content">{{ content }}</p>
      <div class="btn-group">
        <button class="btn-default" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</button>
        <button class="btn-primary btn-confirm" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      content: {
        type: String,
        default: '这是弹框内容'
      },
//      isShowInput: false,
//      inputValue: '',
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data () {
      return {
        isShowMessageBox: false,
        resolve: '',
        reject: '',
        promise: '' // 保存promise对象
      };
    },
    methods: {
      // 确定,将promise断定为resolve状态
      confirm: function () {
        this.isShowMessageBox = false;
        this.resolve('confirm');
        this.remove();
      },
      // 取消,将promise断定为reject状态
      cancel: function () {
        this.isShowMessageBox = false;
        this.reject('cancel');
        this.remove();
      },
      // 弹出messageBox,并创建promise对象
      showMsgBox: function () {
        this.isShowMessageBox = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
        this.reject = reject;
      })
        // 返回promise对象
        return this.promise;
      },
      remove: function () {
        setTimeout(function () {
          this.destroy();
        },300)
      },
      destroy: function () {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  };
</script>
<style  scoped>
.message-box{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.2);
}
  .message-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    width: 70%;
    text-align: center;
  }
  .mask{
    float: right;
    margin: 15px 10px;
  }
  .title{
    display: inline-block;
    margin: 15px 0;
    font-size: 20px;
  }
  .btn-group{
    margin: 10px;
    text-align: right;
  }
  .btn-default{
    padding: 5px;
  }
  .btn-primary{
    padding: 5px;
  }
</style>
