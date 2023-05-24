<template>
  <div class="article-list-item">
    <div class="article-info">
      <h3 class="article-title">제목 : {{ article.title }}</h3>
      <p class="article-author">{{ article.username }}</p>
    </div>
    <div class="article-actions d-flex justify-center align-center">
      <router-link class="detail-link" :to="{ name: 'ArticleDetailView', params: { id: article.id }}">
        [DETAIL]
      </router-link>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  }
}
</script>

<style scoped>
.article-list-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-info {
  text-align: center;
}

.article-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.article-author {
  color: #777;
  font-size: 14px;
}

.article-actions {
  margin-top: 10px;
}

.detail-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

hr {
  margin-top: 10px;
  border: none;
  border-top: 1px solid #ddd;
}
</style>