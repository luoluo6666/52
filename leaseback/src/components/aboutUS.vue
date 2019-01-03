<template>
    <div>
      <header>
        <!--<router-link to="/" >-->
          <!--<img src="../../../static/img/backbtn.png" alt="">-->
        <!--</router-link>-->
        <a href="javascript:history.go(-1);">
        <img src="../../static/img/backbtn.png" alt="">
        </a>
        <span>关于我们</span>
      </header>
      <ul>
        <li class="logo"><img src="../../static/img/logo.png" ></li>
        <li class="productName">快周转</li>
        <li class="version"><p>v1.1.6</p></li>
        <li class="copyright">版权：珠海市租八戒融资租赁有限公司</li>
      </ul>
    </div>
</template>
<script>
    export default{
        props: []
    }
</script>
<style scoped>
  .logo{
    text-align: center;
  }
  .logo img {
    margin-top: 80px;
    width: 85px;
  }
  .productName {
    margin-top: 10px;
    color: #8b8a8a;
    text-align: center;
    letter-spacing: 3px;
    font-size: 18px;
    font-weight: 600;
  }
  .version {
    text-align: center;
    font-size: 15px;
    margin-top: 10px;
  }
  .version p {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #b2afaf;
    border-radius: 20px;
    color: #8b8a8a;
  }
  .copyright {
    position: absolute;
    bottom: 20px;
    min-width: 320px;
    max-width: 780px;
    width: 100%;
    text-align: center;
    color: #8b8a8a;
    font-size: 15px;
  }
</style>
