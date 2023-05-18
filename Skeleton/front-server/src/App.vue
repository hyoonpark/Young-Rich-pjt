<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>BankSSafy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Main</v-btn>
      <v-btn text to="/rate-comparison">Compare</v-btn>
      <v-btn text to="/create">Create</v-btn>
      <v-btn text to="/signup">Sign Up</v-btn>
      <v-btn text to="/login">Log In</v-btn>
    </v-app-bar>

    <div>
      <router-link to="/calculator">환율계산기</router-link>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
import axios from 'axios';
import ArticleList from './components/ArticleList.vue';

let url = "http://localhost:8000/"

export default {
  name: 'App',

  data: () => {
    return {
  
    }
  },
  components : {
  
  },
  methods : { 
    
  }
};
</script>

<style>
.v-toolbar-title {
  font-size: 18px;
}

.v-btn {
  margin-left: 8px;
}
</style>