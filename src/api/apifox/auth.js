import request from '@/utils/request'

export default {
  // 登录
  login(data) {
    return request({
      // baseURL: 'https://m1.apifoxmock.com/m1/6904608-6620440-default',
      url: '/auth/login',
      method: 'post',
      data,
      timeout: 1000 * 5
    })
  }
}
