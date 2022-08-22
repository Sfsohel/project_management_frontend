import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import DatetimePicker from 'vuetify-datetime-picker'
Vue.use(DatetimePicker)

Vue.config.productionTip = false
if (localStorage.getItem('user-token')) {
  axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('user-token')}` }
}
axios.defaults.baseURL = process.env.VUE_APP_BACKEND + '/api/auth'
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
