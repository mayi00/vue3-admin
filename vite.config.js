import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite/plugins.js'
import * as path from 'path'
import refreshPlugin from './src/plugins/refreshPlugin.js'

const now = new Date().getTime() // 定义一个时间戳

export default ({ mode }) => {
  // 获取当前环境变量
  const env = loadEnv(mode, process.cwd())
  console.log('>>> 当前环境==>', mode)
  console.log('>>> 环境变量==>', env)

  return defineConfig({
    // 环境配置
    mode,
    define: {
      'process.env': env,
      __APP_VERSION__: now
    },
    plugins: [...createVitePlugins(), refreshPlugin({ version: now })],
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
  })
}
