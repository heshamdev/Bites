import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bulma/css/bulma.css';
import 'materialize-css/dist/css/materialize.min.css';
import cookies from 'vue-cookie';
import axios from 'axios'
Vue.config.productionTip = false;
Vue.use(cookies)
new Vue({
  router,
  store,
  cookies,
  axios,
  render: h => h(App),
}).$mount('#app');
