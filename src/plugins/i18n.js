import { createI18n } from 'vue-i18n'
import { ref } from 'vue'

// 引入语言文件
import zhCn from '../language/zh-cn.js'
import en from '../language/en.js'
// 引入element-plus的语言包
import eleZhCn from 'element-plus/es/locale/lang/zh-cn'
import eleEn from 'element-plus/es/locale/lang/en'

/**
 * i18n 国际化配置实例
 */
const i18n = createI18n({
  legacy: false, // 关闭传统模式以兼容Vue3组合式API
  locale: '', // 默认语言
  // 语言包配置
  messages: { 'zh-CN': zhCn, en },
})
const eleLocale = ref(eleZhCn)

// 设置语言
function setI18nLanguage(locale) {
  i18n.global.locale.value = locale
  loadThirdPartyMessage(locale)
  document?.querySelector('html')?.setAttribute('lang', locale)
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
  switch (lang) {
    case 'en': {
      eleLocale.value = eleEn
      break
    }
    case 'zh-CN': {
      eleLocale.value = eleZhCn
      break
    }
  }
}

async function setupI18n(app, options = {}) {
  const { defaultLocale = 'zh-CN' } = options
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

export { i18n, eleLocale, setI18nLanguage, setupI18n }
