import Vue from 'vue'
import Router from 'vue-router';
import VueResource from 'vue-resource';


Vue.use(Router);
// vue请求http的插件
Vue.use(VueResource);

export default new Router({
    // mode: 'history', // 去掉地址栏的#号
    routes: [
      {
        path: '/',
        redirect:"borrow"
      },
      //登录
      {
        path: '/login',
        component: resolve => require(['../components/login'], resolve)
      },
      //首頁
      {
        // path: '/index?token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5Mjk4MyIsImlhdCI6MTUzNTM1OTc2Nywic3ViIjoiMTU4MzgzODIzOTYifQ.bsvVcl0B5Z2UPmpNe-Bu8b93-2_I4ZX20UnpM1Q2Rrw',
       path:'/index',
        component: resolve => require(['../components/defult'], resolve),
        // meta: {
        //   title: '快周转首页'
        // }
      },
      //評估外形
        {
          path:'/order/valuation',
          component: resolve => require(['../components/evaluate/valuation'], resolve),
          // meta: {
          //   title: '手机评估'
          // }
        },
      //预出售
      {
        path: '/order/sell',
        component: resolve => require(['../components/evaluate/sell'], resolve),
        // meta: {
        //   title: '手机出售'
        // }

      },
      //订单确认页面
      {
        path:'/order/orderConfirm',
        name:'orderConfirm',
        component: resolve => require(['../components/evaluate/orderConfirm'], resolve),
        // meta: {
        //   title: '确认订单'
        // }
      },
      //订单完成
      {
        path:'/order/finish',
        name:'finish',
        component: resolve => require(['../components/evaluate/finish'], resolve),
        // meta: {
        //   title: '订单完成'
        // }
      },

      //我的页面
      {
        path: '/home',
        component: resolve => require(['../components/Mypage'], resolve),
        // meta: {
        //   title: '个人中心'
        // }
      },

      //我的订单
      {
        path: '/orderList',
        component: resolve => require(['../components/orderList/orderList'], resolve),
        redirect:'/orderList/check',
        // meta: {
        //   title: '订单列表'
        // },
        children:[
          {
            path:'check',
            component: resolve => require(['../components/orderList/check'], resolve)
          },
          {
            path:'failed',
            component: resolve => require(['../components/orderList/failed'], resolve)
          },
          {
            path:'success',
            component: resolve => require(['../components/orderList/success'], resolve)
          },

        ]
      },
      // 订单详情
      {
        path:'/orderList/orderDetail',
        component: resolve => require(['../components/orderList/orderDetails'], resolve),
        // meta: {
        //   title: '订单详情'
        // }
      },
      // 跳转页面
      {
        path:'/orderList/link',
        component: resolve => require(['../components/orderList/link'], resolve),
      },
      //我的账单
      {
        path: '/billList',
        name:'billList',
        component: resolve => require(['../components/bill/billList'], resolve),
        // meta: {
        //   title: '账单列表'
        // }
      },
      //账单详情
      {
        path: '/billList/billDetail',
        component: resolve => require(['../components/bill/billDetail'], resolve),
        // meta: {
        //   title: '账单详情'
        // }

      },
      //去还款
      {
        path: '/torepay',
        component: resolve => require(['../components/bill/torepay'], resolve)
      },

      //资质认证页面
      {
        path: '/approve',
        component: resolve => require(['../components/approve/approve'], resolve),
      },
      //银行卡认证
      {
        path: '/approve/toBank',
        component: resolve => require(['../components/approve/toBank'], resolve)
      },
      //个人信息认证页面
      {
        path: '/approve/toAuth',
        component: resolve => require(['../components/approve/toAuth'], resolve)
      },
      //运营商认证

      {
        path: '/approve/toOperator',
        component: resolve => require(['../components/approve/operator'], resolve)
      },

      //借款页面
      {
        path: '/borrow',
        name:'borrow',
        component: resolve => require(['../components/borrow'], resolve)
      },

      //进度查询
      {
        path: '/orderprogress',
        component: resolve => require(['../components/orderprogress'], resolve)
      },
      //修改密码
      {
        path: '/resetPwd',
        component: resolve => require(['../components/setting/resetPwd'], resolve)
      },

      //帮助中心
      {
        path: '/helpCenter',
        component: resolve => require(['../components/helpCenter/helpCenter'], resolve),
        // meta: {
        //   title: '帮助中心'
        // }

      },
      {
        path: '/helpCenter/helpDetail/:index',
        component: resolve => require(['../components/helpCenter/helpDetail'], resolve)
      },
      //关于回收
      {
        path: '/helpCenter/aboutrecycle',
        component: resolve => require(['../components/helpCenter/aboutrecycle'], resolve)
      },
      {
        path: '/helpCenter/recycle/:index',
        component: resolve => require(['../components/helpCenter/recycle'], resolve)
      },
      //关于订单
      {
        path: '/helpCenter/aboutOrder',
        component: resolve => require(['../components/helpCenter/aboutOrder'], resolve)
      },
      {
        path: '/helpCenter/orderDetail/:index',
        component: resolve => require(['../components/helpCenter/orderDetail'], resolve)
      },
      //关于赎金
      {
        path: '/helpCenter/aboutransom',
        component: resolve => require(['../components/helpCenter/aboutransom'], resolve)
      },
      {
        path: '/helpCenter/ransomDetail/:index',
        component: resolve => require(['../components/helpCenter/ransomDetail'], resolve)
      },
      //关于审核
      {
        path: '/helpCenter/aboutaudit',
        component: resolve => require(['../components/helpCenter/aboutaudit'], resolve)
      },
      {
        path: '/helpCenter/auditDetail/:index',
        component: resolve => require(['../components/helpCenter/auditDetail'], resolve)
      },
      //关于认证
      {
        path: '/helpCenter/aboutapprove',
        component: resolve => require(['../components/helpCenter/aboutapprove'], resolve)
      },
      {
        path: '/helpCenter/approveDetail/:index',
        component: resolve => require(['../components/helpCenter/approveDetail'], resolve)
      },
      //关于保险
      {
        path: '/helpCenter/aboutinsure',
        component: resolve => require(['../components/helpCenter/aboutinsure'], resolve)
      },
      {
        path: '/helpCenter/insureDetail/:index',
        component: resolve => require(['../components/helpCenter/insureDetail'], resolve)
      },

      //关于我们
      {
        path: '/aboutUs',
        component: resolve => require(['../components/aboutUS'], resolve)
      },
      //收银台
      {
        path: '/pay',
        name:'pay',
        component: resolve => require(['../components/pay/payindex'], resolve)
      },
      {
        path: '/paybill',
        name:'paybill',
        component: resolve => require(['../components/pay/paybill'], resolve)
      },
      //支付成功页面
      {
        path: '/paySuccess',
        name:'paySuccess',
        component: resolve => require(['../components/pay/paySuccess'], resolve)
      },
      //支付处理中页面
      {
        path: '/payInhand',
        name:'payInhand',
        component: resolve => require(['../components/pay/payInhand'], resolve)
      },
      //支付失败页面
      {
        path: '/payFail',
        name:'payFail',
        component: resolve => require(['../components/pay/payFail'], resolve)
      },
      //404页面
      {
        path: "/404",
        name: "notFound",
        component:  resolve => require(['../components/notFound'], resolve),
        // meta: {
        //   title: '啊哦，找不到页面了！'
        // }
      }, {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/404"
      }


    ]
})

