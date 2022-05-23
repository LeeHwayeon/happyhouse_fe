<template>
  <div>
    <b-row class="search_header mb-4 text-center">
      <b-col cols="2">
        <b-form-select v-model="selectedSido" id="guName" @change="getSido">
          <option
            v-for="(item, index) in sido"
            :key="index"
            :value="item.sidoCode"
          >
            {{ item.sidoName }}
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="2">
        <b-form-select v-model="selectedGu" id="guName" @change="getDong">
          <option
            v-for="(item, index) in gu"
            :key="index"
            :value="item.gugunCode"
          >
            {{ item.gugunName }}
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="2">
        <b-form-select id="dongName" v-model="selectedDong">
          <option
            v-for="(item, index) in dong"
            :key="index"
            :value="item.dongCode"
          >
            {{ item.dongName }}
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="3">
        <b-form-input
          type="text"
          name="aptName"
          id="aptName"
          placeholder="아파트 이름"
          v-model="aptName"
        />
      </b-col>
      <b-col cols="1">
        <b-button id="search_btn" variant="success" @click="search"
          >검색</b-button
        >
      </b-col>
    </b-row>

    <div class="search_content">
      <div id="map" class="mb-5"></div>

      <div class="set_list" style="background-color: transparent">
        <b-button
          class="set_button"
          style="background-color: transparent; border: none"
          ><b-icon
            icon="exclamation-circle-fill"
            variant="success"
            v-b-toggle.my-collapse
          ></b-icon
        ></b-button>

        <div class="m-1">
          <b-collapse id="my-collapse">
            <b-card title="" class="mb-2" style="height: 120px">
              <div>
                <label
                  for="range-01"
                  style="font-weight: bolder; font-size: large"
                  >준공년도</label
                >
                <b-form-input
                  id="range-1"
                  v-model="buildyear"
                  type="range"
                  min="1961"
                  max="2022"
                ></b-form-input>
                <div class="mb-2">준공년도 : {{ buildyear }} 이후</div>
              </div>
            </b-card>
            <b-card title="" class="mb-2" style="height: 120px">
              <div>
                <label
                  for="range-1"
                  style="font-weight: bolder; font-size: large"
                  >매매가</label
                >
                <b-form-input
                  id="range-1"
                  v-model="aptprice"
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                ></b-form-input>
                <div class="mb-2">매매가 : {{ aptprice }}억 이상</div>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </div>

      <div class="search_list">
        <b-card
          v-for="(apt, index) in this.aptLists"
          :key="index"
          class="m-2 shadow"
        >
          <b-row @click="clickDetail(apt.aptCode, apt.dong)">
            <b-col class="img_box" cols="5">
              <img
                :src="require(`@/assets/aptimg/apt${src[index]}.jpg`)"
                :alt="src[index]"
              />
            </b-col>
            <b-col cols="6">
              <b-card-title>{{ apt.dealAmount }}</b-card-title>
              <b-card-text>
                {{ apt.apartmentName }}
              </b-card-text>
              <b-card-text class="small text-muted"
                >{{ apt.area }}m² | {{ apt.floor }}층</b-card-text
              >
            </b-col>
            <b-col cols="1"> </b-col>
          </b-row>
        </b-card>
        <div>
          <b-pagination-nav
            pills
            size="sm"
            :number-of-pages="page"
            base-url=""
            :link-gen="linkGen"
            align="center"
          ></b-pagination-nav>
        </div>
      </div>
    </div>

    <template v-if="this.aptDetail.length > 0">
      <house-detail></house-detail>
    </template>
  </div>
</template>

<script>
import http from "@/api/http.js";
// import axios from "axios";
import HouseDetail from "@/components/house/HouseDetail.vue";

