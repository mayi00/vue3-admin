import request from '@/http/request'

export default {
  list(params, data) {
    return request({
      url: '/user/list',
      method: 'post',
      params,
      data
    })
  }
}
