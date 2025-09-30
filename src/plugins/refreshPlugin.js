import path from 'path'
import fs from 'fs'
import axios from 'axios'

/**
 * 版本号比较
 * 当本地版本号(__APP_VERSION__)与远程版本号不一致时
 * 设置 5 秒后自动刷新页面
 */
export const versionCheck = async () => {
  // if (process.env.NODE_ENV === 'development') return
  const response = await axios.get('version.json')
  if (__APP_VERSION__ !== response.data.version) {
    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }
}

// 将文本内容写入指定文件中
const writeVersion = async (versionFile, content) => {
  fs.writeFile(versionFile, content, err => {
    if (err) throw err
  })
}

// 生成版本信息文件
export const generateVersionFile = options => {
  // 声明配置文件路径
  let configPath
  return {
    name: 'refreshVersion',
    configResolved(resolvedConfig) {
      // 保存配置文件的路径，后用
      configPath = resolvedConfig.publicDir
    },
    async buildStart() {
      // 生成版本信息文件路径
      const file = configPath + path.sep + 'version.json'
      // 采用编译的当前时间作为每个版本的标识
      const content = JSON.stringify(options)
      if (fs.existsSync(configPath)) {
        // 如果文件路径已存在，直接写入文件
        writeVersion(file, content)
      } else {
        // 如果文件路径不存在，先创建文件夹，然后再写入文件
        fs.mkdir(configPath, err => {
          if (err) throw err
          writeVersion(file, content)
        })
      }
    }
  }
}
