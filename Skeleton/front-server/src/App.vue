<template>
  <v-app>
    <div>
      <article-list v-bind:propsdata="dataList"></article-list>
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import ArticleList from './components/ArticleList.vue';

let url = "http://localhost:8000/finlife/deposit-products/"

export default {
  name: 'App',

  data: () => {
    return {
      dataList : []
    }
  },
  components : {
    "ArticleList" : ArticleList,
  },
  mounted() {
    axios({
      method : "GET",
      url : url
    }).then(response => {
      this.dataList = response.data
    }).catch(response => {
      console.log("Failed",response)
    })
  },
  methods : { //crud 로직 
    getProductList : function() {},
    UpdateProductList : function() {},
    deleteProductList : function() {},
  }
};
</script>