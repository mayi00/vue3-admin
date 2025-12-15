import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import viteCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'

/**
 * 创建 Vite 插件配置数组
 * @returns {Array} 返回包含各种 Vite 插件的配置数组
 */
export function createVitePlugins(env) {
  const plugins = [
    // 配置自动导入插件，用于自动导入常用的 Vue 相关库和组件
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        filepath: './vite/.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: false,
      resolvers: [
        // 自动导入 Element Plus
        ElementPlusResolver()
      ],
      // 是否在 vue 模板中自动导入
      vueTemplate: true
    }),
    // 配置组件自动导入插件，用于自动导入指定目录下的组件
    Components({
      // 默认导入组件文件夹，组件会自动引入
      dirs: ['src/components'],
      resolvers: [
        // ElementPlus 组件自动按需引入
        ElementPlusResolver()
      ]
    }),
    // 配置 UnoCSS 原子化 CSS 框架插件
    UnoCSS(),

    // 配置 Gzip 压缩插件
    viteCompression({
      // 生成的压缩包后缀名
      ext: '.gz',
      // 压缩算法
      algorithm: 'gzip',
      // 最小压缩文件大小 (bytes)
      threshold: 10240,
      // 是否删除原始文件
      deleteOriginFile: false,
      // 仅压缩指定类型的文件
      filter: /\.(js|css|html|svg)$/
    }),
    // 配置 Vue 官方插件
    vue()
  ]

  if (env.VITE_NODE_ENV === 'development') {
    if (env.VITE_DEV_TOOLS === 'true') {
      // 配置 Vue 开发者工具插件
      plugins.push(vueDevTools())
    }
  } else {
    // 配置网页更新通知插件
    // plugins.push(
    //   webUpdateNotice({
    //     // 可选配置项
    //     notificationProps: {
    //       title: '系统更新提示',
    //       description: '检测到新版本，是否立即刷新页面？',
    //       buttonText: '刷新',
    //       dismissButtonText: '稍后提醒'
    //     },
    //     // 轮询检查更新的时间间隔（毫秒）
    //     checkInterval: 1000 * 60 * 10,
    //     // 是否在页面加载时立即检查更新
    //     checkOnLoad: true
    //   })
    // )
  }

  return plugins
}
