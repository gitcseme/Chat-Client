import Vue from 'vue'

import Application from './Application.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import configurations
import './configurations/Axios'

// UI library
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  router,
  store,
  render: h => h(Application)
}).$mount('#app')
