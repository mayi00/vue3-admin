import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入 ElementPlus 图标
export function setupElementPlusIconsVue(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
