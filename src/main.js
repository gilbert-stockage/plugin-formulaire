import Vue from 'vue'
import App from './App.vue'

import form from '@/plugins/form'

Vue.config.productionTip = false

Vue.use(form)

new Vue({
  render: h => h(App),
}).$mount('#app')
