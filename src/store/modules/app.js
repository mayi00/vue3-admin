import { defineStore } from 'pinia'
import i18n from '@/plugins/i18n'

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
    // 当前语言标识（'zhCn' | 'en'）
    language: 'zhCn',
  }),
  actions: {
    // 切换语言时调用
    setLanguage(lang) {
      language.value = lang
      i18n.global.locale.value = lang
    },
  },
})
