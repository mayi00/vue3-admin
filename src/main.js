import '@/style'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupElementPlusIconsVue } from './plugins/elementPlusIconsVue'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupElementPlusIconsVue(app)
app.mount('#app')
