import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import legacy from '@vitejs/plugin-legacy'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
      // ElementPlus组件自动按需引入
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          // 图标集别名（可选），例如将 `mdi` 图标集组件名前缀设为 `icon`
          prefix: 'icon',
          // 允许不带前缀直接使用图标（如 <i-mdi-home /> 或 <mdi-home />）
          enabledCollections: ['mingcute', 'mdi', 'carbon', 'ant-design'], // 常用图标集
        }),
      ],
    }),
    Icons({
      // 自动安装缺失的图标集（需要 `@iconify-json/*` 包支持）
      autoInstall: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    vue(),
    vueJsx(),
    // vueDevTools()
  ]
}
