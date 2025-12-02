import path from 'path'
import fs from 'fs/promises'
import axios from 'axios'

/**
 * 版本号比较
 * 当本地版本号(__APP_VERSION__)与远程版本号不一致时
 * 设置 5 秒后自动刷新页面
 */
export const versionCheck = async () => {
  if (process.env.VITE_NODE_ENV === 'development') return
  try {
    const response = await axios.get('version.json', {
      timeout: 5000,
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    if (__APP_VERSION__ !== response.data.version) {
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  } catch (error) {
    console.error('获取版本信息文件失败：', error)
  }
}

// 生成版本信息文件
export const generateVersionFile = (env, options = {}) => {
  if (env.VITE_NODE_ENV === 'development') return
  // 声明配置文件路径
  let configPath = ''

  return {
    name: 'refreshVersion',

    /**
     * Vite 配置解析完成后的钩子
     * @param {Object} resolvedConfig - 解析后的配置对象
     */
    configResolved(resolvedConfig) {
      // 保存配置文件的路径，后续使用
      configPath = resolvedConfig.publicDir
    },

    async buildStart() {
      // 生成版本信息文件路径
      // const file = path.join(configPath, 'version.json')
      const file = path.resolve(configPath, 'version.json')
      // 合并默认配置和传入的选项
      const versionData = {
        version: Date.now().toString(),
        buildTime: new Date().toISOString(),
        ...options
      }
      const content =
        process.env.NODE_ENV !== 'production' ? JSON.stringify(versionData, null, 2) : JSON.stringify(versionData)

      try {
        // 确保 public 目录存在（mkdir -p 效果，递归创建）
        await fs.mkdir(configPath, { recursive: true })
        // 写入文件（覆盖旧文件）
        await fs.writeFile(file, content, 'utf-8')
      } catch (error) {
        // 构建阶段错误，终止构建
        throw new Error(`版本文件生成失败：${String(error)}`)
      }
    }
  }
}
