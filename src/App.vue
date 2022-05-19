<template>
  <div id="app">
    <header-nav></header-nav>
    <b-container>
      <router-view />
    </b-container>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import FooterNav from "@/components/FooterNav.vue";

export default {
  components: {
    HeaderNav,
    FooterNav,
  },
};
</script>

<style>
/* 폰트 import */
@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap);

/* 전체 적용 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "IBM Plex Sans KR", sans-serif;
}

a {
  text-decoration: none;
  color: #5cb874;
}

a:hover {
  color: #80c792;
  text-decoration: none;
}

h6,
.h6,
h5,
.h5,
h4,
.h4,
h3,
.h3,
h2,
.h2,
h1,
.h1 {
  margin: 0;
}

.swal2-styled.swal2-confirm {
  background-color: #0ca66d !important;
}
#swal2-title {
  padding-top: 30px;
  font-size: 27px;
}
/* dd */
</style>
