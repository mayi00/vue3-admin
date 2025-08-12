import request from './request'

export default {
  // 登录
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  }
}
