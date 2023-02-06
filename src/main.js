import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'

// 引入全局样式文件
import './styles/index.less'

// 引入dayjs过滤器
import '@/utils/dayjs'

// 引入vant组件库桌面端适配
import '@vant/touch-emulator'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
