<template>
  <div>
    <div class="mypage-title">
      <h2>My Page</h2>
      <div class="user-img">
        <img src="@/assets/comment_user.png" alt="user image" />
      </div>
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

      <b-form-group id="input-group-1" label="이름" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="userInfo.uname"
          type="email"
          required
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="주소" label-for="input-1">
        <b-form-select
          id="inline-form-custom-select-pref"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="[{ text: 'Choose...', value: null }, 'One', 'Two', 'Three']"
          :value="null"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">수정</b-button>
      <b-button type="reset" variant="danger">탈퇴</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations("userStore", ["SET_IS_LOGIN", "SET_USER_INFO"]),
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
</style>
