<template>
  <div class="content">
    <slider-view />
    <b-row class="mb-5">
      <b-col>
        <naver-news-view />
      </b-col>
      <b-col>
        <deal-chart />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NaverNewsView from "@/components/NaverNewsView.vue";
import DealChart from "@/components/DealChart.vue";
import SliderView from "@/components/SliderView.vue";
export default {
  components: {
    NaverNewsView,
    SliderView,
    DealChart,
  },
  created() {
    // this.$store.dispatch("initHouseDetail");
  },
};
</script>

<style></style>
