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
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/Index.vue"),
        meta: {
          name: "首页 "
        }
      },
      {
        path: "/ld",
        name: "ld",
        component: () => import("../views/LookingDemand.vue"),
        meta: {
          requiresAuth: true,
          name: "找需求 "
        },
      },
      {
        path: "/ls",
        name: "ls",
        component: () => import("../views/LookingService.vue"),
        meta: {
          requiresAuth: true,
          name: "找服务 "
        },
      },
      {
        path: "/sc",
        name: "sc",
        component: () => import("../views/ScienceConsulting.vue"),
        meta: {
          requiresAuth: true,
          name: "科技沟通"
        },
      },
      {
        path: "/pc",
        name: "pc",
        component: () => import("../views/personal-center/PersonalCenter"),
        meta: {
          requiresAuth: true,
          name: "个人中心"
        },
        redirect: "/basicinfo",
        children:[{
          path: "/basicinfo",
          name: "basicinfo",
          component: () => import("../views/personal-center/basic-information/Index"),
          meta: {
            requiresAuth: true,
            name: "基础信息"
          },
        },{
          path: "/buyer",
          name: "buyer",
          component: () => import("../views/personal-center/buyer/Home"),
          meta: {
            requiresAuth: true,
            name: "我是买家"
          },
          redirect: "/buyer/index",
          children:[{
            path: "/buyer/index",
            name: "index",
            component: () => import("../views/personal-center/buyer/Index"),
            meta: {
              requiresAuth: true,
              name: "我是买家"
            },
            redirect: "/buyer/realauth",
            children: [{
              path: "/buyer/mydemand",
              name: "mydemand",
              component: () => import("../views/personal-center/buyer/MyDemand"),
              meta: {
                requiresAuth: true,
                name: "我的需求"
              },
            },{
              path: "/buyer/mynews",
              name: "mynews",
              component: () => import("../views/personal-center/buyer/MyNews"),
              meta: {
                requiresAuth: true,
                name: "我的消息"
              },
            },{
              path: "/buyer/myorder",
              name: "myorder",
              component: () => import("../views/personal-center/buyer/MyOrder"),
              meta: {
                requiresAuth: true,
                name: "我的订单"
              },
            },{
              path: "/buyer/realauth",
              name: "realauth",
              component: () => import("../views/personal-center/buyer/RealAuthentication"),
              meta: {
                requiresAuth: true,
                name: "我是买家实名认证"
              },
            }],
          }, {
            path: "/buyer/orderdetail",
            name: "orderdetail",
            component: () => import("../views/personal-center/buyer/order-details/Index"),
            redirect: "/buyer/orderdetail/waitingcommunication",
            children:[{
              path: "/buyer/orderdetail/inprogress/:orderid",
              name: "inprogress",
              component: () => import("../views/personal-center/buyer/order-details/InProgress"),
            },{
              path: "/buyer/orderdetail/serviceacceptance/:orderid",
              name: "serviceacceptance",
              component: () => import("../views/personal-center/buyer/order-details/ServiceAcceptance"),
            },{
              path: "/buyer/orderdetail/serviceevaluation/:orderid",
              name: "serviceevaluation",
              component: () => import("../views/personal-center/buyer/order-details/ServiceEvaluation"),
            },{
              path: "/buyer/orderdetail/waitingcommunication/:orderid",
              name: "waitingcommunication",
              component: () => import("../views/personal-center/buyer/order-details/WaitingCommunication"),
            }]
          }],
        },{
          path: "/seller",
          name: "seller",
          component: () => import("../views/personal-center/seller/Index"),
          meta: {
            requiresAuth: true,
            name: "我是卖家"
          },
          redirect: "/seller/realauth",
          children:[{
            path: "/seller/myservice",
            name: "myservice",
            component: () => import("../views/personal-center/seller/MyService"),
            meta: {
              requiresAuth: true,
              name: "我的服务"
            },
          },{
            path: "/seller/mynews",
            name: "mynews",
            component: () => import("../views/personal-center/seller/MyNews"),
            meta: {
              requiresAuth: true,
              name: "我的消息"
            },
          },{
            path: "/seller/myorder",
            name: "myorder",
            component: () => import("../views/personal-center/seller/MyOrder"),
            meta: {
              requiresAuth: true,
              name: "我的订单"
            },
          },{
            path: "/seller/realauth",
            name: "realauth",
            component: () => import("../views/personal-center/seller/RealAuthentication"),
            meta: {
              requiresAuth: true,
              name: "我是卖家实名认证"
            },
          }]
        }]
      },
      {
        path: "/sd",
        name: "sd",
        component: () => import("../views/SendDemand.vue"),
        meta: {
          requiresAuth: true,
          name: "发需求"
        },
      },
      {
        path: "/sd/:id",
        name: "sd",
        component: () => import("../views/SendDemand.vue"),
        meta: {
          requiresAuth: true,
          name: "找需求"
        },
        props: true,
      },
      {
        path: "/ss",
        name: "ss",
        component: () => import("../views/SendService.vue"),
        meta: {
          requiresAuth: true,
          name: "找服务"
        },
      },
      {
        path: "/sdetail/:id",
        name: "sdetail",
        component: () => import("../views/ServiceDetails.vue"),
        meta: {
          requiresAuth: true,
          name: "服务细节"
        },
        props: true,
      },
      {
        path: "/ddetail/:id",
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
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp"),
    meta: { requiresAuth: false },
  },
  {
    path: "/error/:type",
    name: "error",
    component: () => import("../views/Error.vue"),
    meta: { requiresAuth: false },
    props: true,
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404Page.vue"),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

// 导航守卫  全局前置守卫
// 路由元信息
router.beforeEach((to, fromss, next) => {
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
