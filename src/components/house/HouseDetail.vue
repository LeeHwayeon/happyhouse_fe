<template>
  <div>
    <b-card class="mb-5 shadow p-4">
      <b-card-title class="row">
        <b-col cols="4" style="display: inline-block">
          <p style="display: inline-block">{{ aptDetail[0].apartmentName }}</p>
        </b-col>
        <b-col cols="3"> </b-col>
        <b-col cols="1" style="padding: 0">
          <img
            src="@/assets/planet-earth.png"
            alt="eco"
            class="eco-img"
          />건강지수
        </b-col>
        <b-col cols="4">
          <b-form-rating
            id="rating-readonly"
            :value="health"
            readonly
            show-value
            variant="success"
          ></b-form-rating>
        </b-col>
      </b-card-title>

      <b-row class="text-center mb-3">
        <b-col>
          <div class="img_box">
            <img src="@/assets/aptimg/apt1.jpg" alt="img" />
          </div>
          <b-card-text>준공년도 : {{ aptDetail[0].buildYear }}</b-card-text>
        </b-col>
        <b-col>
          <table class="notice-list">
            <colgroup>
              <col style="width: 25%" />
              <col style="width: 30%" />
              <col style="width: 25%" />
              <col style="width: 20%" />
            </colgroup>
            <tr>
              <th>거래일</th>
              <th>거래가격(만원)</th>
              <th>면적(m²)</th>
              <th>층</th>
            </tr>
            <tr v-for="(item, index) in aptDetail" :key="index">
              <td>
                {{ item.dealYear }}.{{ item.dealMonth }}.{{ item.dealDay }}
              </td>
              <td>{{ item.dealAmount }}</td>
              <td>{{ item.area }}m²</td>
              <td>{{ item.floor }}층</td>
            </tr>
          </table>
        </b-col>
      </b-row>

      <b-card>
        <b-row>
          <b-col sm="7"><div id="mapDetail"></div></b-col>
          <b-col sm="5">
            <b-row align-h="start">
              <h3>지하철 정보</h3>
            </b-row>
            <b-row align-h="start">
              <template v-if="stationDistance < 2000">
                <div>
                  {{ stationName }}역 &nbsp; 거리 :
                  {{ stationDistance | numberFormat }}m (
                </div>
                <div v-if="stationDistance < 500">약 5분 소요)</div>
                <div v-else-if="stationDistance < 1000">약 10분 소요)</div>
                <div v-else>약 15분 소요)</div>
              </template>
              <div v-else>지하철 정보를 업데이트 중입니다.</div>
            </b-row>
            <br />
            <br />
            <b-row align-h="start">
              <h3>헬스장 정보</h3>
            </b-row>
            <b-row align-h="start">
              <template v-if="neargym.length == 0">
                <div>1km 이내에 헬스장 정보가 없습니다.</div>
              </template>
              <template v-else>
                <div>
                  헬스장 : {{ neargym.sname }} &nbsp; 거리 :
                  {{ neargym.sdistance | gymnumberFormat }}m (
                </div>
                <div v-if="neargym.sdistance < 0.3">약 3분 소요)</div>
                <div v-else-if="neargym.sdistance < 0.5">약 5분 소요)</div>
                <div v-else>약 15분 소요)</div>
              </template>
            </b-row>
            <br />
            <br />
            <b-row align-h="start">
              <h3>공원 정보</h3>
            </b-row>
            <b-row align-h="start">
              <template v-if="parkDistance < 1000">
                <div>
                  {{ nearPark.pname }}역 &nbsp; 거리 :
                  {{ parkDistance | numberFormat }}m (
                </div>
                <div v-if="parkDistance < 500">약 5분 소요)</div>
                <div v-else-if="parkDistance < 1000">약 10분 소요)</div>
                <div v-else>약 15분 소요)</div>
              </template>
              <div v-else>공원 정보를 업데이트 중입니다.</div>
            </b-row>
            <br />
            <br />
            <b-row>
              <h3>미세먼지 정보</h3>
            </b-row>
            <b-row>
              <b-col><dust-chart /></b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-card>
    <div style="display: none">
      {{ score }}
      {{ parklist }}
      <!-- {{ init }} -->
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
import DustChart from "@/components/house/DustChart.vue";

