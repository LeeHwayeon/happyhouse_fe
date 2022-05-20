<template>
  <div class="content">
    <slider-view />
    <b-row class="mb-5">
      <b-col>
        <naver-news-view />
      </b-col>
      <b-col> d </b-col>
    </b-row>
  </div>
</template>

<script>
import NaverNewsView from "@/components/NaverNewsView.vue";
import SliderView from "@/components/SliderView.vue";
export default {
  components: {
    NaverNewsView,
    SliderView,
  },
};
</script>

<style></style>
