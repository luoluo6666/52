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
            <a href="tel:0371-60909301" class="yes" @click="call" >拨打</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import helpDatas from '../../../static/data/helpDatas.json';
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
      this.helpDetail = helpDatas[pIdx]
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
<style scoped>
  .foot {
    position: fixed;
    bottom: 0;
    min-width: 320px;
    max-width: 780px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-top: 1px solid #ccc;
  }
  .resolved {
    width: 50%;
    text-align: center;
    font-size: 16px;
    color: #2EC5A6;
    float: left;
  }
  .contactUs {
    width: 50%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background: #2EC5A6;
    float: left;
  }
  .concepts{
    margin: 10px 15px;
  }

</style>
