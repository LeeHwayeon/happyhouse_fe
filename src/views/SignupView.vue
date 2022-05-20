<template>
  <div class="wrap wd668">
    <div class="container">
      <div class="form_txtInput">
        <h2 class="sub_tit_txt">회원가입</h2>
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
                  <b-form-group>
                    <input
                      type="text"
                      placeholder="ID 를 입력하세요."
                      v-model="user.id"
                      @keyup="checkId"
                    />
                    <span id="id_check" class="exform_txt"
                      >아이디는 6자이상 15자이하로 작성해주세요</span
                    >
                    <span id="id_check_success" class="exform_txt"
                      >사용 가능한 아이디 입니다.</span
                    >
                    <span
                      id="id_check_fail"
                      class="exform_txt"
                      style="color: red"
                      >사용 불가능한 아이디 입니다.</span
                    >
                  </b-form-group>
                </td>
              </tr>
              <tr>
                <th><span>이름</span></th>
                <td>
                  <input
                    type="text"
                    placeholder="이름을 입력하세요."
                    v-model="user.name"
                  />
                </td>
              </tr>
              <tr>
                <th><span>비밀번호</span></th>
                <td>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    @keyup="checkPassword"
                    v-model="user.password"
                  />
                </td>
              </tr>
              <tr>
                <th><span>비밀번호 확인</span></th>
                <td>
                  <input
                    type="password"
                    placeholder="비밀번호를 확인하세요"
                    @keyup="checkPassword"
                    v-model="user.repassword"
                  />
                  <span id="pass_check" class="exform_txt" style="color: red"
                    >비밀번호가 일치하지 않습니다.</span
                  >
                </td>
              </tr>
              <tr>
                <th><span>생년월일</span></th>
                <td>
                  <b-row>
                    <b-col>
                      <input
                        type="text"
                        id="yy"
                        v-model="yy"
                        class="int"
                        maxlength="4"
                        placeholder="년(4자)"
                      />
                    </b-col>
                    <b-col>
                      <b-form-select id="mm" v-model="mm">
                        <option value="01">1월</option>
                        <option value="02">2월</option>
                        <option value="03">3월</option>
                        <option value="04">4월</option>
                        <option value="05">5월</option>
                        <option value="06">6월</option>
                        <option value="07">7월</option>
                        <option value="08">8월</option>
                        <option value="09">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                      </b-form-select>
                    </b-col>
                    <b-col>
                      <input
                        type="text"
                        id="dd"
                        v-model="dd"
                        class="int"
                        maxlength="2"
                        placeholder="일"
                      />
                    </b-col>
                  </b-row>
                </td>
              </tr>
              <tr>
                <th><span>성별</span></th>
                <td>
                  <b-form-select v-model="user.gender" id="gender">
                    <option
                      v-for="(item, index) in genders"
                      :key="index"
                      :value="item.value"
                    >
                      {{ item.text }}
                    </option>
                  </b-form-select>
                </td>
              </tr>

              <tr>
                <th><span>주소</span></th>
                <td>
                  <b-form-group id="input-group-4" label-for="input-4">
                    <b-row>
                      <b-col>
                        <b-form-select
                          v-model="selectedSido"
                          id="guName"
                          @change="getSido"
                        >
                          <option
                            v-for="(item, index) in sido"
                            :key="index"
                            :value="item.sidoCode"
                          >
                            {{ item.sidoName }}
                          </option>
                        </b-form-select>
                      </b-col>
                      <b-col>
                        <b-form-select
                          v-model="selectedGu"
                          id="guName"
                          @change="getDong"
                        >
                          <option
                            v-for="(item, index) in gu"
                            :key="index"
                            :value="item.gugunCode"
                          >
                            {{ item.gugunName }}
                          </option>
                        </b-form-select>
                      </b-col>
                      <b-col>
                        <b-form-select id="dongName" v-model="selectedDong">
                          <option
                            v-for="(item, index) in dong"
                            :key="index"
                            :value="item.dongCode"
                          >
                            {{ item.dongName }}
                          </option>
                        </b-form-select>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="exform_txt">
            <span>표시는 필수적으로 입력해주셔야 가입이 가능합니다.</span>
          </div>
        </div>
        <!-- join_form E  -->

        <div class="btn_wrap">
          <b-button pill variant="primary" @click="check">회원가입</b-button>
        </div>
      </div>
      <!-- form_txtInput E -->
    </div>
    <!-- content E-->
  </div>
  <!-- container E -->
</template>