export default {
  components: { HouseDetail },
  data() {
    return {
      page: 1,
      p: 1,
      buildyear: "2000",
      aptprice: 0,
      selectedSido: "",
      selectedGu: "",
      selectedDong: "",
      aptName: "",
      map: null,
      markers: [],
      aptLists: [],
      src: [],
      aptCode: 0,
    };
  },
  created() {
    this.$store.dispatch("getSido");

    //랜덤 숫자 만들어서 이미지 출력하게
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * 9) + 1;
      this.src.push(randomNumber);
    }

    // console.log(this.src);

    // 지하철 리스트 가져오기
    this.$store.dispatch("getSubwayList");

    if (this.$route.query.p != undefined) {
      this.search();
      // console.log(this.aptLists);
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      //스크립트 객체 생성
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      //카카오 지도 api
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=40868a23b3a27c7fee40b3f1358636ca&libraries=services";
      document.head.appendChild(script);
    }
  },
  computed: {
    sido() {
      return this.$store.state.sido;
    },
    dong() {
      return this.$store.state.dong;
    },
    gu() {
      return this.$store.state.gu;
    },
    subwayLists() {
      return this.$store.state.subwayLists;
    },
    aptDetail() {
      return this.$store.state.aptDetail;
    },
  },
  methods: {
    linkGen(pageNum) {
      return `list?p=${pageNum}&si=${this.selectedSido}&gu=${this.selectedGu}&dong=${this.selectedDong}&name=${this.aptName}&buildyear=${this.buildyear}&aptprice=${this.aptprice}`;
    },
    getSido() {
      this.$store.dispatch("getGugun", this.selectedSido);
    },
    getDong() {
      this.$store.dispatch("getDong", this.selectedGu);
    },
    search() {
      this.p = this.$route.query.p != undefined ? this.$route.query.p : 1;

      this.selectedSido =
        this.$route.query.si != undefined && this.selectedSido === ""
          ? this.$route.query.si
          : this.selectedSido;
      this.selectedGu =
        this.$route.query.gu != undefined && this.selectedGu === ""
          ? this.$route.query.gu
          : this.selectedGu;
      this.selectedDong =
        this.$route.query.dong != undefined && this.selectedDong === ""
          ? this.$route.query.dong
          : this.selectedDong;
      this.aptName =
        this.$route.query.name != undefined && this.aptName === ""
          ? this.$route.query.name
          : this.aptName;
      this.buildyear =
        this.$route.query.buildyear != undefined
          ? this.$route.query.buildyear
          : this.buildyear;
      this.aptprice =
        this.$route.query.aptprice != undefined
          ? this.$route.query.aptprice
          : this.aptprice;

      if (
        this.selectedSido != this.$route.query.si ||
        this.$route.query.gu != this.selectedGu ||
        this.$route.query.dong != this.selectedDong ||
        this.$route.query.name != this.aptName
      ) {
        this.p = 1;
        console.log("페이지 초가화" + this.p);
      }

      console.log("현재 페이지" + this.p);
      console.log(this.selectedSido);
      console.log(this.$route.query.si);
      console.log(this.selectedGu);
      console.log(this.$route.query.gu);
      console.log(this.$route.query.gu != this.selectedGu);
      console.log(this.selectedDong);
      console.log(this.$route.query.dong);
      console.log(this.$route.query.dong != this.selectedDong);
      console.log(this.aptName);
      console.log(this.$route.query.name);
      console.log(this.$route.query.name != this.aptName);
      console.log("끝");

      if (this.selectedSido === "" && this.selectedGu === "") {
        // 입력 안했을 떄
        this.$swal({
          icon: "error",
          title: "검색할 시 와 구군을 입력하세요!",
        });
      } else if (
        //시, 구군만 입력했을 떄
        this.selectedSido !== "" &&
        this.selectedGu !== "" &&
        this.selectedDong === "" &&
        this.aptName === ""
      ) {
        console.log("선택한 시 : " + this.selectedSido);
        console.log("선택한 구 : " + this.selectedGu);
        http
          .get(
            "/housedeal/sidogugun/" +
              this.selectedGu +
              "/buildyear/" +
              this.buildyear +
              "/aptprice/" +
              this.aptprice +
              "?p=" +
              this.p
          )
          .then(({ data }) => {
            console.log(data);
            this.aptLists = data.housedealList; //검색 결과
            this.page = data.totalPage;

            this.getLists();
          });
      } else if (
        //시, 구군, 동만 입력했을 때
        this.selectedSido !== "" &&
        this.selectedGu !== "" &&
        this.selectedDong !== "" &&
        this.aptName === ""
      ) {
        console.log("선택한 시 : " + this.selectedSido);
        console.log("선택한 구 : " + this.selectedGu);
        console.log("선택한 동 : " + this.selectedDong);
        http
          .get(
            "/housedeal/dong/" +
              this.selectedGu +
              this.selectedDong +
              "/buildyear/" +
              this.buildyear +
              "/aptprice/" +
              this.aptprice +
              "?p=" +
              this.p
          )
          .then(({ data }) => {
            console.log(data);
            this.aptLists = data.housedealList; //검색 결과
            this.page = data.totalPage;
            this.getLists();
          });
      } else if (
        //시, 구군, 아파트이름만 입력했을 때
        this.selectedSido !== "" &&
        this.selectedGu !== "" &&
        this.selectedDong === "" &&
        this.aptName !== ""
      ) {
        console.log("선택한 시 : " + this.selectedSido);
        console.log("선택한 구 : " + this.selectedGu);
        console.log("아파트 이름 :" + this.aptName);
        http
          .get(
            "/housedeal/guguncode/" +
              this.selectedGu +
              "/buildyear/" +
              this.buildyear +
              "/aptprice/" +
              this.aptprice +
              "/aptname/" +
              this.aptName +
              "?p=" +
              this.p
          )
          .then(({ data }) => {
            console.log(data);
            this.aptLists = data.housedealList; //검색 결과
            this.page = data.totalPage;
            this.getLists();
          });
      } else {
        // 시, 구군, 동, 아파트 이름 전부 입력했을 때
        console.log("선택한 시 :" + this.selectedSido);
        console.log("선택한 구 :" + this.selectedGu);
        console.log("선택한 동 :" + this.selectedDong);
        console.log("아파트 이름 :" + this.aptName);

        http
          .get(
            "/housedeal/dongcode/" +
              this.selectedGu +
              this.selectedDong +
              "/buildyear/" +
              this.buildyear +
              "/aptprice/" +
              this.aptprice +
              "/aptname/" +
              this.aptName +
              "?p=" +
              this.p
          )
          .then(({ data }) => {
            console.log(data);
            this.aptLists = data.housedealList; //검색 결과
            this.page = data.totalPage;
            this.getLists();
          });
      }
    },
    getLists() {
      this.markers.forEach((item) => {
        item.setMap(null);
      });
      const arr = document.getElementsByClassName("window");
      console.log(arr.length);

      for (let i = 0; i < arr.length; i++) {
        arr[i].remove();
      }

      if (this.aptLists.length == 0) {
        this.$swal({ icon: "error", title: "검색 결과가 없습니다!" });
        document.getElementsByClassName("search_list")[0].style.display =
          "none";
        this.page = 1;
      } else {
        this.displayMarkers(); //마커 표시
        document.getElementsByClassName("search_list")[0].style.display =
          "block"; //리스트 목록 보이게
        // this.changeImg();
      }
    },
    changeImg() {
      let randomNumber = Math.floor(Math.random() * 9) + 1;
      const imgArr = [...document.querySelectorAll(".img_box img")];
      console.log(imgArr);

      imgArr.forEach((item) => {
        console.log("item", item);
        item.setAttribute("src", "@/assets/aptimg/apt" + randomNumber + ".jpg");
      });
    },
    // 카카오 지도 맵 생성
    initMap() {
      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

      // console.log("주소 변환 시작하는 부분");
      // console.log("지하철 리스트 들어왔나?", this.subwayLists);

      this.geocode();
    },
    geocode() {
      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();

      const arr = new Array();
      this.subwayLists.forEach((item) => {
        const str = item.tjibun;
        const endIndex = str.indexOf("(");
        const newAddress = str.substring(0, endIndex);
        const splitNewAddress = newAddress.split(" ");
        // console.log(item.tname + " " + newAddress);

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(newAddress, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // console.log(item.tname + " 좌표 : ", coords);
            arr.push({
              tline: item.tline,
              tname: item.tname,
              tsidoName: splitNewAddress[0],
              tgugunName: splitNewAddress[1],
              tdongName: splitNewAddress[2],
              tlng: coords.La,
              tlat: coords.Ma,
            });
          }
        });
      });

      // console.log("주소 변환 잘 됐나??", arr);
      this.startGeocode(arr);
    },
    startGeocode(arr) {
      this.$store.dispatch("getSubwayCoordsList", arr);
    },
    displayMarkers() {
      this.markers.forEach((item) => {
        item.setMap(null);
      });
      const arr = document.getElementsByClassName("window");
      console.log(arr.length);

      for (let i = 0; i < arr.length; i++) {
        arr[i].remove();
      }
      //현재 표시되어 있는 마커들이 있다면 마커에 등록된 map을 없애줌
      if (this.markers.length > 0) {
        // document.getElementsByClassName("window").remove();
      }

      const imageSrc = require("@/assets/building.png"); //마커 이미지
      const imageSize = new kakao.maps.Size(43, 43); //마커 이미지 사이즈
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); //마커 이미지 생성

      this.aptLists.forEach((item) => {
        //마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(item.lat, item.lng), // 마커를 표시할 위치
          title: item.aptName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });

        var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.lat, item.lng),
          content: `<div class="window" style="background: #fb752d;border-radius: 10px;font-weight: 500;color: #fff;padding:10px;">${item.min} ~ ${item.max}</div>`,
          xAnchor: 0.5,
          yAnchor: 2.1,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        customOverlay.setMap(this.map);

        this.markers.push(marker);
      });

      const position = this.aptLists[0];
      this.map.setCenter(new kakao.maps.LatLng(position.lat, position.lng));
    },
    clickDetail(aptCode, dong) {
      this.$store.dispatch("getHouseDetail", aptCode);

      const geocoder = new kakao.maps.services.Geocoder();

      let arr = new Array();
      http.get("/gym/" + dong).then(({ data }) => {
        console.log("axio 데이터", data);

        console.log("데이터 갯수" + data.length);
        for (let i = 0; i < data.length; i++) {
          geocoder.addressSearch(data[i].sjibun, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              arr.push({
                swork: data[i].swork,
                sopen: data[i].sopen,
                sjibun: data[i].sjibun,
                sdoro: data[i].sdoro,
                sname: data[i].sname,
                slat: coords.Ma,
                slng: coords.La,
              });
            }
          });
        }
        // console.log("arr", arr);

        this.$store.dispatch("getGymList", arr);
      });
    },
  },
  filters: {
    setDealAmount: function (value) {
      value.replace(/,/g, ""); //콤마제거후
      // if(value.)
    },
  },
};
</script>

