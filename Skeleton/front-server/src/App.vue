<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Navigation</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Main</v-btn>
      <v-btn text to="/create">Create</v-btn>
      <v-btn text to="/signup">Sign Up</v-btn>
      <v-btn text to="/login">Log In</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
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