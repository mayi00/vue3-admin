import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'
import { useUserStore } from './modules/user'

const pinia = createPinia()
console.log('Pinia instance created')
pinia.use(piniaPluginPersistedstate)

// 全局注册 pinia
export function setupStore(app) {
  app.use(pinia)
}
export { pinia, useAppStore, usePermissionStore, useUserStore }
