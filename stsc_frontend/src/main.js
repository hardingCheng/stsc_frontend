import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Select } from "element-ui";
import axios from "./api/apiList";
Vue.use(Button);
Vue.use(Select);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
