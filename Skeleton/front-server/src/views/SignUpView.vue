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
              <div v-if="password1 !== password2" class="red--text">비밀번호가 일치하지 않습니다.</div>
              <v-select v-model="age" :items="ageOptions" label="나이"></v-select>
              <v-select v-model="assets" :items="assetsOptions" label="자산">만원</v-select>
              <v-select v-model="salary" :items="salaryOptions" label="월급">만원</v-select>
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
      salary: null,
      ageOptions: ['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대'],
      assetsOptions: ['0-1000만원', '1000-2000만원', '2000-3000만원', '3000-4000만원', '4000-5000만원', '5000-6000만원', '6000-7000만원', '7000-8000만원', '8000-9000만원', '9000-10000만원'],
      salaryOptions: ['0-100만원', '100-200만원', '200-300만원', '300-400만원', '400-500만원', '500-600만원', '600-700만원', '700-800만원', '800-900만원', '900-1000만원']
    }
  },
  methods: {
    signUp() {
      const username = this.username;
      const email = this.email;
      const password1 = this.password1;
      const password2 = this.password2;
      const age = this.getAgeValue(this.age);
      const assets = this.getNumericValue(this.assets);
      const salary = this.getNumericValue(this.salary);

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
    getAgeValue(ageOption) {
      // 나이 옵션에 따라 실제 나이 값으로 변환하여 반환
      switch (ageOption) {
        case '10대':
          return '10s';
        case '20대':
          return '20s';
        case '30대':
          return '30s';
        case '40대':
          return '40s';
        case '50대':
          return '50s';
        case '60대':
          return '60s';
        case '70대':
          return '70s';
        case '80대':
          return '80s';
        default:
          return null;
      }
    },
    getNumericValue(rangeOption) {
      // 범위 옵션에 따라 숫자 값으로 변환하여 반환
      if (rangeOption) {
        const rangeValues = rangeOption.split('-');
        if (rangeValues.length === 2) {
          return parseInt(rangeValues[1], 10) ;
        }
      }
      return null;
    },
  },
};
</script>