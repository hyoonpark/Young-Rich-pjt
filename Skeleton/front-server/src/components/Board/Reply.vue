<template>
    <div>
      <p>{{ reply.content }}</p>
  
      <!-- 답글 좋아요 버튼 -->
      <button @click="likeReply">좋아요</button>
      <p>좋아요 개수: {{ reply.like_count }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  const API_URL = 'http://127.0.0.1:8000'
  
  export default {
    name: 'Reply',
    props: {
      reply: {
        type: Object,
        required: true
      }
    },
    methods: {
      likeReply() {
        axios.post(`${API_URL}/api/v1/replies/${this.reply.id}/like/`)
          .then(response => {
            // 좋아요 수를 서버로부터 받아와 업데이트하는 로직
            // this.reply.like_count = response.data.like_count;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
  </script>
  
  <style>
  </style>
  