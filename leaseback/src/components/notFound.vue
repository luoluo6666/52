<template>
    <div>
      <header>
        <a href=""  @click="prev">
          <img src="../../static/img/backbtn.png" alt="">
        </a>
        <span>页面未找到</span>
      </header>
      <div class="content">
        <img src="../../static/img/img404.png" alt="">
        <p>啊哦~页面找不到了~</p>
        <div class="footer">
          <button @click="godefult">返回首页</button>
        </div>
      </div>

    </div>
</template>
<script>
    export default{
      methods: {
        prev(){
          this.$router.go(-1)
        },
        godefult(){
          this.$router.push({path:'/index'})
        }
       }
    }
</script>
<style scoped>
  .content{
    width: 80%;
    margin: 40px auto 0;
    text-align: center;
  }
  .content p{
    margin: 15px 0;
  }
  .footer {
    text-align: center;
    padding: 10px; }
  .footer button {
    width: 80%;
    border: none;
    outline: none;
    font-size: 16px;
    color: #FFFFFF;
    background: #2EC5A6;
    border-radius: 10px;
    line-height: 35px;
    box-shadow: 0px 6px 10px #ffdbe0;}

</style>
