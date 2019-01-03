
<template>
  <div class="tabs">
    <ul>
      <li v-for='(item,index) of items' :class='[item.cls,{on:index === idx}]' @click="$router.push(item.push)">
        <img :src="index===idx?item.iconSelect:item.icon">
        <p :class="['colorChange',{on:index===idx}]" >{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    props:['idx'],
    inject:['reload'],
    data(){
      return {
        items:[{
          cls:"defult",
          name:"借款",
          push:"/",
          icon:"./static/img/borrow.png",
          iconSelect:"./static/img/borrow-active.png"

        },
//          {
//            cls:"borrow",
//            name:"回收",
//            push:"/index",
//            icon:"./static/img/home.png",
//            iconSelect:"./static/img/home-active.png"
//          },
          {
            cls:"home",
            name:"我的",
            push:"/home",
            icon:"./static/img/mine.png",
            iconSelect:"./static/img/mine-active.png"
          }]
      }
    }
  }


</script>
  <style scoped>
    .colorChange{
      font-size: 11px;
      color: #666666;
    }
    .on{
      font-size: 11px;
      color: #333333;
    }

</style>
