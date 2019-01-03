<template>
    <div class="personalCenter">
      <header>
        <a href="javascript:history.go(-1);">
          <img src="../../../static/img/backbtn.png" alt="">
        </a>
        <span>检测评估</span>
      </header>
      <div class="scrollmain">
      <div class="buyPrice">
        <label>购买价格：</label>
        <input type="number" oninput="if(value.length>5)value=value.slice(0,5)"  name="buyPrice" v-model="params.buyPrice" placeholder="请输入购买价格">
      </div>
      <div class="testStep">
        <div class="steps">
        <span class="number">1</span>
            <span class="stepTitle">使用时长</span>
        </div>
        <ul class="common_main" ref="time">
            <li class="check">1~3个月</li>
            <li>3个月以上</li>
        </ul>
      </div>
      <div class="testStep backMain05">
        <div class="steps">
      <span class="number">
        2
      </span>
          <span class="stepTitle">外观问题</span>
        </div>
        <ul  class="common_main" ref="facade">
          <li class="check">无外观问题</li>
          <li>划痕、掉漆、磕碰</li>
          <li>机身弯曲</li>
          <li>缺角/破裂</li>
        </ul>
      </div>
      <div class="testStep backMain06">
        <div class="steps">
        <span class="number">
          3
        </span>
          <span class="stepTitle">功能问题</span>
        </div>
        <ul  class="common_main">
          <li class="check">无功能问题</li>
          <li>无法开机</li>
          <li>闪光灯不正常</li>
          <li>拍照摄影不正常</li>
          <li>wifi不正常</li>
          <li>触摸失灵</li>
        </ul>
      </div>
      <div class="footer">
       <button @click="govalue">免费估价</button>
      </div>
</div>
    </div>
</template>
<script>
  import Myhead from '@/components/Myhead';
  import {check} from '../../../static/range.js'

  export default{
      data() {
        return{
          params:{
            useTime:'',
            facadeFlag:'',
            openFlag:'',
            buyPrice:''
          }

        }
      },
      methods:{
        govalue(){
          var dataArray=[];
          var checkList = document.getElementsByClassName('check');
          for(var i=0;i<checkList.length;i++){
            dataArray.push(checkList[i].innerHTML);
          }
          this.params.useTime=dataArray[0];
          if(dataArray[1]=="无外观问题"){
            this.params.facadeFlag=0
          }
          else{
            this.params.facadeFlag=1
          }
          if(dataArray[2]=="无功能问题"){
            this.params.openFlag=0
          }
          else{
            this.params.openFlag=1
          }
          if(this.params.buyPrice!=""){
            localStorage.setItem('queryParam',JSON.stringify(this.params));
            this.$router.push({path: '/order/sell'});
          }
          else{
            this.$toast(" 请输入手机购买价格");
          }
        }
      },

      mounted(){
        check();
        this.data=JSON.parse(localStorage.getItem("shuju"));
        console.log(this.data)
        },
      components:{
        Myhead
      }


  }
</script>
<style scoped>
  .buyPrice {
    padding: 15px;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
  }
  .testStep {
    border-bottom: 10px solid #eee;
    overflow: hidden;
  }
  .steps {
    margin: 20px 15px 0 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .steps .number {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0 10px 0 0;
    line-height: 25px;
    text-align: center;
    border-radius: 50%;
    background: #2EC5A6;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }
  .steps .stepTitle {
    font-size: 15px;
    font-weight: 600;
  }
  .common_main{
    overflow: hidden;
    margin: 15px;
    width: auto;
  }
  .common_main  li {
    float: left;
    width: 46%;
    padding: 10px 0;
    margin: 1% 2%;
    text-align: center;
    border: 1px solid #555555;
    border-radius: 5px;
    font-size: 15px;
    color: #555555;
  }
  .common_main  li.check{
    color: #fff;
    background: #2ec5a6;
    border: 1px solid #fff;
  }
.check{
  color: #fff;
  background: #2ec5a6;
  border: 1px solid #fff;
}
  .footer {
    text-align: center;
    padding: 15px 12px; }
  .footer button {
    width: 100%;
    border: none;
    outline: none;
    font-size: 17px;
    color: #FFFFFF;
    background: #2EC5A6;
    border-radius: 4px;
    line-height: 45px; }
</style>
