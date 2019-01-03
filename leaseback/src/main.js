// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import App from './App';
import AwesomePicker from 'vue-awesome-picker';
import router from './router/index';
import 'swiper/dist/css/swiper.css';
import '@/assets/css/common.css';
import VueAwesomeSwiper from "vue-awesome-swiper";
import Toast from "./components/toast";
import Dialog from "./components/dialog/index"
import MessageBox from "./components/confirm/index";
import  { LoadingPlugin ,XDialog } from 'vux'
import { Spinner } from 'vux'
// import VueWechatTitle from 'vue-wechat-title'

Vue.component('x-dialog', XDialog)




// Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(MessageBox);
Vue.use(AwesomePicker);
Vue.use(LoadingPlugin)


Vue.component('spinner', Spinner)
//设置页面title

// Vue.use(VueWechatTitle);


var tokenVal =localStorage.getItem("token");

Vue.http.headers.common['token']=tokenVal;
Vue.http.headers.post['Content-Type'] = 'application/json;charset=utf-8';
Vue.http.interceptors.push((request, next) => {
  let timeout;
  if (request.timeout) {
    timeout = setTimeout(() => {
      //自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
      next(request.respondWith(request.body, {
        status: 408,
        statusText: '请求超时'
      }));

    }, request.timeout);
  }
  next((response) => {
    return response;
  })
})


new Vue({
    el: '#app',
    router,
   // Myhead,
    render(h){
        return h(App);
    },

});

