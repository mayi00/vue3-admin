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
  }
}
