<template>
  <b-row class="m-3 comment-write">
    <b-col cols="11">
      <b-form-textarea
        id="comment"
        placeholder="답글"
        v-model="ccontent"
        rows="2"
      ></b-form-textarea>
    </b-col>
    <b-col cols="1"
      ><b-button variant="outline-success" class="h-100" @click="registComment"
        >등록</b-button
      ></b-col
    >
  </b-row>
</template>

<script>
import http from "@/api/http.js";
export default {
  data() {
    return {
      ccontent: "",
    };
  },
  props: {
    nno: { type: Number },
  },
  methods: {
    registComment() {
      let comment = {
        nno: this.nno,
        ccontent: this.ccontent,
        cwriter: "admin",
      };
      console.log("댓글 작성");
      console.log(this.nno);
      http.post("/comment/write", comment).then(() => {
        this.$swal({
          icon: "success",
          title: "댓글 등록성공",
        });
        this.$router.push("/notice/list");
      });
    },
  },
};
</script>

<style scoped>
.col-11,
.col-1 {
  padding: 0;
}

.col-1 {
  text-align: center;
}
</style>
