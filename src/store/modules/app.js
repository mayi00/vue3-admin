import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  persist: {
    key: 'app',
    storage: window.localStorage,
  },
  state: () => ({
    // 侧边栏折叠状态（true: 折叠，false: 展开）
    sidebarIsCollapse: false,
    // 当前激活的模块名称（用于导航高亮）
    activeModule: '',
    tags: [],
    activeTag: '',
    // 主题模式（'light' 或 'dark'）
    theme: 'light',
  }),
  actions: {
    addTag(route) {
      if (!this.tags.some(tag => tag.path === route.path)) {
        this.tags.push({
          title: route.meta.title,
          path: route.path,
        })
      }
      this.activeTag = route.path
    },
  },
})
