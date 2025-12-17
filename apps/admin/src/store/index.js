import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'
import { useUserStore } from './modules/user'

const pinia = createPinia()
console.log('Pinia instance created')
pinia.use(piniaPluginPersistedstate)

/**
 * 在 Vue 应用中安装 Pinia
 * @param {App} app - Vue 应用实例
 */
export function setupStore(app) {
  app.use(pinia)
}
export { pinia, useAppStore, usePermissionStore, useUserStore }

// 导出所有 store 的组合函数，方便批量使用
export function useStore() {
  return {
    appStore: useAppStore(),
    permissionStore: usePermissionStore(),
    userStore: useUserStore()
  }
}
