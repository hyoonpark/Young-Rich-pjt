<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">게시글 작성</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model.trim="title" label="제목"></v-text-field>
              <v-textarea v-model="content" label="내용" rows="5"></v-textarea>
              <v-btn type="submit" color="primary">작성</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CreateView',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submitForm() {
      // Handle form submission here
    }
  }
}
</script>

<style scoped>
.v-container {
  height: 100vh;
}

.v-row {
  height: 100%;
  align-items: center;
  justify-content: center;
}

.v-card {
  width: 100%;
}

.v-btn {
  margin-top: 16px;
}
</style>