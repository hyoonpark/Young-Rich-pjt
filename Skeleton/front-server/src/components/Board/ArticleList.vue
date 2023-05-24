<template>
  <div class="article-list">
    <h3>Article List</h3>
    <div v-for="article in articles" :key="article.id">
      <article-list-item :article="article" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleListItem from '@/components/Board/ArticleListItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  data() {
    return {
      articles: null
    }
  },
  methods: {
    getArticles() {
      const API_URL = 'http://127.0.0.1:8000'
      const token = this.$store.state.token
      axios
        .get(`${API_URL}/api/v1/articles/`, {
          headers:{
            Authorization: `Token ${this.$store.state.token}`
          },
        })
        .then((response) => {
          this.articles = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    check(article){
      this.$router.push({
        name: 'ArticleDetailView',
        params: { id: article.id }
      });
    }
  },
  created() {
    this.getArticles()
  },
}
</script>

<style>

</style>
