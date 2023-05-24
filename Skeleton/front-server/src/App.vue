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
      <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="white">Account</v-btn>
          </template>
          <v-list>
            <v-list-item to="/login" v-if="!isLogin">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item to="/logout" v-if="isLogin" @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item to="/signup">
              <v-list-item-title>Signup</v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>
      <template v-if="isLogin">
        <v-btn text to="/profile" color="white">{{ getUsername }}</v-btn>
      </template>
      <template v-else>
        <v-btn text to="/login" color="white">로그인 해주세요!</v-btn>
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
      return `안녕하세요, ${this.$store.state.user.username}님`;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
  data() {
    return {};
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