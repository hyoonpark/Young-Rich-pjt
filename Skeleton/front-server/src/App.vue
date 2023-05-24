<template>
  <v-app>
    <v-app-bar app style="background-color: #80D8FF;">
      <v-toolbar-title>BankSSafy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Main</v-btn>
      <v-btn text to="/rate-comparison">Compare</v-btn>
      <v-btn text to="/map">Search Bank</v-btn>
      <v-btn text to="/exchange">Exchange</v-btn>
      <v-btn text to="/board">Board</v-btn>
      <v-btn text to="/create">Create</v-btn>
      <v-btn text to="/signup">Sign Up</v-btn>
      <template v-if="isLogin">
        <v-btn text @click="logout">LogOut</v-btn>
        <v-btn text to="/profile">{{ getUsername }}</v-btn>
        
      </template>
      <template v-else>
        <v-btn text to="/login">Log In</v-btn>
        <v-btn text style="color: red;">로그인 해주세요</v-btn>

        
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
export default {
  name: 'App',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    getUsername() {
      return `환영한다, ${this.$store.state.user.username}`;
    },
  },
  methods : {
    logout() {
      this.$store.dispatch('logout')
    }
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