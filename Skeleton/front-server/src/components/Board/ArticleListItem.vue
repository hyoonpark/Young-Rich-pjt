<template>
  <div>
    {{ article.title }}
    {{ article.username }}
    <br>
    <router-link :to="{
      name: 'ArticleDetailView',
      params: {id: article.id }}">
      [DETAIL]
    </router-link>
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

<style>

</style>