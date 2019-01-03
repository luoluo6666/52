<template>

  <div class="personalCenter">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in listImg" :key="item.id" >
        <img :src="item.url" alt="" class="swiper-image">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
    <div class="line"></div>
    <img src="../../static/img/adventage.png" alt="">
    <div class="content">
      <div class="mobile">
        <img src="../../static/img/storage.png" alt="">
        <p>{{params.deviceSize}}</p>
      </div>
      <img src="../../static/img/phoneCircle.png">
      <div class="phoneImg">
        <img :src="params.deviceImg">
      </div>
      <div class="model">
        <img src="../../static/img/phoneType.png" alt="">
        <p>{{params.deviceType}}</p>
      </div>
      <p class="highPrice">最高回收价：￥{{params.devicePrice}}</p>
      <button @click="valuation" class="valuation">
        {{text}}
      </button>
    </div>
      <div class="type">
        大家都在卖
      </div>
      <div class="phoneType">
        <ul class="box">
          <li @click="valuation1">
            <img src="../../static/img/iphoneX.png" alt="">
            <div class="phoneDetail">
              <p class="phoneName">iPhone X</p>
              <p class="price">最高回收价 </p>
              <p><b>￥7440</b> </p>
            </div>
          </li>
          <li @click="valuation1">
            <img src="../../static/img/iphone8.png" class="iphone">
            <div class="phoneDetail">
              <p class="phoneName">iPhone  6s</p>
              <p class="price">最高回收价 </p>
              <p><b>￥4750</b> </p>
            </div>
          </li>
          <li @click="valuation1">
            <img src="../../static/img/xiaomi6.png" alt="">
            <div class="phoneDetail">
              <p class="phoneName">小米手机6</p>
              <p class="price">最高回收价 </p>
              <p><b>￥1785</b> </p>
            </div>
          </li>
          <li @click="valuation1">
            <div class="oppo">
              <img src="../../static/img/oppoA57.png" alt="">
            </div>
            <div class="phoneDetail">
              <p class="phoneName">oppo A57</p>
              <p class="price">最高回收价 </p>
              <p><b>￥4750</b> </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="type">
        快周转服务保障
      </div>
      <img src="../../static/img/security.png" >
    <Myfooter :idx="1"></Myfooter>
  </div>
</template>

<script>
  import { swiper,swiperSlide } from 'vue-awesome-swiper';
  import Myfooter from '@/components/Myfooter';


  export default {

    data() {
      return {
        params:{},
        text:"免费评估",
        listImg: [
//          {url: './static/img/banner.png'},
          {url: './static/img/banner1.png'}
        ],
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
//          navigation: {
//            nextEl: '.swiper-button-next',
//            prevEl: '.swiper-button-prev'
//          }
        }
      }
    },
    components: {
      swiper,
      swiperSlide,
      Myfooter
    },
    methods:{
      valuation() {
        const vm=this;
        vm.text='奋力加载中..';
        vm.$router.push({path: '/order/valuation'});

      },
      valuation1() {
        const vm=this;
        this.$router.push({path: '/order/valuation'});
      },

    },
    mounted(){
      var phoneType =JSON.parse(localStorage.getItem('phoneInfo'))  ;
      console.log(phoneType)
      if(phoneType==null){
        this.$http.get('api/index/getDevice',{ timeout:8000}).then(function (res) {
          if(res.data.code==0){
            this.params=res.data.data;
            localStorage.setItem('phoneInfo',JSON.stringify(this.params));
            if(!res.data.data.deviceImg){
              this.params.deviceImg='./static/img/iphoneX.png'
            }
            if(!res.data.data.devicePrice){
              this.params.devicePrice="3000"
            }
          }

        })
      }
      else{
        this.params=phoneType
        if(!phoneType.deviceImg){
          this.params.deviceImg='./static/img/iphoneX.png'
        }
        if(!phoneType.devicePrice){
          this.params.devicePrice="3000"
        }
      }


    },


  }
</script>

<style scoped>
  .swiper-button-prev,.swiper-button-next{
    width: 30px;
    height: 15px;
    margin-top: 0;
  }
  .swiper-image{
    width:100%;
    height:100%;
  }
  .content{
    position: relative;
    text-align: center;
  }
  .phoneImg {
    width: 16%;
    position: absolute;
    top: 23%;
    left: 41%;
  }
  .mobile {
    position: absolute;
    top: 36%;
    left: 7%;
    text-align: center;
    font-size: 15px;
  }
  .mobile img{
    width: 25px;
  }

  .model {
    position: absolute;
    right: 7%;
    top: 36%;
    text-align: center;
    font-size: 15px;
  }
  .model img{
    width:20px;
  }
  .valuation{
    width: 90%;
    height: 45px;
    margin: 0 15px;
    line-height: 45px;
    background: #2ec5a6;
    box-shadow: -2px 2px 6px #b8b8b8;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    letter-spacing: 2px;
    font-weight: bold;
    border: none;
    outline: none;
  }
  .type{
    padding: 15px 0 0 15px;
    margin: 30px 0;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: left;
    border-top: 10px solid #eee;
    overflow: hidden;
  }
  .phoneType {
    margin: 0 0 0 15px;
  }
  .phoneType ul li{
    display: inline-block;
    width: 45%;
    line-height: 25px;
    margin-right: 10px;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #dbdbdb;
    box-shadow: 0 0 5px #dbdbdb;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .phoneType ul li img{
    width: 25px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .phoneDetail {
    display: inline-block;
    vertical-align: middle;
  }
  .box .iphone {
    width: auto;
    height: 50px;
  }
  .oppo {
    margin-right: 10px;
    width: 42px;
    display: inline-block;
    text-align: center;
  }
  .phoneName {
    font-size: 14px;
    letter-spacing: 0;
    color: #000;
    font-weight: 600;
  }
  .price {
    font-size: 13px;
    color: #7c7e7c;
    font-weight: 600;
  }
  b {
    font-size: 12px;
    color: #ff5f2e;
  }
  .color{
    color: #000;
  }
  .color1{
    color:red;
  }
  .highPrice{
    margin: 10px 0;
    color:#2ec5a6;
  }

</style>