<script>
import http from "@/api/http";
export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
        repassword: "",
        name: "",
        birth: "",
        address: "",
        gender: "",
      },
      yy: "",
      mm: "",
      dd: "",
      genders: [
        {
          value: "men",
          text: "남자",
        },
        {
          value: "women",
          text: "여자",
        },
      ],
      selectedSido: "",
      selectedGu: "",
      selectedDong: "",
    };
  },
  created() {
    this.$store.dispatch("getSido");
  },
  computed: {
    sido() {
      return this.$store.state.sido;
    },
    dong() {
      return this.$store.state.dong;
    },
    gu() {
      return this.$store.state.gu;
    },
  },

  methods: {
    getSido() {
      this.$store.dispatch("getGugun", this.selectedSido);
    },
    getDong() {
      this.$store.dispatch("getDong", this.selectedGu);
    },
    checkId() {
      console.log(this.user.id.length);
      if (this.user.id.length < 6 || this.user.id.length > 15) {
        console.log(this.user.id.length);
        document.getElementById("id_check").style.display = "block";
      } else if (6 <= this.user.id.length && this.user.id.length <= 15) {
        http.get("/user/idcheck/" + this.user.id).then((reps) => {
          document.getElementById("id_check").style.display = "none";
          if (reps.data === "SUCCESS") {
            document.getElementById("id_check_success").style.display = "block";
            document.getElementById("id_check_fail").style.display = "none";
          } else {
            document.getElementById("id_check_success").style.display = "none";
            document.getElementById("id_check_fail").style.display = "block";
          }
        });
      }
    },
    checkPassword() {
      if (this.user.password != this.user.repassword) {
        document.getElementById("pass_check").style.display = "block";
      } else {
        document.getElementById("pass_check").style.display = "none";
      }
    },
    check() {
      if (this.user.id === "") {
        this.$swal({ icon: "error", title: "아이디를 입력하세요." });
      } else if (this.user.name === "") {
        this.$swal({ icon: "error", title: "이름을 입력하세요." });
      } else if (this.user.password === "") {
        this.$swal({ icon: "error", title: "비밀번호를 입력하세요." });
      } else if (this.user.repassword === "") {
        this.$swal({ icon: "error", title: "비밀번호를 확인해주세요." });
      } else if (this.yy === "") {
        this.$swal({ icon: "error", title: "생년월일을 입력하세요." });
      } else if (this.mm === "") {
        this.$swal({ icon: "error", title: "생년월일을 입력하세요." });
      } else if (this.dd === "") {
        this.$swal({ icon: "error", title: "생년월일을 입력하세요." });
      } else if (this.user.gender === "") {
        this.$swal({ icon: "error", title: "성별 입력하세요." });
      } else if (this.selectedSido === "") {
        this.$swal({ icon: "error", title: "주소를 입력하세요." });
      } else if (this.selectedGu === "") {
        this.$swal({ icon: "error", title: "주소를 입력하세요." });
      } else if (this.selectedDong === "") {
        this.$swal({ icon: "error", title: "주소를 입력하세요." });
      } else {
        this.signup();
      }
    },
    signup() {
      let userDto = {
        uid: this.user.id,
        upass: this.user.password,
        uname: this.user.name,
        uadd: "",
        ugender: this.user.gender,
        ubirth: this.yy + "." + this.mm + "." + this.dd,
      };

      let addcode = this.selectedGu + this.selectedDong;
      http.get("/code/addcode/" + addcode).then((resp) => {
        userDto.uadd =
          resp.data.sidoName +
          " " +
          resp.data.gugunName +
          " " +
          resp.data.dongName;
        if (this.user.id.length < 6 || this.user.id.length > 15) {
          this.$swal({
            icon: "error",
            title: "아이디를 다시 확인해주세요.",
          });
        } else if (6 <= this.user.id.length && this.user.id.length <= 15) {
          http.get("/user/idcheck/" + this.user.id).then((reps) => {
            document.getElementById("id_check").style.display = "none";
            if (reps.data === "SUCCESS") {
              if (this.user.password != this.user.repassword) {
                this.$swal({
                  icon: "error",
                  title: "비밀번호를 다시 확인해주세요.",
                });
              } else {
                http.post("/user/sign", userDto).then(() => {
                  this.$swal({
                    icon: "success",
                    title: "회원가입 성공.",
                  });
                  this.$router.push("/login");
                });
              }
            } else {
              this.$swal({
                icon: "error",
                title: "아이디를 다시 확인해주세요.",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
table,
tr,
td,
th,
div,
p,
em,
ol,
ul,
li,
dl,
dt,
dd,
a,
address,
img,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 11pt;
  color: #666;
  text-decoration: none;
}
img {
  border: 0;
}
h1 {
  float: left;
  padding: 0 0 0 0px;
}
h2 {
  padding: 0 0 0 0px;
}
ul,
li {
  list-style: none;
}
ul {
  list-style: none;
}
.red_txt {
  color: #ee7272;
}
.blind {
  display: block;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: -5000px;
}
.wrap {
  max-width: 960px;
  margin: 0 auto;
}
.wrap.wd668 {
  max-width: 628px;
}
.wrap.wd668.line {
  border: 1px solid #ececec;
  padding: 30px 20px;
}
.container {
  width: 100%;
}
.sub_tit_txt {
  margin: 80px 0 20px 20px;
  color: #2f2f2f;
  font-size: 25px;
}
.wrap.wd668.line .sub_tit_txt {
  margin: 0px 0 20px 20px;
}
.con_term .term_txt {
  border: 1px solid #ececec;
  padding: 30px;
  height: 210px;
  overflow-y: auto;
  margin: 0 0 15px;
}
.con_term .term_txt ul li,
.con_term .term_txt p,
.con_term .term_txt div {
  color: #818181;
  font-size: 12px;
  line-height: 17px;
  margin: 0 0 15px;
}
.left_margin {
  margin: 0 0 0 20px;
}
.con_term .term_txt div.txt_bold {
  font-weight: bold;
  margin: 0 0 25px;
}
.btn_wrap {
  text-align: center;
  margin: 40px 0 30px;
}
.btn_wrap a {
  color: #fff;
  background-color: #4380ce;
  font-weight: bold;
  padding: 10px;
  height: 30px;
  line-height: 30px;
  width: 168px;
  display: block;
  text-align: center;
  margin: 0 auto;
}
.btn_wrap a.wide {
  width: 587px;
  margin: 0 0 0 20px;
}
.find_txt ul li {
  color: #9a9a9a;
  font-size: 13px;
  text-align: center;
  line-height: 17px;
  margin: 0 0 20px;
}
.form_txtInput .checkbox_wrap {
  position: relative;
  padding: 5px;
  text-align: right;
}
.form_txtInput .checkbox_wrap input[type="checkbox"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.form_txtInput .checkbox_wrap input[type="checkbox"] + label {
  display: inline-block;
  line-height: 14px;
  position: relative;
  padding-left: 20px;
  font-size: 13px;
  color: #818181;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.form_txtInput .checkbox_wrap input[type="checkbox"] + label:before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0;
  width: 12px;
  height: 12px;
  text-align: center;
  background: #fff;
  border: 1px solid #c2c2c2;
}
.form_txtInput .checkbox_wrap input[type="checkbox"] + label:active:before,
.checkbox_wrap input[type="checkbox"]:checked + label:active:before {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}
.form_txtInput .checkbox_wrap input[type="checkbox"]:checked + label:before {
  background: #fff;
  border-color: #ddd;
}
.form_txtInput .checkbox_wrap input[type="checkbox"]:checked + label:after {
  content: "✓";
  color: #0094ff;
  position: absolute;
  top: 0px;
  left: 2px;
  width: 7px;
  height: 7px;
  font-size: 13px;
  font-weight: bold;
}
.exTxt {
  font-size: 14px;
  color: #9a9a9a;
  display: block;
  margin: 0 0 45px 20px;
}
.join_form {
  width: 100%;
  max-width: 668px;
}
.join_form table {
  border-spacing: 0;
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
}
.join_form table input {
  border: 1px solid #ececec;
  font-size: 14px;
  color: #4c4c4c;
  height: 35px;
  padding: 10px;
  width: 100%;
  float: left;
}

.join_form.idpwFind table input {
  width: 519px;
}

.join_form.idpwFind table input.phone {
  width: 182px;
  margin: 0 12px 0 11px;
}
.join_form.idpwFind table input.phone2 {
  width: 182px;
}
.join_form table input.send_number {
  width: 383px;
}
.join_form table th span {
  color: #404040;
  font-size: 14px;
  display: inline-block;
  position: relative;
  padding: 0 10px 0 0;
  text-indent: 20px;
}
.join_form table th {
  text-align: left;
}
.join_form table td {
  padding: 6px 0;
  position: relative;
}
.join_form table th span:after {
  content: "*";
  font-size: 13px;
  color: #f95427;
  position: absolute;
  top: 0;
  right: 0px;
}
.join_form.idpwFind table th span:after {
  content: none;
}
.join_form table td a.btn_confirm {
  display: inline-block;
  float: left;
  width: 115px;
  height: 48px;
  margin: 5px 0 0 0px;
  border: 1px solid #cfcfcf;
  background: #dedede;
  color: #626262;
  text-align: center;
  vertical-align: top;
  line-height: 50px;
}
.join_form.idpwFind table td select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(https://secsales.interparkb2b.co.kr/data/G94/main/sele_arr.gif)
    no-repeat 95% 50%;
  text-indent: 20px;
  width: 124px;
  height: 50px;
  border: 1px solid #ececec;
  font-size: 14px;
  color: #ccc;
  float: left;
}
.join_form.idpwFind table td select::-ms-expand {
  display: none;
}
.join_form.idpwFind table td tr.phone td select {
  text-align: center;
  text-indent: 10px;
}

.mar10:after,
.join_form.idpwFind table td select:after,
.join_form table td a.btn_confirm:after {
  content: "";
  display: block;
  clear: both;
}
.agree_wrap {
  margin: 36px 0 0;
}
.agree_wrap .checkbox_wrap {
  text-align: left;
}
::placeholder {
  color: #c4c4c4;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #c4c4c4 !important;
}
::-ms-input-placeholder {
  color: #c4c4c4 !important;
}
.mar27 {
  margin: 27px 0 0;
}
.mar10 {
  margin: 14px 5px 0 10px;
  display: inline-block;
  padding: 0;
  float: left;
}
.exform_txt {
  padding: 12px 0 19px 0;
  text-align: right;
  color: #9a9a9a;
  font-size: 13px;
  border-bottom: 1px solid #ececec;
}
.exform_txt span {
  display: inline-block;
  position: relative;
  padding-left: 10px;
}
.exform_txt span:after {
  content: "*";
  position: absolute;
  left: 0;
  top: 0;
  color: #f95427;
  font-size: 13px;
  font-weight: bold;
}
.explan_txt {
  margin: 3px 0 0 22px;
}
.explan_txt li {
  color: #b2b2b2;
  font-size: 13px;
  line-height: 17px;
}
.popWrap {
  border: 1px solid #ececec;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  margin: 30px auto 0;
  display: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  z-index: 5;
}
.popWrap.is-open {
  display: block;
}
.popWrap .pop_txt_con .pop_exTxt {
  font-size: 14px;
  color: #9a9a9a;
  line-height: 20px;
}
.popWrap .pop_txt_con .pop_exTxt span {
  color: #254ee9;
}
.popWrap .pop_btnWrap {
  margin: 30px 0 0;
}
.popWrap .pop_btnWrap a {
  color: #fff;
  background-color: #4380ce;
  font-weight: bold;
  padding: 10px;
  height: 22px;
  line-height: 22px;
  width: 103px;
  display: block;
  text-align: center;
}
.join_form table input.send_number::placeholder {
  text-align: right;
}
.join_form table input.send_number:-ms-input-placeholder {
  text-align: right;
}
.join_form table input.send_number::-ms-input-placeholder {
  text-align: right;
}
.overlayer {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}
.overlayer.is-open {
  display: block;
}
@media (max-width: 1023px) {
  .wrap {
    margin: 30px auto;
  }
  .wrap,
  .wrap.wd668.line {
    max-width: 80vw;
  }
  .wrap.wd668 {
    width: 90vw;
  }
  .join_form {
    max-width: 90vw;
  }
  .join_form table th span {
    text-indent: 0;
    font-size: 13px;
  }
  .join_form table {
    width: 100%;
  }
  .join_form table input {
    border: 1px solid #ececec;
    font-size: 14px;
    color: #4c4c4c;
    height: 37px;
    padding: 10px;
    width: 100%;
  }

  .join_form.idpwFind table input {
    width: 100%;
  }

  .mar10 {
    margin: 5px 2% 0 2%;
    float: left;
  }

  .join_form.idpwFind table input.phone {
    width: 30%;
    margin: 0 4% 0 4%;
  }
  .join_form.idpwFind table input.phone2 {
    width: 31%;
  }
  .join_form table input.send_number {
    width: 53%;
  }
  .exTxt {
    margin: 0 0 25px 0px;
  }
  .wrap.wd668.line .sub_tit_txt,
  .wrap .sub_tit_txt {
    margin: 0 0 10px 0;
  }
  .btn_wrap a,
  .btn_wrap a.wide {
    width: auto;
    margin: 0;
  }
  .btn_wrap {
    overflow: hidden;
  }
  .join_form.idpwFind table td select {
    width: 30%;
    height: 37px;
    float: left;
  }

  .mar10:after,
  .join_form.idpwFind table td select:after {
    content: "";
    display: block;
    clear: both;
  }
  .popWrap {
    right: auto;
    max-width: 80vw;
    margin: 30px auto 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .join_form table td a.btn_confirm {
    width: 100px;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    margin: 5px 0 0;
  }
  .join_form table input.send_number + a {
    margin: 0 0 0 5px;
  }
}

#id_check,
#id_check_success,
#id_check_fail,
#pass_check {
  display: none;
}
</style>
