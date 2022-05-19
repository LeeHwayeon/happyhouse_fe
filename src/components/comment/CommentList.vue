<template>
  <div class="m-3">
    <h6 class="mb-3">댓글</h6>
    <template v-if="this.comments.length > 0">
      <div v-for="(item, index) in this.comments" :key="index" class="mb-3">
        <b-row>
          <b-col cols="1">
            <img src="@/assets/comment_user.png" alt="user image" />
          </b-col>
          <b-col cols="10">
            <div>
              {{ item.cwriter }}
            </div>
            <div>
              {{ item.ccontent }}
            </div>
          </b-col>
          <b-col cols="1">
            <b-button-toolbar>
              <b-button-group class="mr-2">
                <b-button>
                  <b-icon icon="pencil" scale="1" variant="dark"></b-icon>
                </b-button>
                <b-button>
                  <b-icon
                    icon="x-circle-fill"
                    scale="1"
                    variant="dark"
                  ></b-icon>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-col>
        </b-row>
      </div>
    </template>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  data() {
    return {
      comments: [],
    };
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
    commentdelete() {},
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
