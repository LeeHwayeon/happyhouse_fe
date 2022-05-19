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
                    v-model="id"
                  />
                </td>
              </tr>
              <tr>
                <th><span>비밀번호</span></th>
                <td>
                  <input
                    type="text"
                    placeholder="비밀번호를 입력해주세요."
                    v-model="password"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- join_form E  -->
        <div class="btn_wrap mt-3 mb-0">
          <b-button pill variant="primary" @click="login()">로그인</b-button>
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
import http from "@/api/http.js";
export default {
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    login() {
      http.get;
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
