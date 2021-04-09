import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    golabelLoding: false,
  },
  mutations: {
    modGlobalLoding(state) {
      state.golabelLoding = !state.golabelLoding;
    },
  },
  actions: {},
  modules: {},
});
