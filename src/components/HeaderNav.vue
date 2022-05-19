<template>
  <header id="header" class="shadow">
    <b-container>
      <b-navbar
        toggleable="lg"
        type="light"
        variant="light"
        class="navbar-dark"
      >
        <router-link to="/" class="logo">
          <span class="mt-5">HAPPY HOUSE</span>
          <img src="@/assets/eco-home.png" alt="logo img" />
        </router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-end">
          <b-navbar-nav>
            <template v-if="userInfo">
              <router-link to="/house">아파트 실거래가 조회</router-link>
              <router-link to="/notice?p=1">공지사항</router-link>
              <router-link to="/mypage">마이페이지</router-link>
              <a href="#" @click.prevent="onClickLogout"> 로그아웃 </a>
              <p class="info_text align-self-center">
                <span>{{ userInfo.uname }}({{ userInfo.uid }})</span>님
                환영합니다.
              </p>
            </template>
            <template v-else>
              <router-link to="/login">로그인</router-link>
              <router-link to="/signup">회원가입</router-link>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import ms from "@/store/modules/userStore";

export default {
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations("userStore", ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // console.log("memberStore : ", ms);
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      this.$swal({
        icon: "success",
        title: "로그아웃 성공",
      });
      if (this.$route.path != "/") this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100px;
}
.navbar-dark .navbar-nav a {
  color: #333;
  text-decoration: none;
  margin: 10px;
}
.navbar-dark .navbar-brand:hover,
.navbar-dark .navbar-brand:focus,
.navbar-dark .navbar-nav a:hover,
.navbar-dark .navbar-nav a:focus {
  color: #5cb874;
}

header .logo img {
  position: absolute;
  top: 29px;
  height: 35px;
  display: inline-block;
  margin-left: 5px;
}

header,
header .navbar {
  height: 100px;
  margin: auto;
  margin-bottom: 30px;
  top: 0;
  width: 100%;
  line-height: middle;
}

header .navbar-dark .navbar-brand {
  font-weight: 600;
  color: #333;
  font-size: 25px;
}

.navbar-toggler {
  background-color: #0ca66ead;
  border-color: #0ca66ead !important;
}
.navbar-toggler > .navbar-toggler-icon {
  background-color: black;
}

.bg-light {
  background-color: #fff !important;
}

#header {
  background: #fff;
  transition: all 0.5s;
  z-index: 997;
  height: 100px;
}

#header .logo {
  font-size: 30px;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 1px;
}
#header .logo {
  color: #0ca66d;
  text-decoration: none;
}
#header .logo:hover {
  color: #0b8b5c;
}

.scrolled-offset {
  margin-top: 70px;
}

.info_text {
  margin-bottom: 0;
  margin-left: 7px;
}
.info_text span {
  font-weight: bold;
  color: #0ca66d;
}
</style>
