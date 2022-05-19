<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$swal({
      icon: "success",
      title: "게시글 삭제 성공",
    });
    this.$router.push("/notice");
  },
};
</script>

<style></style>
