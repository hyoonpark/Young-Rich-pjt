<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">회원가입 페이지</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-text-field v-model="username" label="이름"></v-text-field>
              <v-text-field v-model="email" label="이메일"></v-text-field>
              <v-text-field v-model="password1" label="비밀번호" type="password"></v-text-field>
              <v-text-field v-model="password2" label="비밀번호 확인" type="password"></v-text-field>
              <v-text-field v-model="age" label="나이"></v-text-field>
              <v-text-field v-model="assets" label="자산"></v-text-field>
              <v-text-field v-model="salary" label="월급"></v-text-field>
              <v-btn type="submit" color="primary">Sign Up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      email: null,
      password1: null,
      password2: null,
      age: null, 
      assets: null,
      salary: null
    }
  },
  methods: {
    signUp() {
      const username = this.username;
      const email = this.email;
      const password1 = this.password1;
      const password2 = this.password2;
      const age = this.age;
      const assets = this.assets;
      const salary = this.salary

      const payload = {
        username,
        email,
        password1,
        password2,
        age,
        assets,
        salary,
  
      };

      this.$store.dispatch('signUp', payload);
    },
  },
};
</script>