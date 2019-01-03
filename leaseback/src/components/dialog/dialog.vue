<template>
  <transition name="demo">
    <div class="toast" v-show="theToast">

        <div class="content">
          <img src="../../../static/img/servererror.png" alt="">
          <p class="tip">数据好像遇到问题，请再试一次</p>
          <div @click="hide" class="tryagain">重试</div>
        </div>

      </div>
    </div>

  </transition>
</template>

<script>
  export default {
    data() {
      return {
        theToast: false,
      };
    },
    methods:{
      hide(){
        this.theToast=false;
        parent.location.reload();
      }
    }
  };
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
    text-align: center;
    min-width: 320px;
    max-width: 780px;
    width: 100%;
  }

  .demo-enter-active,
  .demo-leave-active {
    transition: 0.3s ease-out;
  }

  .demo-enter {
    opacity: 0;
    transform: scale(1.2);
  }

  .demo-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
  .content{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1200;
    width: 75%;
    padding: 20px 0;
    background: #fff;
    text-align: center;
    border-radius: 10px;
  }
  .content img{
    width: 50%;
  }
  .tip{
    margin: 15px 0;
    font-size: 14px;
    color: #666666;

  }
  .tryagain{
    padding-top: 15px;
    border-top: 1px solid #eee;

  }
</style>
