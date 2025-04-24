import { defineStore } from 'pinia'
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const useAppStore = defineStore('app', () => {
  // 侧边栏折叠状态（true: 折叠，false: 展开）
  const sidebarIsCollapse = ref(false)
  // 当前激活的模块名称（用于导航高亮）
  const activeModule = ref('')
  // 当前语言标识（'zhCn' | 'en'）
  const language = ref('zhCn')

  /**
   * 计算属性：根据当前语言标识返回对应的语言对象
   * - 当 language 变化时，locale 也会相应更新
   */
  const locale = computed(() => {
    switch (language.value) {
      case 'zhCn':
        return zhCn
      case 'en':
        return en
      default:
        return zhCn
    }
  })

  /**
   * 状态持久化配置
   * - key: 持久化存储键名
   * - storage: 使用的存储介质
   * - paths: 需要持久化的状态字段（数组格式）
   */
  const persist = {
    key: 'app',
    storage: window.localStorage,
    paths: ['sidebarIsCollapse', 'activeModule', 'language'],
  }

  // 切换语言时调用
  function changeLanguage(lang) {
    i18n.global.locale.value = lang
  }

  return {
    sidebarIsCollapse,
    activeModule,
    language,
    locale,
    persist,
    changeLanguage,
  }
})
