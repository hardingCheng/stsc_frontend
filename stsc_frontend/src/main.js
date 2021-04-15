import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import element from "./tools/elementui";
import axios from "./api/apiList";
import VueLazyload from 'vue-lazyload'

Vue.use(element);
Vue.use(VueLazyload, {
  preLoad: 1.3,// 预加载高度比例
  error: '/assets/audio.svg',// 图片路径错误时加载图片   未来是ui给设计
  loading: '/assets/audio.svg',
  attempt: 1
})
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
