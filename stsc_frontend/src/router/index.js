import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"; //vuex
import { Message } from "element-ui"; //全局错误弹窗
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      name: "首页",
      title: "科技服务协同系统平台"
    },
    redirect: "index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("../views/Index.vue"),
        meta: {
          name: "首页",
          title: "科技服务协同系统平台"
        }
      },
      {
        path: "successCase",
        name: "successCase",
        component: () => import("../views/SuccessCase.vue"),
        meta: {
          name: "成功案例",
          title: "科技服务协同系统平台|成功案例"
        },
      },
      {
        path: "successCaseDetail/:id",
        name: "successCaseDetail",
        component: () => import("../views/SuccessCaseDetail"),
        props: true,
        meta: {
          name: "成功案例详情",
          title: "科技服务协同系统平台|成功案例"
        },
      },
      {
        path: "ld",
        name: "ld",
        component: () => import("../views/LookingDemand.vue"),
        meta: {
          name: "找需求",
          title: "科技服务协同系统平台|找需求"
        },
      },
      {
        path: "ls",
        name: "ls",
        component: () => import("../views/LookingService.vue"),
        meta: {
          name: "找服务",
          title: "科技服务协同系统平台|找服务"
        },
      },
      {
        path: "sc",
        name: "sc",
        component: () => import("../views/ScienceConsulting.vue"),
        meta: {
          requiresAuth: true,
          name: "科技咨询沟通",
          title: "科技服务协同系统平台|科技咨询沟通"
        },
      },
      {
        path: "pc",
        name: "pc",
        component: () => import("../views/personal-center/PersonalCenter"),
        meta: {
          requiresAuth: true,
          name: "个人中心",
          title: "科技服务协同系统平台|个人中心"
        },
        redirect: "pc/basicinfo",
        children:[{
          path: "basicinfo",
          name: "basicinfo",
          component: () => import("../views/personal-center/basic-information/Index"),
          meta: {
            requiresAuth: true,
            name: "个人基础信息",
            title: "科技服务协同系统平台|个人基础信息"
          },
        },{
          path: "buyer",
          name: "buyer",
          component: () => import("../views/personal-center/buyer/Index"),
          meta: {
            requiresAuth: true,
            name: "我是买家",
            title: "科技服务协同系统平台|我是买家"
          },
          redirect: "buyer/realauth",
          children:[{
            path: "mydemand",
            name: "buyermydemand",
            component: () => import("../views/personal-center/buyer/MyDemand"),
            meta: {
              requiresAuth: true,
              name: "我的需求",
              title: "科技服务协同系统平台|我是买家我的需求"
            },
          },{
            path: "mynews",
            name: "buyermynews",
            component: () => import("../views/personal-center/buyer/MyNews"),
            meta: {
              requiresAuth: true,
              name: "我的消息",
              title: "科技服务协同系统平台|我是买家我的消息"
            },
          },{
            path: "myorder",
            name: "buyermyorder",
            component: () => import("../views/personal-center/buyer/MyOrder"),
            meta: {
              requiresAuth: true,
              name: "我的订单",
              title: "科技服务协同系统平台|我是买家我的订单"
            },
          },{
            path: "realauth",
            name: "buyerrealauth",
            component: () => import("../views/personal-center/buyer/RealAuthentication"),
            meta: {
              requiresAuth: true,
              name: "我是买家实名认证",
              title: "科技服务协同系统平台|我是买家实名认证"
            },
          }],
        },{
          path: "mydemand/:id",
          name: "mydemand",
          component: () => import("../views/personal-center/buyer/MyDemandDetails"),
          meta: {
            requiresAuth: true,
            name: "我的需求详情"
          },
          props: true,
        },{
          path: "comanydetail",
          name: "comanydetail",
          component: () => import("../views/personal-center/buyer/CompanyDetail"),
          meta: {
            requiresAuth: true,
            name: "公司详情"
          },
        },{
          path: "buyerorderdetail",
          name: "buyerorderdetail",
          component: () => import("../views/personal-center/buyer/order-details/Index"),
          meta: {
            requiresAuth: true,
            name: "买家订单详情",
          },
          children:[{
            path: "inprogress/:orderid/:type",
            name: "buyerinprogress",
            component: () => import("../views/personal-center/buyer/order-details/InProgress"),
            meta: {
              requiresAuth: true,
              name: "进行中",
            },
            props: true,
          },{
            path: "serviceacceptance/:orderid/:type",
            name: "buyerserviceacceptance",
            component: () => import("../views/personal-center/buyer/order-details/ServiceAcceptance"),
            meta: {
              requiresAuth: true,
              name: "服务验收",
            },
            props: true,
          },{
            path: "serviceevaluation/:orderid/:type",
            name: "buyerserviceevaluation",
            component: () => import("../views/personal-center/buyer/order-details/ServiceEvaluation"),
            meta: {
              requiresAuth: true,
              name: "服务评价",
            },
            props: true,
          },{
            path: "waitingcommunication/:orderid/:type",
            name: "buyerwaitingcommunication",
            component: () => import("../views/personal-center/buyer/order-details/WaitingCommunication"),
            meta: {
              requiresAuth: true,
              name: "沟通中",
            },
            props: true,
          }]
        },{
          path: "seller",
          name: "seller",
          component: () => import("../views/personal-center/seller/Index"),
          meta: {
            requiresAuth: true,
            name: "我是卖家",
            title: "科技服务协同系统平台|我是卖家"
          },
          redirect: "seller/realauth",
          children:[{
            path: "myservice",
            name: "sellermyservice",
            component: () => import("../views/personal-center/seller/MyService"),
            meta: {
              requiresAuth: true,
              name: "我的服务"
            },
          },{
            path: "mynews",
            name: "sellermynews",
            component: () => import("../views/personal-center/seller/MyNews"),
            meta: {
              requiresAuth: true,
              name: "我的消息"
            },
          },{
            path: "realauth",
            name: "sellerrealauth",
            component: () => import("../views/personal-center/seller/RealAuthentication"),
            meta: {
              requiresAuth: true,
              name: "我是卖家实名认证"
            },
          },{
            path: "myorder",
            name: "sellermyorder",
            component: () => import("../views/personal-center/seller/MyOrder"),
            meta: {
              requiresAuth: true,
              name: "我的订单"
            },
          }]
        },{
          path: "sellerorderdetail",
          name: "sellerorderdetail",
          component: () => import("../views/personal-center/seller/order-details/Index"),
          meta: {
            requiresAuth: true,
            name: "卖家订单详情"
          },
          children:[{
            path: "inprogress/:orderid/:type",
            name: "sellerinprogress",
            component: () => import("../views/personal-center/seller/order-details/InProgress"),
            meta: {
              requiresAuth: true,
              name: "进行中"
            },
            props: true,
          },{
            path: "serviceacceptance/:orderid/:type",
            name: "sellerserviceacceptance",
            component: () => import("../views/personal-center/seller/order-details/ServiceAcceptance"),
            meta: {
              requiresAuth: true,
              name: "服务验收"
            },
            props: true,
          },{
            path: "waitingcommunication/:orderid/:type",
            name: "sellerwaitingcommunication",
            component: () => import("../views/personal-center/seller/order-details/WaitingCommunication"),
            meta: {
              requiresAuth: true,
              name: "沟通中"
            },
            props: true,
          }]
        },{
            path: "myservice/:id",
            name: "myserve",
            component: () => import("../views/personal-center/seller/MyServiceDetails"),
            meta: {
              requiresAuth: true,
              name: "我的服务详情"
            },
            props: true,
        }]
      },
      {
        path: "sd",
        name: "sd",
        component: () => import("../views/SendDemand.vue"),
        meta: {
          requiresAuth: true,
          name: "发需求"
        },
      },
      {
        path: "sd/:id",
        name: "sd",
        component: () => import("../views/SendDemand.vue"),
        meta: {
          requiresAuth: true,
          name: "修改需求"
        },
        props: true,
      },
      {
        path: "ss",
        name: "ss",
        component: () => import("../views/SendService.vue"),
        meta: {
          requiresAuth: true,
          name: "找服务"
        },
      },
      {
        path: "ss/:id",
        name: "ss",
        component: () => import("../views/SendService.vue"),
        meta: {
          requiresAuth: true,
          name: "修改服务"
        },
        props: true,
      },
      {
        path: "sdetail/:id",
        name: "sdetail",
        component: () => import("../views/ServiceDetails.vue"),
        meta: {
          requiresAuth: true,
          name: "服务细节"
        },
        props: true,
      },
      {
        path: "ddetail/:id",
        name: "ddetail",
        component: () => import("../views/DemandDetails.vue"),
        meta: {
          requiresAuth: true,
          name: "需求详情"
        },
        props: true,
      },
    ],
  },
    //第三方
  {
    path: "/third1",
    name: "third1",
    component: () => import("../views/third-party/Third"),
    meta: { requiresAuth: false },
    hidden:true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresAuth: false ,
      title: "科技服务协同系统平台|登录",
      name:"科技服务协同系统平台|登录"
    },
  },

  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp"),
    meta: {
      requiresAuth: false,
      title: "科技服务协同系统平台|注册",
      name:"科技服务协同系统平台|注册"
    },
  },
  {
    path: "/error/:type",
    name: "error",
    component: () => import("../views/Error.vue"),
    meta: {
      requiresAuth: false,
      title: "科技服务协同系统平台|错误",
      name:"科技服务协同系统平台|错误"
    },
    props: true,
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404Page.vue"),
    props: true,
    meta: {
      title: "科技服务协同系统平台|404",
      name:"科技服务协同系统平台|404"
    }
  },
];

const router = new VueRouter({
  routes,
});

// 导航守卫  全局前置守卫
// 路由元信息
router.beforeEach((to, fromss, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }else {
    document.title = "科技服务协同平台"
  }
  // const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 此路由需要身份验证，请检查是否已登录
    // 如果没有，请重定向到登录页。
    if (to.name !== "login" && !store.state.token) {
      Message.error({
        message: `请先登录！登录后查看！`,
        duration: 1000,
        offset:40
      });
      setTimeout(() => {
        console.log()
        next({
          path: `/login?url=${to.path}`,
        });
      }, 2000);
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
export default router;
