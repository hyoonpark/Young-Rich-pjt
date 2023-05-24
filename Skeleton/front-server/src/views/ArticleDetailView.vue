<template>
  <div>
    <h3>Article Detail</h3>
    <h5>{{ article.title }}</h5>
    <p>{{ article.content }}</p>

    <!-- 게시글 좋아요 개수 표시 -->
    <p>Like Count: {{ article.like_count }}</p>

    <!-- 댓글 입력 폼 -->
    <form @submit.prevent="addComment">
      <input type="text" v-model="commentContent" placeholder="댓글을 입력하세요" />
      <button type="submit">댓글 작성</button>
    </form>

    <!-- 댓글 목록 -->
    <div v-for="comment in article.comments" :key="comment.id">
      <p>{{ comment.content }}</p>

      <!-- 답글 입력 폼 -->
      <form @submit.prevent="addReply(comment.id)">
        <input type="text" v-model="replyContent[comment.id]" placeholder="답글을 입력하세요" />
        <button type="submit">답글 작성</button>
      </form>

      <!-- 답글 목록 -->
      <div v-for="reply in comment.replies" :key="reply.id">
        <p>{{ reply.content }}</p>
      </div>

      <!-- 댓글 좋아요 버튼 -->
      <button @click="likeComment(comment.id)">좋아요</button>
      <p>좋아요 개수: {{ comment.like_count }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleDetailView',
  data() {
    return {
      article: null,
      commentContent: '',
      replyContent: {} // 답글 입력 내용을 저장하는 객체
    }
  },
  created() {
    // 게시글 상세 정보를 백엔드에서 불러오는 로직을 작성합니다.
    // 예시로 Axios를 사용하여 GET 요청을 보내는 방법을 보여드리겠습니다.
    const articleId = this.$route.params.id;

    // Axios를 사용하여 백엔드에 GET 요청을 보냅니다.
    axios.get(`${API_URL}/api/article/${articleId}/`)
      .then(response => {
        // 응답 데이터를 받아와 article 데이터에 저장합니다.
        this.article = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    addComment() {
      // 댓글 작성 로직을 작성합니다.
      // 예시로 Axios를 사용하여 POST 요청을 보내는 방법을 보여드리겠습니다.
      const articleId = this.article.id;

      // 새로운 댓글 데이터 생성
      const newComment = {
        content: this.commentContent,
        article: articleId
      };

      // Axios를 사용하여 백엔드에 POST 요청을 보냅니다.
      axios.post('${API_URL}/api/comments/', newComment)
        .then(response => {
          // 댓글 작성이 성공하면 댓글 목록을 다시 불러옵니다.
          this.fetchComments();
          this.commentContent = ''; // 입력 필드 초기화
        })
        .catch(error => {
          console.error(error);
        });
    },
    addReply(commentId) {
      // 답글 작성 로직을 작성합니다.
      // 예시로 Axios를 사용하여 POST 요청을 보내는 방법을 보여드리겠습니다.

      // 답글 입력 내용
      const replyContent = this.replyContent[commentId];

      // 새로운 답글 데이터 생성
      const newReply = {
        content: replyContent,
        comment: commentId
      };

      // Axios를 사용하여 백엔드에 POST 요청을 보냅니다.
      axios.post(`${API_URL}/api/replies/`, newReply)
        .then(response => {
          // 답글 작성이 성공하면 댓글 목록을 다시 불러옵니다.
          this.fetchComments();
          this.replyContent[commentId] = ''; // 입력 필드 초기화
        })
        .catch(error => {
          console.error(error);
        });
    },
    likeComment(commentId) {
      // 댓글 좋아요 로직을 작성합니다.
      // 예시로 Axios를 사용하여 POST 요청을 보내는 방법을 보여드리겠습니다.

      // Axios를 사용하여 백엔드에 POST 요청을 보냅니다.
      axios.post(`${API_URL}/api/comments/${commentId}/like/`)
        .then(response => {
          // 좋아요가 성공적으로 처리되면 댓글 목록을 다시 불러옵니다.
          this.fetchComments();
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchComments() {
      // 댓글 목록을 백엔드에서 다시 불러오는 로직을 작성합니다.
      // 예시로 Axios를 사용하여 GET 요청을 보내는 방법을 보여드리겠습니다.
      const articleId = this.article.id;

      // Axios를 사용하여 백엔드에 GET 요청을 보냅니다.
      axios.get(`${API_URL}/api/comments/?article=${articleId}`)
        .then(response => {
          // 응답 데이터를 받아와 댓글 목록을 업데이트합니다.
          this.article.comments = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.fetchComments(); // 컴포넌트가 마운트되면 댓글 목록을 불러옵니다.
  }
}
</script>

<style>
</style>
