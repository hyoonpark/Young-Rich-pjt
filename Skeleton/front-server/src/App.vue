<template>
  <v-app>
    <v-app-bar app style="background-color: #BDBDBD">
      <v-toolbar-title>
        <img src="@/assets/logoimage.png" alt="BankSSafy Logo" style="width: 150px; margin-top: 15px;">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/" color="white">Main</v-btn>
      <v-btn text to="/rate-comparison" color="white">Compare</v-btn>
      <v-btn text to="/map" color="white">Search Bank</v-btn>
      <v-btn text to="/exchange" color="white">Exchange</v-btn>
      <v-btn text to="/board" color="white">Board</v-btn>
      <v-btn text to="/create" color="white">Create</v-btn>
      <v-btn text to="/signup" color="white">Sign Up</v-btn>
      <template v-if="isLogin">
        <v-btn text @click="logout" color="white">LogOut</v-btn>
        <v-btn text to="/profile" color="white">{{ getUsername }}</v-btn>
      </template>
      <template v-else>
        <v-btn text to="/login" color="white">Log In</v-btn>
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
  },
  data() {
  return {

  };
},
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