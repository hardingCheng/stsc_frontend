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
    userInfo:{},
    activeName:'first',
    qualificationInfo:{},
    realNameCertificationInfo:{},
    num:0
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
    modUserInfo: (state,payload) => {
      state.userInfo = payload.userInfo
    },
    modRealNameCertification: (state,payload) => {
      state.realNameCertificationInfo = payload.realNameCertificationInfo
      if(payload.isRealNameCertification){
        state.userInfo.isRealNameCertification = payload.isRealNameCertification
      }
    },
    modQualification: (state,payload) => {
      state.qualificationInfo = payload.qualificationInfo
      if(payload.isQualification){
        state.userInfo.isQualification = payload.isQualification
      }
    },
    messageActive:(state,payload) =>{
      state.activeName= payload
    }

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
    },
    getRealauth: (state) => {
      return {
        realNameCertificationInfo:state.realNameCertificationInfo,
        qualificationInfo:state.qualificationInfo
      }
    }
  },
  modules: {},
  plugins: [createVuexAlong({
    adapterOptions: SecureAdapter(),
    name: "userInfo1",
    local: {
      list: ["isLogin","userInfo","token","qualificationInfo","realNameCertificationInfo"],
    },
  })]
});
