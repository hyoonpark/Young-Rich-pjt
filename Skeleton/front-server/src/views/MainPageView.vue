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
