<template>
  <div id="app">
    <header-nav></header-nav>
    <b-container>
      <router-view />
    </b-container>
    <!-- <div id="map"></div> -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import FooterNav from "@/components/FooterNav.vue";

export default {
  data() {
    return {};
  },
  components: {
    HeaderNav,
    FooterNav,
  },
  created() {
    // this.$store.dispatch("getSubwayList");
  },
  computed: {
    // subwayLists() {
    //   return this.$store.state.subwayLists;
    // },
  },
  mounted() {
    // if (window.kakao && window.kakao.maps) {
    //   this.initMap();
    // } else {
    //   //스크립트 객체 생성
    //   const script = document.createElement("script");
    //   /* global kakao */
    //   script.onload = () => kakao.maps.load(this.initMap);
    //   //카카오 지도 api
    //   script.src =
    //     "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=40868a23b3a27c7fee40b3f1358636ca&libraries=services";
    //   document.head.appendChild(script);
    // }
    // // this.geocoder();
  },
  methods: {
    // // 카카오 지도 맵 생성
    // initMap() {
    //   const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    //   const mapOption = {
    //     center: new kakao.maps.LatLng(37.5666805, 126.9784147), // 지도의 중심좌표
    //     level: 5, // 지도의 확대 레벨
    //   };
    //   this.map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    //   // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    //   const mapTypeControl = new kakao.maps.MapTypeControl();
    //   // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    //   // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    //   this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
    //   // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    //   const zoomControl = new kakao.maps.ZoomControl();
    //   this.map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
    // },
    // geocoder() {
    //   // 주소-좌표 변환 객체를 생성합니다
    //   const geocoder = new kakao.maps.services.Geocoder();
    //   const arr = new Array();
    //   this.subwayLists.forEach((item) => {
    //     const str = item.tjibun;
    //     const endIndex = str.indexOf("(");
    //     const newAddress = str.substring(0, endIndex);
    //     console.log(item.tname + " " + newAddress);
    //     // 주소로 좌표를 검색합니다
    //     geocoder.addressSearch(newAddress, function (result, status) {
    //       // 정상적으로 검색이 완료됐으면
    //       if (status === kakao.maps.services.Status.OK) {
    //         const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //         console.log(item.tname + " 좌표 : ", coords);
    //         arr.push({
    //           tline: item.tline,
    //           tname: item.tname,
    //           tjibun: newAddress,
    //           tlng: coords.La,
    //           tlat: coords.Ma,
    //         });
    //       }
    //     });
    //   });
    //   this.$store.dispatch("getSubwayCoordsList", arr);
    // },
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
