<template>
  <div>
    <h1>LogIn Page</h1>
    <v-form>
      <v-text-field label="Username" v-model="username"></v-text-field>

      <v-text-field label="Password" type="password" v-model="password"></v-text-field>

      <v-btn color="primary" @click="login">Log In</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 로그인 로직
    }
  }
};
</script>