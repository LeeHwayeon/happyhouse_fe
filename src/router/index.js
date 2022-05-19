import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "@/views/MainView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import NoticeView from "@/views/NoticeView.vue";
import HouseView from "@/views/HouseView.vue";
import MyPageView from "@/views/MyPageView.vue";

import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeWrite from "@/components/notice/NoticeWrite.vue";
import NoticeModify from "@/components/notice/NoticeModify.vue";
import NoticeDelete from "@/components/notice/NoticeDelete.vue";
import NoticeDetail from "@/components/notice/NoticeDetail.vue";

import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/notice",
    name: "notice",
    component: NoticeView,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeList",
        component: NoticeList,
      },
      {
        path: "write",
        name: "NoticeWrite",
        component: NoticeWrite,
      },
      {
        path: "modify/:nno",
        name: "NoticeModify",
        component: NoticeModify,
      },
      {
        path: "delete/:nno",
        name: "NoticeDelete",
        component: NoticeDelete,
      },
      {
        path: "detail/:nno",
        name: "NoticeDetail",
        component: NoticeDetail,
      },
    ],
  },
  {
    path: "/house",
    name: "house",
    component: HouseView,
    redirect: "/house/list",
    children: [
      {
        path: "list",
        name: "HouseList",
        component: HouseList,
      },
      {
        path: "detail",
        name: "HouseDetail",
        component: HouseDetail,
      },
    ],
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPageView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
