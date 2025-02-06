import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'

export function createVitePlugins() {
  return [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        filepath: './vite/.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: false,
      resolvers: [ElementPlusResolver()],
      // 是否在 vue 模板中自动导入
      vueTemplate: true
    }),
    Components({
      // 默认导入组件文件夹，组件会自动引入
      dirs: ['src/components'],
      // ElementPlus组件自动按需引入
      resolvers: [ElementPlusResolver()]
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vue(),
    vueJsx(),
    // vueDevTools()
  ]
}
