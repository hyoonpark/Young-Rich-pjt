import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from "axios"

let url = "http://localhost:8000/finlife/deposit-products/"

axios.get(url)
.then(function(response){
  console.log(response)
})
.catch(function(response){
  console.log(response)
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
