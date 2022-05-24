<template>
  <div>
    <b-card class="mb-5 shadow p-4">
      <b-row>
        <b-col>
          <b-card-title>
            <p>{{ aptDetail[0].apartmentName }}</p>
            <div class="img_box">
              <img src="@/assets/aptimg/apt1.jpg" alt="img" />
            </div>
          </b-card-title>
          <b-card-sub-title> </b-card-sub-title>
          <b-card-text>{{ aptDetail[0].buildYear }}</b-card-text>
        </b-col>
        <b-col>
          <table>
            <tr>
              <th>거래일</th>
              <th>거래가격</th>
              <th>면적</th>
              <th>층</th>
            </tr>
            <tr v-for="(item, index) in aptDetail" :key="index">
              <td>
                {{ item.dealYear }}.{{ item.dealMonth }}.{{ item.dealDay }}
              </td>
              <td>{{ item.dealAmount }}</td>
              <td>{{ item.area }}</td>
              <td>{{ item.floor }}</td>
            </tr>
          </table>
        </b-col>
        <b-col>
          <table>
            <tr>
              <th>공원</th>
            </tr>
            <tr v-for="(item, index) in parks" :key="index">
              <td>
                {{ item.pname }}
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <b-col> {{ stationName }}역 &nbsp; 거리 : {{ stationDistance }} </b-col>
      </b-row>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    <div style="display: none">
      {{ parklist }}
      {{ gugunAir }}
    </div>
  </div>
</template>

<script>
import http from "@/api/http";

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
    };
  },
  mounted() {
    //스크립트 객체 생성
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load();
    //카카오 지도 api
    script.src =
      "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=40868a23b3a27c7fee40b3f1358636ca&libraries=services";
    document.head.appendChild(script);
  },
  computed: {
    aptDetail() {
      return this.$store.state.aptDetail;
    },
    gymlist() {
      return this.$store.state.gymlist;
    },
    neargym() {
      return this.$store.state.neargym;
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
    gugunAir() {
      this.gugunair();
      return 0;
    },
  },
  methods: {
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
          console.log(data);

          this.parks = data;
        });
    },
    gugunair() {
      http.get("/air/" + this.aptDetail[0].dongCode).then((resp) => {
        console.log(resp);
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
      this.stationDistance = min;
    },
  },
};
</script>

<style scoped>
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
  width: 60%;
}
</style>
