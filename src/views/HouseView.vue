<template>
  <div id="house">
    <house-list></house-list>
  </div>
</template>

<script>
import HouseList from "@/components/house/HouseList.vue";

export default {
  components: {
    HouseList,
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

    this.geocodeSubway();
  },
  created() {
    // 지하철 리스트 가져오기
    this.$store.dispatch("getSubwayList");
  },
  computed: {
    subwayLists() {
      return this.$store.state.subwayLists;
    },
  },
  methods: {
    geocodeSubway() {
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
  },
};
</script>

<style>
#house {
  width: 100%;
  height: auto;
}
</style>
