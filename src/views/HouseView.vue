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
};
</script>

<style>
#house {
  width: 100%;
  height: auto;
}
</style>
