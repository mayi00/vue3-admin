import { createI18n } from 'vue-i18n'
import { ref } from 'vue'

// 引入语言文件
import zhCn from '../language/zh-CN.js'
import en from '../language/en.js'

/**
 * i18n 国际化配置实例
 */
const i18n = createI18n({
  // 关闭传统模式以兼容Vue3组合式API
  legacy: false,
  // 默认语言
  locale: navigator.language || 'zh-CN',
  // 回退语言，如果没有找到对应的语言包，则使用回退语言
  fallbackLocale: 'zh-CN',
  // 语言包配置
  messages: { 'zh-CN': zhCn, en },
})
const elLocale = ref(null)

// 设置语言
function setI18nLanguage(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('dt-i18n-locale', i18n.global.locale.value)
  loadThirdPartyMessage(i18n.global.locale.value)
  document?.querySelector('html')?.setAttribute('lang', i18n.global.locale.value)
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang) {
  await Promise.all([loadElementLocale(lang)])
}
/**
 * 加载element-plus的语言包
 * @param lang
 */
async function loadElementLocale(lang) {
  try {
    const elLocales = {
      'zh-CN': () => import('element-plus/es/locale/lang/zh-cn'),
      en: () => import('element-plus/es/locale/lang/en'),
    }
    const module = await elLocales[lang]()
    elLocale.value = module.default
  } catch (error) {
    console.error('加载Element语言包失败:', error)
    elLocale.value = (await import('element-plus/es/locale/lang/zh-cn')).default
  }
}

async function setupI18n(app) {
  const savedLocale = localStorage.getItem('dt-i18n-locale')
  const defaultLocale = savedLocale || 'zh-CN'
  setI18nLanguage(defaultLocale)

  app.use(i18n)
  await loadThirdPartyMessage(defaultLocale)

  // 在控制台打印警告
  i18n.global.setMissingHandler((locale, key) => {
    if (options.missingWarn && key.includes('.')) {
      console.warn(`[intlify] Not found '${key}' key in '${locale}' locale messages.`)
    }
  })
}

export { i18n, elLocale, setI18nLanguage, setupI18n }
