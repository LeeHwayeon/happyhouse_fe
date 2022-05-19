<template>
  <div class="naver-content">
    <div class="title">
      <div>
        <b-icon icon="megaphone" />
      </div>
      <h2>부동산 관련 최신 뉴스</h2>
    </div>
    <div class="card shadow mb-3" v-for="(item, index) in items" :key="index">
      <b-card>
        <b-card-title v-html="item.title" v-b-toggle="'my-collapse' + index">
        </b-card-title>

        <b-collapse :id="'my-collapse' + index">
          <b-card-text v-html="item.description"> </b-card-text>
          <b-button
            :href="item.link"
            variant="success"
            class="link"
            target="_blank"
            >바로가기</b-button
          >
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import http from "@/api/http.js";
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    let keyword = "부동산";
    http.get("/naver/news/" + keyword).then((resp) => {
      console.log(resp);
      //최신 5개 뉴스만
      for (let i = 0; i < 5; i++) {
        this.items.push(resp.data.items[i]);
      }
    });
  },
  methods: {},
};
</script>

<style scoped>
/* 타이틀 */
.title {
  display: flex;
  line-height: 33px;
  margin-bottom: 14px;
}
.title div {
  width: 30px;
  height: 30px;
  background-color: #0ca66d;
  border-radius: 50%;
  margin-right: 10px;
}
.title div .b-icon {
  margin: auto;
  height: 100%;
  display: block;
  font-size: 20px;
  color: #fff;
}
.title h2 {
  color: #555;
  font-size: 24px;
}

/* 뉴스 카드 */
.card {
  border: 0;
  border-radius: 15px;
}
.card-title {
  font-size: 17px;
  font-weight: normal;
}
.card a {
  text-decoration: none;
}
.card-title:hover {
  color: #5cb874;
}
.card .link {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
