<template>
  <v-flex class="dataList" column>
    <v-card max-width='600' tile>
      <v-list-item v-for="(data,index) in propsdata" v-bind:key='index'>
        <v-list-item-content>
            <v-list-item-title>은행명 : {{data.kor_co_nm}} </v-list-item-title>
            <v-list-item-subtitle>상품이름 : {{data.fin_prdt_nm}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-flex>
   
 
</template>

<script>

export default {
  name : 'ArticleList',

  props:["propsdata"],
  
  components: {
  },
  computed: {
  }
}
</script>

<style>
.article-list {
  text-align: start;
}
</style>
