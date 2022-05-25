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

      <b-card class="p-3">
        <b-row>
          <b-col cols="7">
            <div class="map_wrap">
              <div
                id="mapDetail"
                style="position: relative; overflow: hidden"
              ></div>
              <ul id="category">
                <li id="BK9" data-order="0">
                  <span class="category_bg bank"></span>
                  은행
                </li>
                <li id="MT1" data-order="1">
                  <span class="category_bg mart"></span>
                  마트
                </li>
                <li id="PM9" data-order="2">
                  <span class="category_bg pharmacy"></span>
                  약국
                </li>
                <li id="OL7" data-order="3">
                  <span class="category_bg oil"></span>
                  주유소
                </li>
                <li id="CE7" data-order="4">
                  <span class="category_bg cafe"></span>
                  카페
                </li>
                <li id="CS2" data-order="5">
                  <span class="category_bg store"></span>
                  편의점
                </li>
              </ul>
            </div>
          </b-col>
          <b-col cols="5" class="detail_list">
            <b-row align-h="start">
              <h4>지하철 정보</h4>
            </b-row>
            <template v-if="stationDistance < 2000">
              <div>
                가장 가까운 지하철 역 : <strong>{{ stationName }}역</strong>
              </div>
              <div>
                거리 : <strong>{{ stationDistance | numberFormat }}m</strong> (
                <span v-if="stationDistance < 500">약 5분 소요 )</span>
                <span v-else-if="stationDistance < 1000">약 10분 소요 )</span>
                <span v-else>약 15분 소요 )</span>
              </div>
            </template>
            <div v-else>지하철 정보를 업데이트 중입니다.</div>
            <br />
            <b-row align-h="start">
              <h4>헬스장 정보</h4>
            </b-row>
            <div>
              <template v-if="neargym.length == 0">
                <div>1km 이내에 헬스장 정보가 없습니다.</div>
              </template>
              <template v-else>
                <div>
                  가장 가까운 헬스장 : <strong>{{ neargym.sname }}</strong>
                </div>
                <div>
                  거리 :
                  <strong>{{ neargym.sdistance | gymnumberFormat }}m</strong> (
                  <span v-if="neargym.sdistance < 0.3">약 3분 소요 )</span>
                  <span v-else-if="neargym.sdistance < 0.5">약 5분 소요 )</span>
                  <span v-else>약 15분 소요 )</span>
                </div>
              </template>
            </div>
            <br />
            <b-row align-h="start">
              <h4>공원 정보</h4>
            </b-row>
            <div>
              <template v-if="parkDistance < 1000">
                <div>
                  가장 가까운 공원 : <strong>{{ nearPark.pname }}</strong>
                </div>
                <div>
                  거리 :
                  <strong>{{ parkDistance | numberFormat }}m </strong>(
                  <span v-if="parkDistance < 500">약 5분 소요 )</span>
                  <span v-else-if="parkDistance < 1000">약 10분 소요 )</span>
                  <span v-else>약 15분 소요 )</span>
                </div>
              </template>
              <div v-else>공원 정보를 업데이트 중입니다.</div>
            </div>
            <br />
            <br />
            <b-row>
              <h4>미세먼지 정보</h4>
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
      // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
      var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
        contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
        markers = [], // 마커를 담을 배열입니다
        currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다

      const mapContainer1 = document.getElementById("mapDetail"); // 지도를 표시할 div

      const mapOption1 = {
        center: new kakao.maps.LatLng(
          this.aptDetail[0].lat,
          this.aptDetail[0].lng
          // 37.5666805,
          // 126.9784147
        ), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };
      this.mapDetail = new kakao.maps.Map(mapContainer1, mapOption1); // 지도를 생성합니다
      let _this = this;
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places(_this.mapDetail);

      // 지도에 idle 이벤트를 등록합니다
      kakao.maps.event.addListener(_this.mapDetail, "idle", searchPlaces);

      // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
      contentNode.className = "placeinfo_wrap";

      // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
      // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
      addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
      addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

      // 커스텀 오버레이 컨텐츠를 설정합니다
      placeOverlay.setContent(contentNode);

      // 각 카테고리에 클릭 이벤트를 등록합니다
      addCategoryClickEvent();

      // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
      function addEventHandle(target, type, callback) {
        if (target.addEventListener) {
          target.addEventListener(type, callback);
        } else {
          target.attachEvent("on" + type, callback);
        }
      }

      // 카테고리 검색을 요청하는 함수입니다
      function searchPlaces() {
        if (!currCategory) {
          return;
        }

        // 커스텀 오버레이를 숨깁니다
        placeOverlay.setMap(null);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        console.log(pagination);

        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
          displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        } else if (status === kakao.maps.services.Status.ERROR) {
          // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        }
      }
      // placesSearchCB();

      // 지도에 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
        // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
        var order = document
          .getElementById(currCategory)
          .getAttribute("data-order");

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = addMarker(
            new kakao.maps.LatLng(places[i].y, places[i].x),
            order
          );

          // 마커와 검색결과 항목을 클릭 했을 때
          // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
          (function (marker, place) {
            kakao.maps.event.addListener(marker, "click", function () {
              displayPlaceInfo(place);
            });
          })(marker, places[i]);
        }
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, order) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(_this.mapDetail); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
      function displayPlaceInfo(place) {
        var content =
          '<div class="placeinfo" style="margin-bottom:140px;position:relative;width:100%;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;padding-bottom: 10px;background: #fff;">' +
          '   <a style="color:#fff;text-decoration: none;font-weight: bold; font-size:14px;border-radius: 6px 6px 0 0;margin: -1px -1px 0 -1px;padding:10px; color: #fff;background: #d95050;background: #d95050 no-repeat right 14px center;display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" class="title" href="' +
          place.place_url +
          '" target="_blank" title="' +
          place.place_name +
          '">' +
          place.place_name +
          "</a>";

        if (place.road_address_name) {
          content +=
            '    <span style="margin:5px 5px 0 5px;cursor: default;font-size:13px;display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" title="' +
            place.road_address_name +
            '">' +
            place.road_address_name +
            "</span>" +
            '  <span style="color:#999;font-size:11px;margin-top:0;display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" class="jibun" title="' +
            place.address_name +
            '">(지번 : ' +
            place.address_name +
            ")</span>";
        } else {
          content +=
            '    <span style="display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" title="' +
            place.address_name +
            '">' +
            place.address_name +
            "</span>";
        }

        content +=
          '    <span style="color:#0f7833;display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" class="tel">' +
          place.phone +
          "</span>" +
          "</div>" +
          `<div class="after" style="display:none;"></div>`;

        contentNode.innerHTML = content;
        placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
        placeOverlay.setMap(_this.mapDetail);
      }

      // 각 카테고리에 클릭 이벤트를 등록합니다
      function addCategoryClickEvent() {
        var category = document.getElementById("category"),
          children = category.children;

        for (var i = 0; i < children.length; i++) {
          children[i].onclick = onClickCategory;
        }
      }

      // 카테고리를 클릭했을 때 호출되는 함수입니다
      function onClickCategory() {
        var id = this.id,
          className = this.className;

        placeOverlay.setMap(null);

        if (className === "on") {
          currCategory = "";
          changeCategoryClass();
          removeMarker();
        } else {
          currCategory = id;
          changeCategoryClass(this);
          searchPlaces();
        }
      }

      // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
      function changeCategoryClass(el) {
        var category = document.getElementById("category"),
          children = category.children,
          i;

        for (i = 0; i < children.length; i++) {
          children[i].className = "";
        }

        if (el) {
          el.className = "on";
        }
      }

      this.aptMarkers();
      this.gymMarkers();
      this.parkMarkers();
      this.subwayMarkers();
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
    subwayMarkers() {
      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(
        this.station.tlat,
        this.station.tlng
      );

      const imageSrc = require("@/assets/subway.png"); //마커 이미지
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
        this.station.tname +
        "," +
        this.station.tlat +
        "," +
        this.station.tlng +
        '" target="_blank" style="background: #fc5f67;border-radius: 10px;font-weight: 500;color: #fff;padding: 5px 5px 3px 5px;font-size:13px">' +
        '    <span class="title">' +
        this.station.tname +
        "</span>" +
        "  </a>" +
        "</div>";

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(
        this.station.tlat,
        this.station.tlng
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
    gymMarkers() {
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
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
