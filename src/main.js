import '@/style/style.js'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupElementPlusIconsVue } from './plugins/elementPlusIconsVue'
import 'virtual:uno.css'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupElementPlusIconsVue(app)
app.mount('#app')
