<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 :</label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 :</label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
      <input type="submit" value="게시글 생성" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

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
      const title = this.title;
      const content = this.content;

      if (!title) {
        alert('제목을 입력해주세요');
        return;
      } else if (!content) {
        alert('내용을 입력해주세요');
        return;
      }

      // state에서 토큰을 가져옴
      const token = this.$store.state.token;
      // console.log(token);
      

      // 요청 헤더에 인증 토큰을 포함시킴
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      // 게시글 데이터를 생성하는 POST 요청을 보냄
      axios.post(`${API_URL}/api/v1/articles/`, { title, content }, config)
        .then(() => {
          this.$router.push({ name: 'ArticleListView' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style>
/* 추가적인 스타일링이 필요한 경우 여기에 작성하세요 */
</style>
