import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import userStore from "@/store/modules/userStore";
import http from "@/api/http.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gudong: [],
    gu: [],
    dong: [],
  },
  getters: {},
  mutations: {
    GET_GUGUN_DONG(state, payload) {
      state.gudong = payload.gudong;
      state.gu = payload.gugun;
    },
  },
  actions: {
    getGuGunDong({ commit }) {
      http.get("/code").then(({ data }) => {
        console.log(data);
        commit("GET_GUGUN_DONG", data);
      });
    },
  },
  modules: {
    userStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
