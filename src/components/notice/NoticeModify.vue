<template>
  <div>
    <h4 class="mb-4 title">글수정</h4>
    <div>
      <b-form-group id="input-group-1" class="mb-3">
        <b-form-input
          id="title"
          v-model="item.ntitle"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" class="mb-5">
        <b-form-textarea
          id="textarea-rows"
          v-model="item.ncontext"
          rows="8"
          required
        ></b-form-textarea>
      </b-form-group>

      <div class="text-right">
        <b-button type="submit" variant="success" @click="checkValue(item.nno)"
          >수정</b-button
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
export default {
  data() {
    return {
      item: [],
    };
  },
  created() {
    let num = this.$route.params.nno;
    console.log("수정할 데이터 번호");
    console.log(num);
    http.get("/notice/ajax/read/" + num).then((response) => {
      this.item = response.data.board;
      console.log(this.item);
    });
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 onSubmit 호출
    checkValue(nno) {
      if (!this.item.ntitle) {
        this.$swal({
          icon: "error",
          text: "제목을 입력해주세요!",
        });
      } else if (!this.item.ncontext) {
        this.$swal({
          icon: "error",
          text: "내용을 입력해주세요!",
        });
      } else {
        this.onSubmit(nno);
      }
    },
    onSubmit(nno) {
      http.post("/notice/ajax/update/" + nno, this.item).then(() => {
        this.$swal({
          icon: "success",
          title: "게시글 수정성공",
        });
        this.$router.push("/notice/list");
      });
    },
    onReset(event) {
      console.log("안눌려??");
      event.preventDefault();
      // Reset our form values
      this.item.ntitle = "";
      this.item.ncontext = "";
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
