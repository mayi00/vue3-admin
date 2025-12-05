import request from '@/http/request.js'

export default {
  // 登录
  login(data) {
    return request.post('/auth/login', data, {
      timeout: 1000 * 5
    })
  },
  // 登出
  logout() {
    return request.post('/auth/logout')
  },
  // 获取用户信息
  getUserInfo() {
    return request.get('/auth/getUserInfo')
  }
}
