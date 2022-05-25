<template>
  <header id="header" class="shadow">
    <b-container>
      <b-navbar toggleable="lg" variant="light" class="navbar-dark">
        <b-navbar-brand to="/" class="logo">
          <span class="mt-5">HAPPY HOUSE</span>
          <img src="@/assets/eco-home.png" alt="logo img" />
        </b-navbar-brand>

        <b-navbar-toggle
          target="nav-collapse"
          class="btn btn-success"
        ></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-end">
          <b-navbar-nav>
            <template v-if="userInfo">
              <router-link to="/house">아파트 실거래가 조회</router-link>
              <router-link to="/notice?p=1">게시판</router-link>
              <router-link to="/mypage">마이페이지</router-link>
              <a href="#" @click.prevent="onClickLogout"> 로그아웃 </a>
              <p class="info_text">
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
  mounted() {
    const toggle = document.getElementsByClassName("navbar-toggler");

    //토글 버튼 위에 마우스 올렸을때 메뉴 나오게
    toggle[0].addEventListener("mouseover", () => {
      document.getElementById("nav-collapse").style.display = "block";
    });

    //메뉴 중 하나 클릭하면 메뉴 사라지게
    const menu = document.getElementsByClassName("navbar-nav");
    menu[0].addEventListener("click", () => {
      document.getElementById("nav-collapse").style.display = "none";
    });
  },
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

.bg-light {
  background-color: #fff !important;
}

#header {
  background: #fff;
  transition: all 0.5s;
  z-index: 997;
  height: 100px;
  margin-bottom: 30px;
}

#header .logo {
  font-size: 30px;
  color: #0ca66d;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 1px;
  height: 84px;
  padding: 0;
  line-height: 84px;
}
#header .logo:hover {
  color: #0b8b5c;
}

.scrolled-offset {
  margin-top: 70px;
}

.info_text {
  height: 100%;
  margin: auto;
}
.info_text span {
  font-weight: bold;
  color: #0ca66d;
}

/* 토글 */
.navbar-toggler {
  background-color: #0ca66d;
  border-color: #0ca66d !important;
}
.navbar-toggler > .navbar-toggler-icon {
  background-color: black;
}

.navbar-collapse,
.navbar-collapse ul .info_text {
  z-index: 10;
}

.navbar-collapse ul a,
.navbar-collapse ul .info_text {
  padding: 5px;
  text-align: right;
}

/* 반응형 */
@media (min-width: 768px) and (max-width: 992px) {
  .bg-light {
    height: 100px;
  }
  .navbar-collapse {
    background-color: rgba(255, 255, 255, 0.911);
  }
  .info_text {
    margin: 10px 0;
  }
}
</style>
