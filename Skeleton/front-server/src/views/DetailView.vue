<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호: {{ article?.id }}</p>
    <p>제목: {{ article?.title }}</p>
    <p>내용: {{ article?.content }}</p>
    <p>작성시간: {{ article?.created_at }}</p>
    <p>수정시간: {{ article?.updated_at }}</p>
    <p>좋아요 수: {{ likeCount }}</p>
    <button @click="toggleLike" :disabled="isProcessing">
      {{ liked ? '좋아요 취소' : '좋아요' }}
    </button>

    <div>
      <h2>댓글</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <p>{{ comment.content }}</p>
          <button @click="deleteComment(comment.id)">삭제</button>
          <div>
            <h3>답글</h3>
            <ul>
              <li v-for="reply in comment.replies" :key="reply.id">
                <p>{{ reply.content }}</p>
                <button @click="deleteReply(reply.id)">삭제</button>
              </li>
            </ul>
            <input v-model="newReplyContent" type="text" placeholder="답글 내용" />
            <button @click="addReply(comment.id)">답글 작성</button>
          </div>
        </li>
      </ul>
      <input v-model="newCommentContent" type="text" placeholder="댓글 내용" />
      <button @click="addComment">댓글 작성</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  data() {
    return {

    }
  },
  created() {
    this.getArticleDetail()
    this.getComments()
  },
  methods: {
    getArticleDetail() {
      axios
        .get(`${API_URL}/api/v1/articles/${this.$route.params.id}/`)
        .then((res) => {
          this.article = res.data
          this.getLikeStatus()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLikeStatus() {
      axios
        .get(`${API_URL}/get_like_status/article/${this.article.id}/`)
        .then((res) => {
          this.liked = res.data.liked
          this.likeCount = res.data.like_count
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toggleLike() {
      if (this.isProcessing) return

      this.isProcessing = true

      axios
        .post(`${API_URL}/toggle_like/`, {
          type: 'article',
          id: this.article.id
        })
        .then((res) => {
          this.liked = res.data.liked
          this.likeCount = res.data.like_count
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isProcessing = false
        })
    },
    getComments() {
      axios
        .get(`${API_URL}/comments/`)
        .then((res) => {
          this.comments = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addComment() {
      axios
        .post(`${API_URL}/comments/create/${this.article.id}/`, {
          content: this.newCommentContent
        })
        .then((res) => {
          this.newCommentContent = ''
          this.getComments()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment(commentId) {
      axios
        .delete(`${API_URL}/comments/${commentId}/`)
        .then((res) => {
          this.getComments()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addReply(commentId) {
      axios
        .post(`${API_URL}/replies/create/${commentId}/`, {
          content: this.newReplyContent
        })
        .then((res) => {
          this.newReplyContent = ''
          this.getComments()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteReply(replyId) {
      axios
        .delete(`${API_URL}/replies/${replyId}/`)
        .then((res) => {
          this.getComments()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>