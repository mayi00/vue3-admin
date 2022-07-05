import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // css样式重置
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.less' // 引入自定义样式

const env = import.meta.env
console.log('当前环境变量==>', env)

const app = createApp(App)

// 引入 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// Element Plus 组件默认使用英语，全局配置国际化
app.use(ElementPlus, { locale: zhCn })
app.use(router).use(store).mount('#app')
