import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '',
  timeout: 1000 * 10,
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.timeout === 0) {
      config.timeout = 0
    } else if (!config.timeout) {
      config.timeout = 1000 * 10
    }
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
      config.headers['Auth'] = user.token
      config.headers['loginid'] = user.user.loginId
    }
    config.headers['access-token'] = 'tokenforui'
    console.log('【请求config：】', config)
    return config
  },
  error => {
    return new Promise((resolve, reject) => {
      // 处理请求错误
      console.error('【请求错误】', error)
      reject(error)
    })
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      console.log('【响应】', response)
      if (response.status === 200) {
        if (['blob', 'arraybuffer'].includes(response.config.responseType)) {
          // 处理二进制数据
          resolve(response.data)
        } else if (response.data.code === '0') {
          // 成功
          resolve(response.data.data)
        } else if (response.data.code === '2') {
          // 成功-但需要特殊处理
          resolve(response.data)
        } else if (response.data.code === '1') {
          // 失败
          ElMessage.error(response.data.message || response.data.msg)
          reject(response.data.data)
        } else {
          // 错误-需要特殊处理
          reject(response.data)
        }
      } else {
        reject(response.data)
      }
    })
  },
  error => {
    return new Promise((resolve, reject) => {
      // 处理响应错误
      console.error('【响应错误】', error)
      reject(error)
    })
  }
)

const request = async ({ baseURL, url, method, params, data, timeout, headers, responseType }) => {
  return await service({
    baseURL,
    url,
    method,
    params,
    data,
    timeout,
    headers,
    responseType,
  })
}

export default request
