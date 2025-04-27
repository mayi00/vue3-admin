import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/plugins/i18n'

export const useAppStore = defineStore('app', {
  persist: {
    key: 'user',
    storage: window.localStorage,
  },
  state: () => ({
    sidebarIsCollapse: false,
    activeModule: '',
    language: 'zhCn',
  }),
  actions: {
    setLanguage(lang) {
      language.value = lang
      i18n.global.locale.value = lang
    },
  },
  // // 侧边栏折叠状态（true: 折叠，false: 展开）
  // const sidebarIsCollapse = ref(false)
  // // 当前激活的模块名称（用于导航高亮）
  // const activeModule = ref('')
  // // 当前语言标识（'zhCn' | 'en'）
  // const language = ref('zhCn')
  // /**
  //  * 状态持久化配置
  //  * - key: 持久化存储键名
  //  * - storage: 使用的存储介质
  //  * - paths: 需要持久化的状态字段（数组格式）
  //  */
  // const persist = {
  //   key: 'app',
  //   storage: window.localStorage,
  //   paths: ['sidebarIsCollapse', 'activeModule', 'language'],
  // }
  // // 切换语言时调用
  // function setLanguage(lang) {
  //   language.value = lang
  //   i18n.global.locale.value = lang
  // }
  // return {
  //   sidebarIsCollapse,
  //   activeModule,
  //   language,
  //   setLanguage,
  //   persist,
  // }
})
