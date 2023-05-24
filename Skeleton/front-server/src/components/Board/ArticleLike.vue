<template>
  <div>
    <v-btn @click="toggleLike" :class="{ 'liked': liked }" icon>
      <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
    </v-btn>
    <p class="like-count">좋아요 개수: {{ likeCount }}</p>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

export default {
  name: 'ArticleLike',
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      liked: false,
      likeCount: 0
    };
  },
  created() {
    this.getLikes();
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    userInfo() {
      return this.$store.state.user;
    }
  },
  methods: {
    toggleLike() {
      if (this.isLogin) {
        if (this.liked) {
          this.unlike();
        } else {
          this.like();
        }
      } else {
        // 로그인되지 않은 사용자에게 알림 등을 표시하는 로직 추가
      }
    },
    like() {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/articles/${this.articleId}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          console.log(res);
          this.liked = true;
          this.likeCount += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlike() {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/articles/${this.articleId}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          console.log(res);
          this.liked = false;
          this.likeCount -= 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLikes() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${this.articleId}/likes/`
      })
        .then((res) => {
          console.log(res);
          this.likeCount = res.data.length;
          // 좋아요한 사용자 목록 등의 로직 추가
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped>
.liked {
  color: red;
}

.like-count {
  /* text-align: center; */
  font-size: 14px;
  color: #888;
}
</style>
