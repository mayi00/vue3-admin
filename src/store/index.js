import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 全局注册 pinia
export function setupStore(app) {
  app.use(pinia)
}
export { pinia, useAppStore, usePermissionStore }
