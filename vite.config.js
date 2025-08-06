import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite/plugins.js'
import * as path from 'path'

export default ({ mode }) => {
  // 获取当前环境变量
  const env = loadEnv(mode, process.cwd())
  console.log('>>> 当前环境==>', mode)
  console.log('>>> 环境变量==>', env)

  return defineConfig({
    // 环境配置
    mode,
    define: {
      'process.env': env
    },
    plugins: [...createVitePlugins()],
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
  })
}
