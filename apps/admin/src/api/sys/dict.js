import request from '@/http/request.js'

export default {
  // 获取字典列表
  list() {
    return request({
      url: '/dict/list',
      method: 'get'
    })
  }
}