export default {
  data() {
    return {
      sortBy: "dealYear",
      sortDesc: false,
      apt: [],
      station: [],
      stationDistance: 0,
      air: [],
      parks: [],
      mapDetail: null,
      parkDistance: 0,
      nearPark: [],
      health: "",
    };
  },
  components: {
    DustChart,
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      console.log("111");
    } else {
      console.log("222");
      //스크립트 객체 생성
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      //카카오 지도 api
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?appkey=40868a23b3a27c7fee40b3f1358636ca";
      document.head.appendChild(script);
    }
  },
  computed: {
    aptDetail() {
      return this.$store.state.aptDetail;
    },
    gymlist() {
      return this.$store.state.gymlist;
    },
    neargym() {
      return this.$store.state.neargymList;
    },
    subwayCoords() {
      return this.$store.state.subwayCoords;
    },
    stationName() {
      this.subway();
      return this.station.tname;
    },
    parklist() {
      this.getpark();
      return 0;
    },
    score() {
      this.calScore();
      return this.health;
    },
    // init() {
    //   this.initMap();
    //   return 0;
    // },
  },
  methods: {
    calScore() {
      let result = 0;

      let mise = this.$store.state.dustRank;
      if (mise <= 5) {
        result += 100;
      } else if (mise <= 10) {
        result += 80;
      } else if (mise <= 15) {
        result += 60;
      } else if (mise <= 20) {
        result += 40;
      } else {
        result += 20;
      }

      let gym = this.neargym.sdistance;
      if (gym <= 0.1) {
        result += 100;
      } else if (gym <= 0.2) {
        result += 80;
      } else if (gym <= 0.3) {
        result += 60;
      } else if (gym <= 0.4) {
        result += 40;
      } else if (gym <= 0.5) {
        result += 20;
      }

      let park = this.parkDistance;
      console.log("parkd", park);
      if (park <= 200) {
        result += 100;
      } else if (park <= 400) {
        result += 80;
      } else if (park <= 600) {
        result += 60;
      } else if (park <= 800) {
        result += 40;
      } else if (park <= 1000) {
        result += 20;
      }
      this.health = (result + 200) / 100;
    },
    //좌표 계산 함수
    getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
      var R = 6371;
      var dLat = deg2rad(lat2 - lat1);
      var dLon = deg2rad(lng2 - lng1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;

      return d;
    },
    //공원 가져오기
    getpark() {
      http
        .get(
          "/park/" +
            this.aptDetail[0].dong +
            "/lat/" +
            this.aptDetail[0].lat +
            "/lng/" +
            this.aptDetail[0].lng
        )
        .then(({ data }) => {
          // console.log("park", data);

          let min = 1;

          this.parks = data;
          this.parks.forEach((item) => {
            if (
              this.getDistanceFromLatLonInKm(
                this.apt[0].lat,
                this.apt[0].lng,
                item.plat,
                item.plng
              ) < min
            ) {
              min = this.getDistanceFromLatLonInKm(
                this.apt[0].lat,
                this.apt[0].lng,
                item.plat,
                item.plng
              );
              this.nearPark = item;
            }
          });
          this.parkDistance = min * 1000;
        });
    },
    subway() {
      this.apt = this.aptDetail;
      console.log(this.apt);
      let min = 2;

      this.subwayCoords.forEach((item) => {
        if (
          this.getDistanceFromLatLonInKm(
            this.apt[0].lat,
            this.apt[0].lng,
            item.tlat,
            item.tlng
          ) < min
        ) {
          min = this.getDistanceFromLatLonInKm(
            this.apt[0].lat,
            this.apt[0].lng,
            item.tlat,
            item.tlng
          );
          this.station = item;
        }
      });
      this.stationDistance = min * 1000;
    },
    // 카카오 지도 맵 생성
    initMap() {
      const mapContainer1 = document.getElementById("mapDetail"); // 지도를 표시할 div

      const mapOption1 = {
        center: new kakao.maps.LatLng(
          this.aptDetail[0].lat,
          this.aptDetail[0].lng
          // 37.5666805,
          // 126.9784147
        ), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      this.mapDetail = new kakao.maps.Map(mapContainer1, mapOption1); // 지도를 생성합니다
      this.aptMarkers();
      this.gymMarkers();
      this.parkMarkers();
    },
    aptMarkers() {
      // 마커가 표시될 위치입니다
      var markerPosition1 = new kakao.maps.LatLng(
        this.apt[0].lat,
        this.apt[0].lng
      );
      const imageSrc = require("@/assets/building.png"); //마커 이미지
      const imageSize = new kakao.maps.Size(45, 45); //마커 이미지 사이즈
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); //마커 이미지 생성

      //마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: this.mapDetail, // 마커를 표시할 지도
        position: markerPosition1, // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.mapDetail);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var content =
        '<div class="customoverlay" style="margin-bottom:48px;">' +
        '  <a href="https://map.kakao.com/link/map/' +
        this.apt[0].apartmentName +
        "," +
        this.apt[0].lat +
        "," +
        this.apt[0].lng +
        '" target="_blank" style="background: #fc5f67;border-radius: 10px;font-weight: 500;color: #fff;padding: 5px 5px 3px 5px;font-size:13px">' +
        '    <span class="title">' +
        this.apt[0].apartmentName +
        "</span>" +
        "  </a>" +
        "</div>";

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(this.apt[0].lat, this.apt[0].lng);

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: this.mapDetail,
        position: position,
        content: content,
        yAnchor: 1,
      });

      customOverlay.setMap(this.mapDetail);
    },
    gymMarkers() {
      console.log("neargym", this.neargym);

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(
        this.neargym.slat,
        this.neargym.slng
      );

      const imageSrc = require("@/assets/gym.png"); //마커 이미지
      const imageSize = new kakao.maps.Size(45, 45); //마커 이미지 사이즈
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); //마커 이미지 생성

      //마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: this.mapDetail, // 마커를 표시할 지도
        position: markerPosition, // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.mapDetail);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var content =
        '<div class="customoverlay" style="margin-bottom:45px;">' +
        '  <a href="https://map.kakao.com/link/map/' +
        this.neargym.sname +
        "," +
        this.neargym.slat +
        "," +
        this.neargym.slng +
        '" target="_blank" style="background: #fc5f67;border-radius: 10px;font-weight: 500;color: #fff;padding: 5px 5px 3px 5px;font-size:13px">' +
        '    <span class="title">' +
        this.neargym.sname +
        "</span>" +
        "  </a>" +
        "</div>";

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(
        this.neargym.slat,
        this.neargym.slng
      );

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: this.mapDetail,
        position: position,
        content: content,
        yAnchor: 1,
      });

      customOverlay.setMap(this.mapDetail);
    },
    parkMarkers() {
      // 마커가 표시될 위치입니다
      console.log("공원 마커");
      console.log(this.nearPark.plat);
      console.log(this.nearPark.plng);
      var markerPosition = new kakao.maps.LatLng(
        this.nearPark.plat,
        this.nearPark.plng
      );
      const imageSrc = require("@/assets/park.png"); //마커 이미지
      const imageSize = new kakao.maps.Size(45, 45); //마커 이미지 사이즈
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); //마커 이미지 생성

      //마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: this.mapDetail, // 마커를 표시할 지도
        position: markerPosition, // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.mapDetail);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var content =
        '<div class="customoverlay" style="margin-bottom:45px;">' +
        '  <a href="https://map.kakao.com/link/map/' +
        this.nearPark.pname +
        "," +
        this.nearPark.plat +
        "," +
        this.nearPark.plng +
        '" target="_blank" style="background: #fc5f67;border-radius: 10px;font-weight: 500;color: #fff;padding: 5px 5px 3px 5px;font-size:13px">' +
        '    <span class="title">' +
        this.nearPark.pname +
        "</span>" +
        "  </a>" +
        "</div>";

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(
        this.nearPark.plat,
        this.nearPark.plng
      );

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: this.mapDetail,
        position: position,
        content: content,
        yAnchor: 1,
      });

      customOverlay.setMap(this.mapDetail);
    },
  },
  watch: {
    apt() {
      this.apt;
    },
  },
  beforeUpdate() {
    console.log("updated");
    this.$nextTick(function () {
      this.initMap();
    });
  },
  filters: {
    numberFormat: (value, numFix) => {
      value = parseFloat(value);
      if (!value) return "0";
      return value.toFixed(numFix);
    },
    gymnumberFormat: (value, numFix) => {
      value = parseFloat(value) * 1000;
      if (!value) return "0";
      return value.toFixed(numFix);
    },
  },
};
</script>

<style scoped>
.notice-list {
  width: 100%;
  margin: auto;
}
.notice-list th {
  font-size: 18px;
}
.notice-list tr {
  font-size: 17px;
  height: 25px;
  border-bottom: 1px solid #9c9c9c;
}
.notice-list tr td a {
  color: #0b8b5c;
}
.notice-list tr td a:hover {
  color: #086442;
}

/* 페이지네이션 */
.page-item.active .page-link {
  background-color: #0b8b5c !important;
  border-color: #0b8b5c !important;
}

#mapDetail {
  width: 100%;
  height: 600px;
  /* position: relative; */
}

.card {
  border-radius: 20px;
}
table {
  width: 100%;
}
.card-title p {
  font-size: 30px;
  color: #0ca66d;
}
.card-title p::after {
  display: block;
  content: "";
  width: 80%;
  height: 3px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #0ca66d;
}
.img_box {
  margin-bottom: 20px;
}
.img_box img {
  width: 90%;
}

.eco-img {
  display: inline-block;
  width: 30px;
  height: 30px;
}
</style>
