<template>
  <div class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col lg="2"></b-col>
      <b-col cols="12" md="auto" class="m-4"> <h2>게시판</h2></b-col>
      <b-col col lg="2"></b-col>
    </b-row>

    <b-row class="mb-5">
      <b-col></b-col>
      <b-col cols="10"><router-view></router-view></b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
