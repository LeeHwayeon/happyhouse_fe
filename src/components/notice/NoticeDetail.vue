<template>
  <div>
    <b-card class="mb-3">
      <b-media class="m-3">
        <h3 class="mb-3">{{ item.ntitle }}</h3>
        <b-row>
          <b-col cols="1">
            <img src="@/assets/user.png" alt="user image" />
          </b-col>
          <b-col cols="9" class="profile">
            <p>{{ item.nwriter }}</p>
            <p>
              {{ item.ndate }} <span>조회 : {{ item.ncount }}</span>
            </p>
          </b-col>
          <b-col cols="2"> 댓글개수 출력할 것 </b-col>
        </b-row>
        <hr />
        <div class="notice-content">
          {{ item.ncontext }}
        </div>
      </b-media>
      <hr />
      <!-- <div class="m-3">
        <h6 class="mb-3">댓글</h6>
        <template v-if="this.comments.length > 0">
          <div v-for="(item, index) in this.comments" :key="index" class="mb-3">
            <b-row>
              <b-col cols="1">
                <img src="@/assets/comment_user.png" alt="user image" />
              </b-col>
              <b-col cols="11">
                <div>
                  {{ item.cwriter }}
                </div>
                <div>
                  {{ item.ccontent }}
                </div>
              </b-col>
            </b-row>
          </div>
        </template>
      </div> -->
      <comment-list />
      <comment-write :nno="this.item.nno" />
    </b-card>

    <template v-if="item.nwriter == userInfo.uid">
      <div class="text-right mb-5">
        <b-button class="btn btn-success" @click="modifyNotice(item.nno)">
          수정
        </b-button>
        <b-button class="btn btn-danger" @click="deleteNotice(item.nno)">
          삭제
        </b-button>
        <b-button type="submit" variant="primary" @click="onList"
          >목록</b-button
        >
      </div>
    </template>
    <template v-else>
      <div class="text-right mb-5">
        <b-button type="submit" variant="primary" @click="onList"
          >목록</b-button
        >
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http";
import CommentWrite from "@/components/comment/CommentWrite.vue";
import CommentList from "@/components/comment/CommentList.vue";
export default {
  data() {
    return {
      // comments: [],
      item: [],
    };
  },
  created() {
    let num = this.$route.params.nno;
    http.get("/notice/ajax/read/" + num).then((response) => {
      this.item = response.data.board;
    });
    // http.get("/comment/" + num).then((response) => {
    //   this.comments = response.data;
    // });
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    deleteNotice(nno) {
      http.delete("/notice/delete/" + nno).then((response) => {
        console.log(response);
      });
      this.$router.push("/notice/delete/" + nno);
    },
    modifyNotice(nno) {
      this.$router.push("/notice/modify/" + nno);
    },
    onList() {
      this.$router.push("/notice");
    },
  },
  components: {
    CommentWrite,
    CommentList,
  },
};
</script>

<style scoped>
img {
  width: 40px;
}
.profile {
  margin: 0;
}
.profile span::before {
  content: "";
  display: inline-block;
  width: 1px;
  height: 11px;
  background-color: rgb(82, 82, 82);
  margin-right: 10px;
  margin-left: 10px;
}

.notice-content {
  height: 350px;
}
.btn {
  margin-right: 10px;
}
</style>
