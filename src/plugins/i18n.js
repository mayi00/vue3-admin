import { createI18n } from 'vue-i18n'
// 引入语言文件
import zhCn from '../language/zhCn.js'
import en from '../language/en.js'
// import { useAppStore } from '@/store'

// const appStore = useAppStore()
// const { language } = useAppStore()

/**
 * i18n 国际化配置实例
 */
const i18n = createI18n({
  legacy: false, // 关闭传统模式以兼容Vue3组合式API
  locale: 'zhCn', // 默认语言
  // locale: appStore.language,
  // locale: () => useAppStore().language, // 默认语言（与Pinia store中的language状态同步）
  fallbackLocale: 'zhCn', // 回退语言
  messages: {
    // 语言包配置
    zhCn,
    en,
  },
  silentFallbackWarn: true, // 禁止回退警告
})

export default i18n
