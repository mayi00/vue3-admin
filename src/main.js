import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'

import 'normalize.css' // css样式重置

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router).use(store).mount('#app')
