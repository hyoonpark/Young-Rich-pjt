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

let url = "http://localhost:8000/"

>>>>>>> main
export default {
  name: 'App',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    getUsername() {
      return `환영한다, ${this.$store.state.user.userName}`;
    },
  },

<<<<<<< HEAD
  methods : {
    logout() {
      this.$store.dispatch('logout')
    }
=======
  data: () => {
    return {
  
    }
  },
  components : {
  
  },
  methods : { 
    
>>>>>>> main
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