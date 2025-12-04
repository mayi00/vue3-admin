import request from '@/http/request'

export default {
  list(params, data) {
    return request({
      url: '/user/list',
      method: 'post',
      params,
      data
    })
  },
  delete(data) {
    return request({
      url: '/user/delete',
      method: 'post',
      data
    })
  }
}
