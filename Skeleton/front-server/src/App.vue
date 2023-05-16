<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Navigation</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Link 1</v-btn>
      <v-btn text>Link 2</v-btn>
      <v-btn text>Link 3</v-btn>
    </v-app-bar>

    <v-main>
      <!-- 나머지 앱 내용 -->
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => {
    return {
   
    }
  },
  components : {
  
  },
  methods : { 
    
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