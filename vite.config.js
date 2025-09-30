import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite/plugins.js'
import { generateVersionFile } from './src/plugins/refreshPlugin.js'
import * as path from 'path'

export default ({ mode }) => {
  // 获取当前环境变量
  const env = loadEnv(mode, process.cwd())
  console.log('>>> 当前环境==>', mode)
  console.log('>>> 环境变量==>', env)

  const now = new Date().getTime()
  const versionInfo = {
    version: now,
    'release time': dayjs(now).format('YYYY-MM-DD HH:mm:ss')
  }

  return defineConfig({
    // 环境配置
    mode,
    define: {
      'process.env': env,
      __APP_VERSION__: now
    },
    plugins: [...createVitePlugins(), generateVersionFile(versionInfo)],
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
  })
}
