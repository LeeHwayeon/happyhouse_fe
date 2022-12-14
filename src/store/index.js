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
    dustList: [],
    dustRank: "",
    dustGuName: "",
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
      state.neargym = payload.list;
      state.gymList = payload.arr;
      state.neargymList = payload.minGym;
    },
    INIT_HOUSE_DETAIL(state) {
      state.aptDetail = [];
    },
    GET_DUST(state, payload) {
      state.dustList = [];
      state.dustGuName = payload.results[0].agugunName;
      payload.results.forEach((item) => {
        state.dustList.push(item.adust);
      });
      state.dustRank = payload.rank;
    },
    INIT_DATA(state) {
      state.neargymList = [];
      state.neargym = [];
      state.gymList = [];
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
      // console.log("?????? ?????? ?????????", arr);
      commit("GET_SUBWAY_COORDS_LIST", arr);
    },
    getHouseDetail({ commit }, aptCode) {
      http.get("/housedeal/detail/" + aptCode).then(({ data }) => {
        commit("GET_HOUSE_DETAIL", data);
      });
    },
    getGymList({ commit }, data) {
      console.log("list ????????????", data);
      commit("GET_GYM_LIST", data);
    },
    initHouseDetail({ commit }) {
      commit("INIT_HOUSE_DETAIL");
    },
    getDust({ commit }, data) {
      commit("GET_DUST", data);
    },
    initData({ commit }) {
      commit("INIT_DATA");
    },
  },
  modules: {
    userStore,
  },
  plugins: [
    createPersistedState({
      // ???????????? ????????? ???????????? ?????? localStorage??? ?????? sessionStorage??? ??????. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
