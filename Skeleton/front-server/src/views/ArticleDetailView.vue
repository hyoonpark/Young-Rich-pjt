<template>
  <div>
    <template v-if="article">
      <div class="article-wrapper">
        <!-- <p>글 번호: {{ article.id }}</p> -->
        <!-- <p>작성자: {{ article.username }}</p> -->
        <p>제목: {{ article.title }}</p>
        <div class="content-wrapper">
          <p>내용: {{ article.content }}</p>
        </div>
        <p>작성시간: {{ article.created_at }}</p>
        <!-- <p>수정시간: {{ article.updated_at }}</p> -->
        <button @click="deleteArticle">삭제</button>
        <!-- <div v-if="isAuthorizedUser"> -->
        <!-- <ArticleUpdateView /> -->
          <button class="" @click="goToArticleUpdateView">수정</button>
        <!-- </div> -->
        <br><br><br>

        <Comments v-if="article.id" :article="article" />
        <!-- <div v-if="article.id">
          <form @submit.prevent="addComment">
            <input type="text" v-model="commentContent" placeholder="댓글을 입력하세요" />
            <button type="submit">댓글 작성</button>
          </form>
        </div> -->
        <ArticleLike v-if="article.id" :articleId="article.id" />
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import ArticleLike from '@/components/Board/ArticleLike.vue';
import Comments from '@/components/Board/Comments.vue';
import ArticleUpdateView from '@/views/ArticleUpdateView';
const API_URL = 'http://127.0.0.1:8000';

export default {
  name: 'ArticleDetailView',
  components: {
    Comments,
    ArticleLike,
    ArticleUpdateView,
  },
  data() {
    return {
      article: null,
      commentContent: ''
    };
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
    userInfo() {
      return this.$store.state.user
    },
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    goToArticleUpdateView() {
    this.$router.push({ name: 'ArticleUpdateView', params: { id: this.article.id } });
    },
    // ArticleUpdateView() {
    // this.$router.push({ name: 'ArticleUpdateView', params: { id: this.article.id } });
    // },
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`
      })
        .then((res) => {
          console.log(res);
          this.article = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteArticle() {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/articles/${this.$route.params.id}`
      })
        .then(() => {
          this.$router.push({ path: '/board' });
        });
    },
    addComment() {
      const newComment = {
        content: this.commentContent,
        article: this.article.id
      };

      axios.post(`${API_URL}/api/v1/articles/${this.article.id}/comments/`, newComment)
        .then(response => {
          this.commentContent = '';
          // 새로운 댓글을 서버로부터 받아와 댓글 목록에 추가하는 로직
          this.article.comments.push(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  mutations: {
    updateArticle(state, { id, title, content }) {
    const article = state.articles.find(article => article.id === id);
    if (article) {
      article.title = title;
      article.content = content;
      }
    }
  }
};
</script>

<style>
</style>
