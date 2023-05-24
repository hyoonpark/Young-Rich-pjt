<!-- views/CreateView.vue -->

<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
      <input type="submit" @submit.prevent="createArticle" id="submit">
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
      title: null,
      content: null,
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content

      if (!title) {
        alert('제목을 입력해주세요')
        return
      } else if (!content){
        alert('내용을 입력해주세요')
        return
      }

      // 인증 토큰을 로컬 스토리지 또는 다른 곳에서 가져옵니다.
      const token = localStorage.getItem('token')

      // 요청 헤더에 인증 토큰을 포함시킵니다.
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      // 게시글 데이터를 생성하는 POST 요청을 보냅니다.
      axios.post(`${API_URL}/api/v1/articles/`, { title, content }, config)
        .then(() => {
          this.$router.push({ name: 'ArticleListView' })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
