<template>
  <div class="m-3">
    <h6 class="mb-3">댓글 {{ this.comments.length }}</h6>
    <template v-if="this.comments.length > 0">
      <div v-for="(item, index) in this.comments" :key="index" class="mb-3">
        <b-row>
          <b-col cols="1">
            <img src="@/assets/comment_user.png" alt="user image" />
          </b-col>
          <b-col cols="9">
            <div>
              {{ item.cwriter }}
            </div>
            <div>
              {{ item.ccontent }}
            </div>
          </b-col>
          <b-col cols="2" v-if="item.cwriter == userInfo.uid">
            <b-button-group>
              <b-button
                size="sm"
                variant="outline-primary"
                style="background-color: transparent; border: none"
              >
                <b-icon icon="pencil"></b-icon>
              </b-button>
              <b-button
                size="sm"
                variant="outline-danger"
                style="background-color: transparent; border: none"
              >
                <b-icon
                  icon="x-circle-fill"
                  scale="1"
                  @click="commentdelete(item.cno)"
                ></b-icon>
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http";
export default {
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    let nno = this.$route.params.nno;
    http.get("/comment/" + nno).then((response) => {
      this.comments = response.data;
      console.log(this.comments);
    });
  },
  methods: {
    commentmodify() {},
    commentdelete(cno) {
      http.delete("/comment/" + cno).then(() => {
        this.$router.go();
      });
    },
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
