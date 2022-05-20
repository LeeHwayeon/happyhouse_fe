import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import userStore from "@/store/modules/userStore";
import http from "@/api/http.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sido: [],
    gu: [],
    dong: [],
  },
  getters: {},
  mutations: {
    GET_SIDO(state, payload) {
      state.sido = payload;
    },
    GET_GUGUN(state, payload) {
      state.gu = payload;
    },
    GET_DONG(state, payload) {
      state.dong = payload;
    },
  },
  actions: {
    getSido({ commit }) {
      http.get("/code").then(({ data }) => {
        commit("GET_SIDO", data);
      });
    },
    getGugun({ commit }, sidocode) {
      http.get("/code/gugun/" + sidocode).then(({ data }) => {
        commit("GET_GUGUN", data);
      });
    },
    getDong({ commit }, guguncode) {
      http.get("/code/dong/" + guguncode).then(({ data }) => {
        commit("GET_DONG", data);
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
