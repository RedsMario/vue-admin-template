import Vue from 'vue'
import '@/plugins/element'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入路由权限
import '@/utils/permission'
// 导入icons
import '@/assets/icons'
// 导入normailize.css
import 'normalize.css'
// 导入全局样式
import '@/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
