<template>
  <div>
    <b-row align-h="end" class="mt-3 mb-4">
      <b-col cols="10">
        <b-row>
          <b-col cols="5">
            <b-form-input
              v-model="keyword"
              type="text"
              placeholder="검색할 내용을 입력하세요."
              @keyup="searchNotice"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="2" class="text-right"
        ><b-button variant="outline-success" @click="moveWrite"
          >글작성</b-button
        ></b-col
      >
    </b-row>
    <b-row class="text-center mb-3">
      <b-col>
        <table class="notice-list">
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 60%" />
            <col style="width: 20%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.nno }}</td>
              <td>
                <a href="#" @click="moveView(item.nno)">{{ item.ntitle }}</a>
              </td>
              <td>{{ item.ndate }}</td>
              <td>{{ item.ncount }}</td>
            </tr>
          </tbody>
        </table>

        <!-- <b-table striped hover :items="items" :fields="fields">
          </b-table> -->
      </b-col>
    </b-row>

    <b-row class="text-center" id="pn" v-if="this.keyword.length > 0">
      <b-col></b-col>
      <b-col cols="5"
        ><div class="mt-3">
          <b-pagination-nav
            pills
            :number-of-pages="page"
            base-url=""
            :link-gen="linkGenSearch"
          ></b-pagination-nav></div
      ></b-col>
      <b-col></b-col>
    </b-row>
    <b-row class="text-center" id="pn" v-else>
      <b-col></b-col>
      <b-col cols="5"
        ><div class="mt-3">
          <b-pagination-nav
            pills
            :number-of-pages="page"
            base-url=""
            :link-gen="linkGen"
          ></b-pagination-nav></div
      ></b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  data() {
    return {
      page: 1,
      items: [],
      keyword: "",
    };
  },
  created() {
    let keyword = this.$route.query.keyword;

    if (this.keyword == "" && keyword == undefined) this.getList();
    else {
      this.getListSearch(keyword);
    }
  },
  methods: {
    linkGen(pageNum) {
      return `list?p=${pageNum}`;
    },
    linkGenSearch(pageNum) {
      return `list?p=${pageNum}&keyword=${this.keyword}`;
    },

    moveView(nno) {
      let p = this.$route.query.p != undefined ? this.$route.query.p : 1;
      this.$router.push({ path: "/notice/detail/" + nno + "?p=" + p });
    },
    moveWrite() {
      this.$router.push("/notice/write");
    },
    searchNotice() {
      if (this.keyword === "") {
        this.getList();
      } else {
        http.get("/notice/" + this.keyword).then((resp) => {
          if (resp.data.totalPage == 0) {
            this.page = 1;
          } else this.page = resp.data.totalPage;
          this.items = resp.data.noticeList;
        });
      }
    },
    getList() {
      let p = this.$route.query.p != undefined ? this.$route.query.p : 1;
      http.get("/notice/ajax/list?p=" + p).then((response) => {
        this.page = response.data.totalPage;
        this.items = response.data.noticeList;
      });
    },
    getListSearch(keyword) {
      let p = this.$route.query.p != undefined ? this.$route.query.p : 1;
      http.get("/notice/" + keyword + "?p=" + p).then((response) => {
        this.page = response.data.totalPage;
        this.keyword = keyword;
        this.items = response.data.noticeList;
      });
    },
  },
};
</script>

<style scoped>
.notice-list {
  width: 100%;
  margin: auto;
}
.notice-list th {
  font-size: 18px;
}
.notice-list tr {
  font-size: 17px;
  height: 45px;
  border-bottom: 1px solid #9c9c9c;
}
.notice-list tr td a {
  color: #0b8b5c;
}
.notice-list tr td a:hover {
  color: #086442;
}

/* 페이지네이션 */
.page-item.active .page-link {
  background-color: #0b8b5c !important;
  border-color: #0b8b5c !important;
}
</style>
