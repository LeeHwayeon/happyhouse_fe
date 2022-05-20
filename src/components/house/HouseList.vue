<template>
  <div>
    <b-row class="search_header mb-4 text-center">
      <b-col cols="2">
        <b-form-select v-model="selectedGu" id="guName" @change="getDong">
          <option
            v-for="(item, index) in gu"
            :key="index"
            :value="item.gugunName"
          >
            {{ item.gugunName }}
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="2">
        <b-form-select id="dongName" v-model="selectedDong" :options="dong">
          <option
            v-for="(item, index) in selectedDongs"
            :key="index"
            :value="item"
          >
            {{ item }}
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
    <div id="map" class="mb-5"></div>
  </div>
</template>

<script>
import http from "@/api/http.js";
export default {
  data() {
    return {
      selectedDongs: [],
      selectedGu: "",
      selectedDong: "",
      aptName: "",
      map: null,
      markers: [],
      aptLists: [],
    };
  },
  created() {
    this.$store.dispatch("getGuGunDong");
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
    gudong() {
      return this.$store.state.gudong;
    },
    dong() {
      return this.$store.state.dong;
    },
    gu() {
      return this.$store.state.gu;
    },
  },
  methods: {
    getDong() {
      console.log(this.selectedGu);
      let results = [];
      for (let i = 0; i < this.gudong.length; i++) {
        if (this.gudong[i].gugunName == this.selectedGu) {
          results.push(this.gudong[i].dongName);
        }
      }
      this.selectedDongs = results;
      console.log(this.selectedDongs);
    },
    search() {
      if (!this.selectedGu && !this.selectedDong && this.aptName.length == 0) {
        alert("검색할 구와 동을 선택하세요!");
      } else if (
        this.selectedGu.length == 0 &&
        this.selectedDong.length == 0 &&
        !this.aptName
      ) {
        alert("검색할 아파트 이름을 입력하세요!");
      } else {
        console.log("선택한 구 :" + this.selectedGu);
        console.log("선택한 동 :" + this.selectedDong);
        console.log("아파트 이름 :" + this.aptName);

        http
          .post("/housedeal/search", {
            // gu: this.selectedGu,
            dongName: this.selectedDong,
            aptName: this.aptName,
          })
          .then((resp) => {
            console.log(resp);
            this.aptLists = resp.data.houseList; //검색 결과
            if (this.aptLists.length == 0) {
              this.$swal({
                icon: "error",
                title: "검색 결과가 없습니다!",
              });
            } else {
              this.displayMarkers(); //마커 표시
            }
          });
      }
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
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },
    displayMarkers() {
      //현재 표시되어 있는 마커들이 있다면 마커에 등록된 map을 없애줌
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
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

        // 인포윈도우를 생성합니다
        // const infowindow = new kakao.maps.InfoWindow({
        //   position: new kakao.maps.LatLng(item.lat, item.lng),
        //   content: `<div class="window">${item.dealAmount.trim()}</div>`,
        // });

        var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.lat, item.lng),
          content: `<div class="window" style="background-color: rgb(250, 150, 84); padding:10px;font-weight: 500;color: #fff;border-radius: 20px;">${item.dealAmount.trim()}</div>`,
          xAnchor: 0.5,
          yAnchor: 2.1,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        // customOverlay.open(this.map, marker);
        customOverlay.setMap(this.map);

        this.markers.push(marker);
      });

      const position = this.aptLists[0];
      this.map.setCenter(new kakao.maps.LatLng(position.lat, position.lng));
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
</style>
