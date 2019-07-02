import Vue from 'vue'
import axios from 'axios'
import Axios from 'vue-axios'

import App from './App.vue'

import './assets/sass/main.scss'

Vue.use(Axios, axios);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  ...App
});
