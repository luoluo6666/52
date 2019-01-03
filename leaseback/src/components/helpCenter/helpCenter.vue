<template>
    <div class="personal">
      <header class="fixheader">
        <router-link to="/home" >
          <img src="../../../static/img/backbtn.png" alt="">
        </router-link>
        <span>帮助中心</span>
      </header>
      <div class="scrollmain">
      <div class="personHelp">
        <p class="query">自助查询</p>
        <div class="question">
          <router-link to="/helpCenter/aboutrecycle">
            <img src="../../../static/img/aboutrecycle.png">
            <p>关于快周转</p>
          </router-link>
          <router-link to="/helpCenter/aboutOrder">
            <img src="../../../static/img/aboutorder.png">
            <p>下单问题</p>
          </router-link>
          <router-link to="/helpCenter/aboutransom">
            <img src="../../../static/img/aboutransom.png">
            <p>赎金问题</p>
          </router-link>
          <router-link to="/helpCenter/aboutaudit">
            <img src="../../../static/img/aboutaudit.png">
            <p>审核问题</p>
          </router-link>
          <router-link to="/helpCenter/aboutapprove">
            <img src="../../../static/img/aboutapprove.png">
            <p>认证问题</p>
          </router-link>
          <router-link to="/helpCenter/aboutinsure">
            <img src="../../../static/img/aboutinsure.png">
            <p>关于保险</p>
          </router-link>
        </div>
      </div>
      <p class="conmmon_question">常见问题</p>
      <ul class="question_list">
        <li v-for='(item,index) of items' @click="$router.push('/helpCenter/helpDetail/'+index)">
          {{item.title}}
        </li>
      </ul>
    </div>
      </div>
</template>
<script>
  import helpDatas from '../../../static/data/helpDatas.json';
//  import huishou from '../../../static/data/huishou.json';
    export default{
      data() {
        return {
          items: helpDatas,
        }
      },

    }
</script>
<style scoped>
  .main{
    background: #f0f0f0;
  }
  .personHelp{
    padding: 0 15px;
    margin-top: 42px;
    overflow: hidden;
    background: #fff;
  }
  .query {
    padding: 10px 15px;
    font-size: 16px;
    color: #333333;
  }
  .personHelp a{
    padding: 17px 0 11px 0;
    float: left;
    width: 25%;
    text-align: center;
  }
  .question img {
    width: auto;
    height: 30px;
    padding-bottom: 8px;
  }
  .question a p {
    font-size: 10px;
    color: #333333;
  }
  .conmmon_question {
    margin: 10px 15px;
    font-size: 16px;
    color: #999999;
  }
  .question_list {
    padding: 0 15px;
    margin-bottom: 20px;
    background: #fff;
  }
  .question_list li {
    padding: 15px 0;
    font-size: 13px;
    color: #666666;
    border-bottom: 1px solid #dcdcdc;
    background: url(../../../static/img/go.png) right center no-repeat;
    background-size: 8px 15px;
  }

</style>
