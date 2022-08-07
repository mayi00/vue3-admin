/*
 * @Description  : 
 * @Author       : hzf
 * @Date         : 2022-08-07
 * @LastEditors  : hzf
 * @LastEditTime : 2022-08-07
 * @FilePath     : \vue3-admin\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css' // css样式重置
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.less' // 引入自定义样式
import 'default-passive-events'

const env = import.meta.env
console.log('当前环境变量==>', env)

const app = createApp(App)

// 引入 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.mount('#app')
