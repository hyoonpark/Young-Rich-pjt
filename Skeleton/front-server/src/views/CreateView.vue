<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateView',
  data() {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.v-container {
  height: 100vh;
}

.v-row {
  height: 100%;
  align-items: center;
  justify-content: center;
}

.v-card {
  width: 100%;
}

.v-btn {
  margin-top: 16px;
}
</style>