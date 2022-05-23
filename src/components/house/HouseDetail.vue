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
      </b-row>
      <b-row>
        <b-col> {{ stationName }}역 &nbsp; 거리 : {{ stationDistance }} </b-col>
      </b-row>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    {{ parklist }}
    {{ gymList }}
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
      test: [],
      minGym: [
        {
          sdoro: "",
          sjibun: "",
          sname: "",
          sopen: "",
          swork: "",
          slat: "",
          slng: "",
          sdistance: "",
        },
      ],
      gymLists: [],
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
    subwayCoords() {
      return this.$store.state.subwayCoords;
    },
    stationName() {
      // console.log("computed");
      this.subway();
      // console.log(this.station.tname);
      return this.station.tname;
    },
    parklist() {
      this.getpark();
      return 0;
    },
    gymList() {
      this.getGym();
      return 0;
    },
  },
  methods: {
    //좌표 계산 함수
    getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lng2 - lng1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

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
        .then(() => {
          // console.log(resp);
        });
    },
    getGym() {
      console.log("초기화됨??", this.gymLists);
      let _this = this;

      const geocoder = new kakao.maps.services.Geocoder();

      http.get("/gym/" + this.apt[0].dong).then(({ data }) => {
        console.log("axio 데이터", data);

        let list = new Array();
        let min = 1; // 거리 비교용 min
        console.log("min", min);
        console.log("데이터 갯수" + data.length);
        for (let i = 0; i < data.length; i++) {
          geocoder.addressSearch(data[i].sjibun, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              //거리 비교
              if (
                _this.getDistanceFromLatLonInKm(
                  coords.Ma,
                  coords.La,
                  _this.aptDetail[0].lat,
                  _this.aptDetail[0].lng
                ) < min
              ) {
                min = _this.getDistanceFromLatLonInKm(
                  coords.Ma,
                  coords.La,
                  _this.aptDetail[0].lat,
                  _this.aptDetail[0].lng
                );
                _this.minGym = data[i];
                _this.minGym.sdistance = min;
              }

              if (
                _this.getDistanceFromLatLonInKm(
                  coords.Ma,
                  coords.La,
                  _this.aptDetail[0].lat,
                  _this.aptDetail[0].lng
                ) < 1
              ) {
                console.log("내부", _this.gymLists);
                list.push(data[i]);
              }
              //
            }
          });
        }
        this.gymLists = list;
        console.log("this 데이터");
        console.log(this.minGym);
        console.log(this.minGym.sdistance);
        console.log(this.gymLists);
      });
    },

    subway() {
      this.apt = this.aptDetail;
      // console.log("복사됐나????", this.apt);

      let min = 2;

      this.subwayCoords.forEach((item) => {
        // console.log(this.apt[0].lat);
        // console.log(this.apt[0].lng);
        // console.log(item.tlat);
        // console.log(item.tlng);

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
      // console.log("거리" + min);
      this.stationDistance = min;
      // console.log("역", this.station);
      // this.stationName = this.station.stationName;
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
