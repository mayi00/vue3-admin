// 全局样式
import '@/styles/reset.css'
import '@/styles/variables.css'
import '@/styles/theme.css'
import '@/styles/globals.css'
import '@/styles/style.css'
// 暗黑模式的css样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element-plus.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const env = import.meta.env
console.log('【当前环境变量】', env)

const app = createApp(App)

// 引入 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.mount('#app')
