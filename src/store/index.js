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
    subwayLists: [],
    subwayCoords: [],
    aptDetail: [],
    gymList: [],
    neargym: [],
    neargymList: [],
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
    GET_SUBWAY_LIST(state, payload) {
      state.subwayLists = payload;
    },
    GET_SUBWAY_COORDS_LIST(state, payload) {
      state.subwayCoords = payload;
    },
    GET_HOUSE_DETAIL(state, payload) {
      state.aptDetail = payload;
    },
    GET_GYM_LIST(state, payload) {
      console.log("store", payload);
      state.neargym = payload.list;
      state.gymList = payload.arr;
      state.neargymList = payload.minGym;
      console.log("2store,,,,,,", state.gymList);
    },
    NEAR_GYM_LIST(state, payload) {
      state.neargymList = payload;
    },
    NEAR_GYM(state, payload) {
      state.neargym = payload;
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
    getSubwayList({ commit }) {
      http.get("/subway").then(({ data }) => {
        // console.log(data);
        commit("GET_SUBWAY_LIST", data);
      });
    },
    getSubwayCoordsList({ commit }, arr) {
      // console.log("주소 변환 들어옴", arr);
      commit("GET_SUBWAY_COORDS_LIST", arr);
    },
    getHouseDetail({ commit }, aptCode) {
      http.get("/housedeal/detail/" + aptCode).then(({ data }) => {
        commit("GET_HOUSE_DETAIL", data);
      });
    },
    getGymList({ commit }, data) {
      console.log("list 찍어보자", data);
      commit("GET_GYM_LIST", data);
    },
    NearGym({ commit }, data) {
      commit("NEAR_GYM", data);
    },
    NearGymList({ commit }, data) {
      commit("NEAR_GYM_LIST", data);
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
