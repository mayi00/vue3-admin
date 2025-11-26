import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VITE_BASE_URL,
  timeout: 1000 * 10
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 设置超时时间
    if (config.timeout === 0) {
      config.timeout = 0
    } else if (!config.timeout) {
      config.timeout = 1000 * 10
    }

    // 添加 token 到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // 处理请求错误
    console.error('【请求错误】', error)
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('【响应】', response)
    return new Promise((resolve, reject) => {
      if (response.status === 200) {
        // 处理二进制数据
        if (['blob', 'arraybuffer'].includes(response.config.responseType)) {
          resolve(response.data)
        }
        // 处理普通数据
        switch (response.data.code) {
          // 成功
          case 0:
            resolve(response.data)
            break
          // 失败
          case 1:
            ElMessage.error(response.data.message)
            reject(response.data)
            break
          // 成功-但需要特殊处理
          default:
            resolve(response.data)
            break
        }
      } else {
        reject(response.data)
      }
    })
  },
  error => {
    // 处理响应错误
    console.error('【响应错误】', error)
    return new Promise((resolve, reject) => {
      let errorMessage = '请求错误'
      if (error.response) {
        // 服务器响应错误
        const status = error.response.status
        const serverMsg = error.response.data?.message || ''

        switch (status) {
          case 400:
            errorMessage = serverMsg || '请求参数错误'
            break
          case 401:
            errorMessage = '登录已过期，请重新登录'
            break
          case 403:
            errorMessage = '没有操作权限'
            break
          case 404:
            errorMessage = '请求资源不存在'
            break
          case 500:
            errorMessage = serverMsg || '服务器内部错误'
            break
          default:
            errorMessage = `服务器错误 (${status})`
        }
      } else if (error.request) {
        // 请求未收到响应
        errorMessage = '网络连接异常，请检查网络'
      } else {
        // 其他错误
        errorMessage = error.message || '未知错误'
      }
      ElMessage.error(errorMessage)
      reject(error)
    })
  }
)

export default service
