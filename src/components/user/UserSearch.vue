<template>
  <div class="bv-example-row p-4">
    <b-row class="justify-content-md-center mb-3">
      <b-col col lg="2"></b-col>
      <b-col cols="12" md="auto" class="m-4"> <h2>비밀번호 찾기</h2></b-col>
      <b-col col lg="2"></b-col>
    </b-row>

    <b-row class="justify-content-md-center mb-3">
      <b-col col lg="2"></b-col>
      <b-col cols="12" md="auto" class="m-4">
        <h5>
          개인 정보 조회를 위해서는 인증이 필요합니다. <br />
          아이디와 이름을 입력 후 확인 버튼을 클릭해 주세요.
        </h5></b-col
      >
      <b-col col lg="2"></b-col>
    </b-row>

    <b-card class="mb-4">
      <!-- <h5>개인 정보 조회를 위해서는 인증이 필요합니다.</h5>
      <h5>비밀번호 입력 후 확인 버튼을 클릭해 주세요.</h5> -->
      <div class="mypage-content">
        <b-form-group id="input-group-2" label="아이디" label-for="input-2">
          <b-form-input
            id="input-2"
            type="text"
            v-model="uid"
            required
            @keyup.13="clickok"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="이름" label-for="input-2">
          <b-form-input
            id="input-2"
            type="text"
            v-model="uname"
            required
            @keyup.13="clickok"
          ></b-form-input>
        </b-form-group>
      </div>
    </b-card>
    <div class="text-right mb-5 button">
      <b-button type="submit" variant="success" @click="clickok">확인</b-button>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  data() {
    return {
      uid: "",
      uname: "",
    };
  },
  methods: {
    clickok() {
      console.log(this.uid);
      console.log(this.uname);

      if (this.uid === "" || this.uname === "") {
        this.$swal({ icon: "error", title: "회원정보를 입력해주세요." });
      } else {
        http.get("/user/search/" + this.uid + "/" + this.uname).then((reps) => {
          console.log("res", reps);

          if (reps.data === "SUCCESS") {
            console.log("DDD");
            http.put("/user/updatepass", this.uid).then((resp) => {
              console.log(resp.data);
              if (resp.data !== "FAIL") {
                this.$swal({
                  icon: "success",
                  title:
                    "- 새로운 비밀번호 : " +
                    resp.data +
                    "입니다. - 새로운 비밀번호로 로그인 해주세요.",
                });
                this.$router.push("/login");
              } else {
                this.$swal({ icon: "error", title: "비밀번호 수정 실패." });
              }
            });
          } else {
            this.$swal({ icon: "error", title: "회원정보를 확인해주세요." });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.card,
.button {
  width: 60%;
  margin: auto;
}
.card-body {
  margin: 20px;
}
</style>
