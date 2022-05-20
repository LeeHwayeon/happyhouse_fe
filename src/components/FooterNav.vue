<template>
  <!-- ======= Footer ======= -->
  <footer id="footer">
    <b-container>
      <h3>Happy House</h3>
      <p>부동산 중개 사이트로 이동하기</p>
      <div class="social-links">
        <b-link
          href="https://www.peterpanz.com/?filter=latitude:37.6182925~37.6337067%7C%7Clongitude:126.7030871~126.7273129&zoomLevel=16&center=%7B%22y%22:37.626,%22_lat%22:37.626,%22x%22:126.7152,%22_lng%22:126.7152%7D&dong=&gungu="
        >
          <b-img :src="require('../assets/peterpan.png')" link />
          <!-- <p class="name">피터팬의 <br />좋은방 구하기</p> -->
        </b-link>
        <b-link href="https://www.zigbang.com/">
          <b-img :src="require('../assets/zigbang.png')" />
          <!-- <p class="name">직방<br />&nbsp;</p> -->
        </b-link>
        <b-link href="https://www.dabangapp.com/"
          ><b-img :src="require('../assets/dabang.png')" />
          <!-- <p class="name">다방<br />&nbsp;</p> -->
        </b-link>
      </div>
      <div class="copyright">
        &copy; Copyright <strong><span>SSAFY</span></strong
        >. All Rights Reserved
      </div>
    </b-container>
  </footer>
  <!-- End Footer -->
</template>

<script>
export default {};
</script>

<style scoped>
#footer {
  font-size: 14px;
  text-align: center;
  padding: 30px 0;
  background-color: #5cb87580;
}
#footer h3 {
  font-size: 28px;
  font-weight: 600;
  position: relative;
  padding: 0;
  margin: 0 0 35px 0;
  color: #0ca66d;
}
#footer h3::after {
  content: "";
  display: block;
  background-color: #0ca66d;
  width: 200px;
  height: 3px;
  margin: auto;
  margin-top: 5px;
}
#footer > .container > p {
  font-size: 16px;
  /* font-style: italic; */
  padding: 0;
  font-weight: 500;
  margin: 0 0 6px 0;
  color: #2d2d2db0;
}
#footer .social-links {
  margin: 0 0 30px 0;
}
#footer .social-links p {
  height: 30px;
  font-size: 13px;
  margin: 0;
  color: #2d2d2db0;
  display: inline-block;
}
/* #footer .social-links a:nth-child(2) p,
#footer .social-links a:nth-child(3) p {
  line-height: 30px;
} */
#footer .social-links a {
  font-size: 18px;
  display: inline-block;
  color: #2d2d2db0;
  line-height: 1;
  border-radius: 10px;
  text-align: center;
  /* width: 85px; */
  transition: 0.3s;
  text-decoration: none;
  margin: 3px;
}
#footer .social-links a img {
  height: 40px;
}
#footer .social-links a:hover {
  background: #449d5c81;
  color: #2d2d2db0;
  text-decoration: none;
}
#footer .copyright {
  margin: 0 0 5px 0;
  color: #2d2d2db0;
}
#footer .credits {
  font-size: 13px;
}
</style>
