<template>
  <div>
    <header>
      <a href="javascript:history.go(-1);">
        <img src="../../../static/img/backbtn.png" alt="">
      </a>
      <span>帮助中心</span>
    </header>
    <div class="concepts">
      <p class="title">{{helpDetail.title}}</p>
      <p class="content">{{helpDetail.detail}}</p>
    </div>
    <div class="foot" >
      <div class="resolved">
        <router-link to="/helpCenter">已解决
        </router-link>
      </div>
      <div class="contactUs"  @click="showCall">
        联系客服
      </div>
    </div>
    <div class="modalCall" v-show="show">
      <div class="modal-dialog">
        <img src="../../../static/img/contactUS.png" alt="">
        <p class="tel">联系客服电话</p>
        <p class="num">0371-60909301</p>
        <div>
          <div class="no" @click="hide">否</div>
          <!--<div class="yes" @click="call"> <a href="tel:0371-60909301">拨打</a></div>-->
          <a href="tel:0371-60909301" class="yes" @click="call" >拨打</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import huishou from '../../../static/data/huishou.json';
  export default {
    data() {
      return {
        helpDetail: {},
        show:false
      }
    },
    mounted: function () {
      //页面加载时获取列表索引号-[索引号为传递过来的参数]
      let pIdx = this.$route.params.index;
      //数据提取
      this.helpDetail = huishou[1].problem[pIdx]
    },
    methods:{
      showCall(){
        this.show=true
      },
      hide(){
        this.show=false
      },
      call(){
        this.show=false
      }
    }
  }
</script>
<style>
  .concepts{
    margin: 10px 15px;
  }
</style>
