import Vue from 'vue'
import axios from 'axios'
import Axios from 'vue-axios'

import '@/assets/sass/main.scss'

import App from '@/App'

Vue.use(Axios, axios)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  ...App
}).$mount('#app')
