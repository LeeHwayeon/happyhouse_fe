<template>
  <div class="content"></div>
</template>

<script>
import http from "@/api/http.js";

export default {
  data() {
    return {};
  },
  created() {
    http.get("/housedeal/deal10").then(({ data }) => {
      console.log(data);
    });
  },
};
</script>

<style scoped></style>
