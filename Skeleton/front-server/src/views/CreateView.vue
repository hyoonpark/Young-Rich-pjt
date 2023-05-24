<template>
  <div>
    <br>
    <h1>게시글 작성</h1><br><br><br><br>
    <v-form @submit.prevent="createArticle" class="create-form">
      <v-text-field
        v-model.trim="title"
        label="제목"
        required
      ></v-text-field>
      <v-textarea
        v-model="content"
        label="내용"
        required
        rows="5"
      ></v-textarea>
      <v-btn type="submit" color="primary">게시글 생성</v-btn>
    </v-form>

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

<style scoped>
h1 {
  text-align: center;
}
.create-form {
  display: grid;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

/* Vuetify 스타일링 */
.v-text-field {
  width: 100%;
}

.v-textarea {
  width: 100%;
}

.v-btn {
  margin-top: 20px;
}

/* Bootstrap 스타일링 */
.create-form .form-group {
  margin-bottom: 20px;
}

.create-form .btn-primary {
  margin-top: 20px;
}
</style>
