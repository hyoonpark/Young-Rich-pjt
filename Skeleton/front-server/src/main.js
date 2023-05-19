import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

<<<<<<< HEAD

=======
>>>>>>> main
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

<<<<<<< HEAD
=======
axios.defaults.baseURL = "http://localhost:8000" // 기본 URL 설정

Vue.prototype.$axios = axios // Vue 인스턴스에서 axios를 사용할 수 있도록 프로토타입에 할당
>>>>>>> main
