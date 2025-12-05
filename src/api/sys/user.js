import request from '@/http/request'

export default {
  // 获取用户列表
  list(params, data) {
    return request({
      url: '/user/list',
      method: 'post',
      params,
      data
    })
  },
  // 添加用户
  add(data) {
    return request({
      url: '/user/add',
      method: 'post',
      data
    })
  },
  // 编辑用户
  edit(data) {
    return request({
      url: '/user/edit',
      method: 'post',
      data
    })
  },
  // 删除用户
  delete(data) {
    return request({
      url: '/user/delete',
      method: 'post',
      data
    })
  }
}
