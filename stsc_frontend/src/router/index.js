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
      },
      {
        path: "/ld",
        name: "ld",
        component: () => import("../views/LookingDemand.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/ls",
        name: "ls",
        component: () => import("../views/LookingService.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sc",
        name: "sc",
        component: () => import("../views/ScienceConsulting.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/pc",
        name: "pc",
        component: () => import("../views/PersonalCenter.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sd",
        name: "sd",
        component: () => import("../views/SendDemand.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/ss",
        name: "ss",
        component: () => import("../views/SendService.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/sdetail/:id",
        name: "sdetail",
        component: () => import("../views/ServiceDetails.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: "/ddetail/:id",
        name: "ddetail",
        component: () => import("../views/DemandDetails.vue"),
        // meta: { requiresAuth: true },
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
// router.beforeEach((to, fromss, next) => {
//   const token = localStorage.getItem("token");
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // 此路由需要身份验证，请检查是否已登录
//     // 如果没有，请重定向到登录页。
//     if (to.name !== "login" && !store.state.token && !token) {
//       Message.error({
//         message: `请先登录！登录后查看！`,
//         duration: 1000,
//         offset:40
//       });
//       setTimeout(() => {
//         next({
//           path: "/login",
//         });
//       }, 2000);
//     } else {
//       next();
//     }
//   } else {
//     next(); // 确保一定要调用 next()
//   }
// });
export default router;
