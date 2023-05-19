<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>BankSSafy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Main</v-btn>
      <v-btn text to="/rate-comparison">Compare</v-btn>
      <v-btn text to="/create">Create</v-btn>
      <v-btn text to="/signup">Sign Up</v-btn>
<<<<<<< HEAD
      <template v-if="isLogin">
        <v-btn text @click="logout">LogOut</v-btn>
        <v-btn text>{{ getUsername }}</v-btn>
        
      </template>
      <template v-else>
        <v-btn text to="/login">Log In</v-btn>
        <v-btn text style="color: red;">로그인 해주세요</v-btn>

        
      </template>
    </v-app-bar>

=======
      <v-btn text to="/login">Log In</v-btn>
    </v-app-bar>

    <div>
      <router-link to="/calculator">환율계산기</router-link>
    </div>
>>>>>>> main
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
<<<<<<< HEAD
=======
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