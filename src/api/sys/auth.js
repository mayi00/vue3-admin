import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export default {
  // 登录
  login(data) {
    return request.post(`${sys}/auth/login`, data, {
      timeout: 1000 * 5
    })
  },
  // 登出
  logout() {
    return request.post(`${sys}/auth/logout`)
  },
  // 获取用户信息
  getUserInfo(params) {
    return request.get(`${sys}/auth/getUserInfo`, { params })
  }
}
