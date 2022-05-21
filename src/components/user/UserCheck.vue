<template>
  <div class="bv-example-row p-4">
    <b-row class="justify-content-md-center mb-3">
      <b-col col lg="2"></b-col>
      <b-col cols="12" md="auto" class="m-4"> <h2>비밀번호 확인</h2></b-col>
      <b-col col lg="2"></b-col>
    </b-row>

    <b-row class="justify-content-md-center mb-3">
      <b-col col lg="2"></b-col>
      <b-col cols="12" md="auto" class="m-4">
        <h5>
          개인 정보 조회를 위해서는 인증이 필요합니다. <br />
          비밀번호 입력 후 확인 버튼을 클릭해 주세요.
        </h5></b-col
      >
      <b-col col lg="2"></b-col>
    </b-row>

    <b-card class="mb-4">
      <!-- <h5>개인 정보 조회를 위해서는 인증이 필요합니다.</h5>
      <h5>비밀번호 입력 후 확인 버튼을 클릭해 주세요.</h5> -->
      <div class="mypage-content">
        <b-form-group id="input-group-2" label="비밀번호" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="userpassword"
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      userpassword: "",
    };
  },
  methods: {
    clickok() {
      if (this.userInfo.upass == this.userpassword) {
        this.$router.push("/modify");
      } else {
        this.$swal({ icon: "error", title: "비밀번호가 맞지 않습니다." });
      }
    },
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
};
</script>

<style scoped>
.user-img {
  margin: auto;
  text-align: center;
}
.user-img img {
  width: 90px;
}

.card,
.button {
  width: 50%;
  margin: auto;
}
</style>
