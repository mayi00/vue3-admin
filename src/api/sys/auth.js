import request from '@/http/request.js'

export default {
  // 登录
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
      timeout: 1000 * 5
    })
  },
  // 登出
  logout() {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  },
  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/auth/getUserInfo',
      method: 'get'
    })
  }
}
