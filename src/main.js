import '@/style/style.js'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupElementPlusIconsVue } from './plugins/elementPlusIconsVue'
import 'virtual:uno.css'
import { startMock } from '@/mock'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupElementPlusIconsVue(app)
app.mount('#app')

if (import.meta.env.VITE_MOCK == 'true') {
  startMock()
}
