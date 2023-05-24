<!-- views/UpdateView.vue -->

<template>
  <div class="update-container">
    <h1>게시글 수정</h1>
    <v-form @submit.prevent="updateArticle" class="update-form">
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
      <v-btn type="submit" color="primary">게시글 수정</v-btn>
    </v-form>
  </div>
</template>
  
  <script>
  import axios from 'axios'
  import { mapMutations } from 'vuex';

  const API_URL = 'http://127.0.0.1:8000'
  
  export default {
    name: 'ArticleUpdateView',
    data() {
      return {
        title: null,
        content: null,
      }
    },
    
    created() {
      // 수정할 article 정보를 가져오는 API 호출
      // const articleId = this.$route.params.id
      axios.get(`${API_URL}/api/v1/articles/${this.$route.params.id}/`)
        .then(response => {
          const article = response.data
          this.title = article.title
          this.content = article.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      ...mapMutations(['updateArticle']),
      goBackToDetail() {
    this.$router.push({ name: 'ArticleDetailView', params: { id: this.$route.params.id } });
      },
      updateArticle() {
        const title = this.title
        const content = this.content
  
        if (!title) {
          alert('제목을 입력해주세요.')
          return
        } else if (!content) {
          alert('내용을 입력해주세요.')
          return
        }
  
        axios({
          method: 'put',
          url: `${API_URL}/api/v1/articles/${this.$route.params.id}/`,
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          },
          data: { title, content },
        })
        .then(() => {
            this.updateArticle({ id: this.$route.params.id, title, content });
            this.goBackToDetail();
          })
          .catch((error) => {
            console.log(error);
          });
        },
        // goBackToDetail() {
        //   this.$router.push({ name: 'ArticleDetailView', params: { id: this.$route.params.id } });
        // }
    }
  }
  </script>
  
  <style scoped>
.update-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.update-form {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

/* Vuetify 스타일링 */
.v-text-field {
  width: 100%;
}

.v-textarea {
  width: 100%;
}

.v-btn {
  width: 100%;
  margin-top: 20px;
}
</style>