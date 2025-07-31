import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export function createVitePlugins() {
  return [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        filepath: './vite/.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      dts: false,
      resolvers: [ElementPlusResolver()],
      // 是否在 vue 模板中自动导入
      vueTemplate: true,
    }),
    Components({
      // 默认导入组件文件夹，组件会自动引入
      dirs: ['src/components'],
      // ElementPlus 组件自动按需引入
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    vueDevTools(),
  ]
}
