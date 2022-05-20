<template>
  <div class="wrap wd668">
    <div class="container">
      <div class="form_txtInput">
        <h2 class="sub_tit_txt">로그인</h2>
        <div class="join_form">
          <table>
            <colgroup>
              <col width="30%" />
              <col width="auto" />
            </colgroup>
            <tbody>
              <tr>
                <th><span>아이디</span></th>
                <td>
                  <input
                    type="text"
                    placeholder="ID 를 입력하세요."
                    v-model="user.uid"
                  />
                </td>
              </tr>
              <tr>
                <th><span>비밀번호</span></th>
                <td>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    v-model="user.upass"
                    @keyup.13="login"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="exform_txt"
            v-if="userInfo == null && this.logincount != 0"
          >
            <span style="color: red" class="mt-0"
              >아이디와 비밀번호가 일치하지 않습니다.</span
            >
          </div>
        </div>
        <!-- join_form E  -->
        <div class="btn_wrap mt-3 mb-0">
          <b-button pill variant="success" @click="login()">로그인</b-button>
        </div>
        <div class="exform_txt">
          <router-link to=""
            ><span style="color: gray" class="mt-0"
              >Forgot your password?</span
            ></router-link
          ><br />
        </div>
      </div>
      <!-- form_txtInput E -->
    </div>
    <!-- content E-->
  </div>
  <!-- container E -->
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        uid: null,
        upass: null,
      },
      logincount: 0,
    };
  },
  computed: {
    ...mapState("userStore", ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions("userStore", ["userConfirm", "getUserInfo"]),
    async login() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push("/");
        this.$swal({
          icon: "success",
          title: "로그인 성공",
        });
        this.logincount = 0;
      }
      this.logincount++;
      console.log(this.logincount);
    },
  },
};
</script>

<style scoped>
.join_form table th span:after {
  content: "";
  font-size: 13px;
  color: gray;
  position: absolute;
  top: 0;
  right: 0px;
}

.exform_txt {
  padding: 12px 0 19px 0;
  text-align: center;
  color: #9a9a9a;
  font-size: 13px;
}
.exform_txt span {
  display: inline-block;
  position: relative;
  padding-left: 10px;
}
.exform_txt span:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  color: #f95427;
  font-size: 13px;
  font-weight: bold;
}
</style>
