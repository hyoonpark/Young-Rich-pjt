<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center" class="login-row">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card">
          <v-card-title class="login-title">
            <h1>로그인</h1>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                required
              ></v-text-field>

              <v-btn type="submit" color="primary" class="login-button">Log In</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;

      const payload = {
        username,
        password,
      };

      this.$store.dispatch('login', payload);
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-row {
  max-width: 400px;
}

.login-card {
  padding: 24px;
}

.login-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  margin-top: 16px;
}
</style>