import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    golabelLoding: false,
    formCode:'',
    isLogin:true
  },
  mutations: {
    modGlobalLoding: (state) => {
      state.golabelLoding = !state.golabelLoding;
    },
    modFormCode: (state,payload) => {
      state.formCode = payload
    },
    modTokenLogin: (state,payload) => {
      state.token = "payload"
      state.isLogin = true
    },
  },
  actions: {},
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getFormCode: (state) => {
      return state.formCode
    },
    getIsLogin: (state) => {
      return state.isLogin
    }
  },
  modules: {},
});
