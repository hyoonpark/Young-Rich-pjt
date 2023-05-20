<template>
  <div>
    <h1>추가정보작성</h1>
    <v-form>
      <v-text-field v-model="age" label="나이"></v-text-field>
      <v-text-field v-model="assets" label="자산"></v-text-field>
      <v-text-field v-model="salary" label="연봉"></v-text-field>
      <v-btn color="primary">저장</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'AddInformation',
  data() {
    return {
      age: null,
      assets: null,
      salary: null,
    };
  },
};
</script>

<style>
/* 추가 스타일링은 필요한 경우 여기에 작성하십시오. */
</style>