<template>
  <div class="bv-example-row">
    <b-row class="justify-content-md-center mb-3">
      <b-col col lg="2"></b-col>
      <b-col cols="12" md="auto" class="m-4"> <h2>My page</h2></b-col>
      <b-col col lg="2"></b-col>
    </b-row>
    <b-card tag="article" class="mb-4">
      <div class="user-img mt-3 mb-4">
        <img src="@/assets/comment_user.png" alt="user image" />
      </div>

      <div class="mypage-content">
        <b-form-group id="input-group-1" label="아이디" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="userInfo.uid"
            type="email"
            placeholder="Enter email"
            disabled
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="비밀번호" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="userInfo.upass"
            required
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="이름" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="userInfo.uname"
            type="email"
            required
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="시도" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="userInfo.uadd"
            type="email"
            required
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
    </b-card>
    <div class="text-right mb-5 button">
      <b-button type="submit" variant="success" @click="moveModify"
        >수정</b-button
      >
      <b-button type="reset" variant="danger" @click="userDelete" class="ml-2"
        >탈퇴</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import http from "@/api/http";

export default {
  data() {
    return {
      user: {
        uid: "",
        upass: "",
        uname: "",
        ubirth: "",
        ugender: "",
        uadd: "",
      },
    };
  },
  created() {
    // this.$store.dispatch("initHouseDetail");
  },
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations("userStore", ["SET_IS_LOGIN", "SET_USER_INFO"]),
    moveModify() {
      this.$router.push("/check");
    },
    userDelete() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          http.delete("/user/delete/" + this.userInfo.uid).then(() => {
            this.SET_IS_LOGIN(false);
            this.SET_USER_INFO(null);
            sessionStorage.removeItem("access-token");
            if (this.$route.path != "/") this.$router.push("/");
            this.$swal("Deleted!", "Your file has been deleted.", "success");
          });
        }
      });
    },
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
  width: 70%;
  margin: auto;
}
</style>
