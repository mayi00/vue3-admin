import { defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins.js'
import * as path from 'path'

export default () => {
  return defineConfig({
    plugins: [...createVitePlugins()],
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
  })
}
