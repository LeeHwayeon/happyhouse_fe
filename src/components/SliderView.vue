<template>
  <b-carousel
    id="carousel-1"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    style="text-shadow: 1px 1px 2px #333"
    label-next=""
    label-prev=""
  >
    <!-- Text slides with image -->
    <b-carousel-slide
      :img-src="require('../assets/mainimg1.jpg')"
    ></b-carousel-slide>

    <!-- Slides with custom text -->
    <b-carousel-slide :img-src="require('../assets/mainimg2.jpg')">
    </b-carousel-slide>

    <!-- Slides with image only -->
    <b-carousel-slide
      :img-src="require('../assets/mainimg3.jpg')"
    ></b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {};
</script>

<style scoped>
#carousel-1,
div#carousel-1___BV_inner_.carousel-inner .carousel-item {
  height: 600px;
}
#carousel-1 {
  margin-bottom: 50px;
}

/* 반응형 */
@media (max-width: 992px) {
  #carousel-1,
  div#carousel-1___BV_inner_.carousel-inner .carousel-item {
    height: 100%;
  }
}
</style>
