<template>
  <div>
    <div>{{ aptDetail[0].apartmentName }}</div>
    <div v-for="(item, index) in aptDetail" :key="index">
      <p>{{ item.dealYear }}</p>
      <p>{{ item.dealAmount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aptDetail: { type: Array },
  },
  data() {
    return {
      // aptDetail: [],
    };
  },
  created() {},
  computed: {},
  watch: {},
};
</script>

<style></style>
