import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  persist: {
    key: 'app',
    storage: window.localStorage,
  },
  state: () => ({
    // 侧边栏折叠状态（true: 折叠，false: 展开）
    sidebarCollapsed: false,
  }),
  actions: {},
})

