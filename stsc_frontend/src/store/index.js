import Vue from "vue";
import Vuex from "vuex";
import createVuexAlong from 'vuex-along'
import SecureAdapter from "vuex-along-secure-adapter";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    golabelLoding: false,
    formCode:'',
    isLogin:false,
    userInfo:{}
  },
  mutations: {
    modGlobalLoding: (state) => {
      state.golabelLoding = !state.golabelLoding;
    },
    modFormCode: (state,payload) => {
      state.formCode = payload
    },
    modTokenLogin: (state,payload) => {
      state.token = payload.token
      state.isLogin = payload.isLogin
      state.userInfo = payload.userInfo
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
    },
    getUserInfo: (state) => {
      return state.userInfo
    }
  },
  modules: {},
  plugins: [createVuexAlong({
    // adapterOptions: SecureAdapter(),
    name: "userInfo",
    local: {
      list: ["isLogin","userInfo","token"],
    },
  })]
});
