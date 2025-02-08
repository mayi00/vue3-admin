import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  persist: {
    key: 'app',
    storage: window.sessionStorage,
  },
  state: () => ({
    // 侧边栏折叠
    isCollapse: false,
    // 顶栏激活的模块
    activeModule: '',
  }),
  actions: {},
})
