import request from '@/http/request.js'

export default {
  // 获取菜单模块
  module(data) {
    return request({
      url: '/menu/module',
      method: 'post',
      data
    })
  },
  // 获取菜单列表
  list(data) {
    return request({
      url: '/menu/list',
      method: 'post',
      data
    })
  }
}
