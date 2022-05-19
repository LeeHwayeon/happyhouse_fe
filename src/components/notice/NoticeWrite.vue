<template>
  <div id="notice">
    <h4 class="mb-4 title">글쓰기</h4>
    <div>
      <b-form-group id="input-group-1" class="mb-3">
        <b-form-input
          id="title"
          v-model="title"
          type="text"
          placeholder="제목을 입력하세요."
          required
          ref="title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" class="mb-5">
        <b-form-textarea
          id="textarea-rows"
          v-model="content"
          placeholder="내용을 입력하세요."
          rows="8"
          required
          ref="content"
          @keyup.13="checkValue"
        ></b-form-textarea>
      </b-form-group>

      <div class="text-right">
        <b-button type="submit" variant="success" @click="checkValue"
          >등록</b-button
        >
        <b-button type="submit" variant="primary" @click="onList"
          >목록</b-button
        >
        <b-button type="reset" variant="secondary" @click="onReset"
          >Reset</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 onSubmit 호출
    checkValue() {
      if (!this.title) {
        this.$swal({
          icon: "error",
          text: "제목을 입력해주세요!",
        });
      } else if (!this.content) {
        this.$swal({
          icon: "error",
          text: "내용을 입력해주세요!",
        });
      } else {
        this.onSubmit();
      }
    },
    onSubmit() {
      http
        .post("/notice/write", {
          nwriter: this.userInfo.uid,
          ntitle: this.title,
          ncontext: this.content,
        })
        .then((resp) => {
          console.log(resp);
          this.$swal({
            icon: "success",
            title: "게시글 등록성공",
          });
          this.$router.push("/notice");
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.title = "";
      this.content = "";
    },
    onList() {
      this.$router.push("/notice");
    },
  },
};
</script>

<style scoped>
.title::after {
  content: "";
  display: block;
  width: 70px;
  height: 4px;
  background-color: #0b8b5c;
  margin-top: 10px;
}
button {
  margin-right: 10px;
}
</style>
