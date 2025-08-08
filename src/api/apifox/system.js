import request from './request'

export default {
  userlist(params) {
    return request({
      url: '/system/user/list',
      method: 'get',
      params
    })
  }
}
