<<<<<<< HEAD
<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h1 class="display-3 text-center">예/적금 금리 비교 사이트</h1>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat, ante eget condimentum viverra, dolor mauris varius metus, a scelerisque nisl mi in dolor.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MainPageView',
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

.display-3 {
  font-size: 48px;
  margin-bottom: 16px;
}

.text-center {
  text-align: center;
}
</style>
=======
<!-- views/MainPageView.vue -->

<template>
    <div>
      <h1>게시글 작성</h1>
      <form>
        <label for="title">제목 : </label>
        <input type="text" id="title" v-model.trim="title"><br>
        <label for="content">내용 : </label>
        <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
        <input type="submit" id="submit">
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CreateView',
    data() {
      return {
        
      }
    },
    methods: {
    }
  }
  </script>
  
  <style>
  
  </style>
  
>>>>>>> main