<style scoped>
.search_header {
  display: flex;
  justify-content: center;
  margin: auto;
}

#map {
  width: 100%;
  height: 600px;
  position: relative;
}

.list {
  z-index: 10 !important;
}

.window {
  padding: 10px;
  background-color: rgb(250, 150, 84);
  font-weight: bold;
  color: #fff;
  border-radius: 20px;
}

.window {
  position: relative;
  background: #f58b51;
  border-radius: 50px;
}

.window:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 17px solid transparent;
  border-top-color: #f58b51;
  border-bottom: 0;
  margin-left: -17px;
  margin-bottom: -17px;
}

/* search List */
.search_content {
  position: relative;
}
.set_list {
  display: block;
  overflow: auto;
  width: 30%;

  background-color: rgba(240, 233, 233, 0.849);
  position: absolute;
  top: 7%;
  left: 3.5%;
  z-index: 10;
}

.search_list {
  display: none;
  overflow: auto;
  width: 350px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.849);
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
}
.search_list .card-body {
  padding: 15px;
}

.search_list .card-body .card-title {
  margin: 10px 10px 6px 0;
}
.search_list .card-body p {
  margin-bottom: 5px;
}
.search_list .card-body .img_box {
  width: 100%;
  height: 100px;
}
.search_list .card-body .img_box img {
  width: 100%;
  height: -webkit-fill-available;
}
</style>
