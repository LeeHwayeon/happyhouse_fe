import jwt_decode from "jwt-decode";
import http from "@/api/http";
// import { login } from "@/api/member.js";
// import { findById } from "../../api/member";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await http.post(`/user/login`, user).then((response) => {
        if (response.data.message === "success") {
          let token = response.data["access-token"];

          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          sessionStorage.setItem("access-token", token);
        } else {
          commit("SET_IS_LOGIN", false);
          commit("SET_IS_LOGIN_ERROR", true);
        }
      });
    },

    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      console.log(decode_token);
      http.defaults.headers["access-token"] =
        sessionStorage.getItem("access-token");
      http
        .get(`/user/info/${decode_token.uid}`)
        .then((response) => {
          if (response.data.message === "success") {
            console.log("로그인 정보");
            console.log(response);
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default userStore;
