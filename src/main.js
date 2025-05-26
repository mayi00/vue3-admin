// 全局样式
import '@/styles/reset.css'
import '@/styles/variables.css'
import '@/styles/theme.css'
import '@/styles/globals.css'
import '@/styles/style.css'
import '@/plugins/element-plus.js'
import '/node_modules/flag-icons/css/flag-icons.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setupI18n } from '@/plugins/i18n'

const env = import.meta.env
console.log('【当前环境变量】', env)

const app = createApp(App)

// 引入 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
setupI18n(app)
app.mount('#app')
