<template>
  <div>
    <header>
      <a href="javascript:history.go(-1);">
        <img src="../../../static/img/backbtn.png" alt="">
      </a>
      <span>帮助中心</span>
    </header>
    <p class="about">关于回收</p>
    <ul class="question_list">
      <li v-for='(item,index) of items' @click="$router.push('/helpCenter/auditDetail/'+index)">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>
<script>
  import huishou from '../../../static/data/huishou.json';
  export default{
    data() {
      return {
        items: huishou[3].problem,
      }
    },

  }
</script>
<style scoped>
  .about{
    margin: 10px 15px;
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
