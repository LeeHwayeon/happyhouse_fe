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
            v-model="user.upass"
            required
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

        <b-form-group id="input-group-4" label="주소" label-for="input-4">
          <b-row>
            <b-col>
              <b-form-select v-model="selectedGu" id="guName" @change="getDong">
                <option
                  v-for="(item, index) in gu"
                  :key="index"
                  :value="item.gugunName"
                >
                  {{ item.gugunName }}
                </option>
              </b-form-select>
            </b-col>
            <b-col>
              <b-form-select
                id="dongName"
                v-model="selectedDong"
                :options="dong"
              >
                <option
                  v-for="(item, index) in selectedDongs"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </b-form-select>
            </b-col>
          </b-row>
        </b-form-group>
      </div>
    </b-card>
    <div class="text-right mb-5 button">
      <b-button type="submit" variant="primary" @click="clickmodify"
        >수정</b-button
      >
      <b-button type="reset" variant="danger" class="ml-2">취소</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      selectedDongs: [],
      selectedGu: "",
      selectedDong: "",
    };
  },
  created() {
    this.$store.dispatch("getGuGunDong");
  },
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
    gudong() {
      return this.$store.state.gudong;
    },
    dong() {
      return this.$store.state.dong;
    },
    gu() {
      return this.$store.state.gu;
    },
  },
  methods: {
    ...mapActions("userStore", ["userConfirm", "getUserInfo"]),
    getDong() {
      console.log(this.selectedGu);
      let results = [];
      for (let i = 0; i < this.gudong.length; i++) {
        if (this.gudong[i].gugunName == this.selectedGu) {
          results.push(this.gudong[i].dongName);
        }
      }
      this.selectedDongs = results;
      console.log(this.selectedDongs);
    },
    clickmodify() {
      if (this.user.upass === "") {
        this.$swal({ icon: "error", title: "비밀번호를 입력하세요.." });
      } else if (this.selectedGu === "" || this.selectedDong === "") {
        this.$swal({ icon: "error", title: "주소를 선택하세요." });
      } else {
        let userDto = {
          uid: this.userInfo.uid,
          upass: this.user.upass,
          uadd: this.selectedGu + " " + this.selectedDong,
        };
        http.put("/user/update", userDto).then(() => {
          let user = {
            uid: this.userInfo.uid,
            upass: this.user.upass,
          };
          sessionStorage.removeItem("access-token");
          this.login(user);
          this.$swal({ icon: "success", title: "정보 수정 성공." });
          this.$router.push("/mypage");
        });
      }
    },
    async login(user) {
      await this.userConfirm(user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
      }
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

/* 카드 */
.card,
.button {
  width: 70%;
  margin: auto;
}
</style>
