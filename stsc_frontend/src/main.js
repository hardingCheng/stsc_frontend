import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import element from "./tools/elementui";
import axios from "./api/request";
import VueLazyload from 'vue-lazyload'
import * as echarts from 'echarts'
import infiniteScroll from 'vue-infinite-scroll'
import './styles/index.css'
Vue.use(infiniteScroll)
Vue.use(element);
Vue.use(VueLazyload, {
  preLoad: 1.3,// 预加载高度比例
  loading: "/imgs/loading-svg/loading-bars.svg",
  attempt: 1
})
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
