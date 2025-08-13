import axios from 'axios'

/**
 * 版本号比较
 * 当本地版本号(__APP_VERSION__)与远程版本号不一致时
 * 设置5秒后自动刷新页面
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
