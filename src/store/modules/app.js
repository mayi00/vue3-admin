import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  persist: {
    key: 'APP',
    storage: window.localStorage
  },
  state: () => ({
    // 侧边栏折叠状态（true: 折叠，false: 展开）
    sidebarCollapsed: false,
    // 是否显示水印（true: 显示，false: 隐藏）
    showWatermark: true
  }),
  getters: {
    // 侧边栏宽度
    sidebarWidth: state => (state.sidebarCollapsed ? '64px' : '200px')
  },
  actions: {
    // 切换侧边栏显示/隐藏
    toggleCollapsed() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})
