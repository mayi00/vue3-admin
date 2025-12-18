import request from '@/http/request'

export default {
  // 获取角色列表
  list(params, data) {
    return request({
      url: '/role/list',
      method: 'post',
      params,
      data
    })
  },
  // 添加角色
  add(data) {
    return request({
      url: '/role/add',
      method: 'post',
      data
    })
  },
  // 编辑角色
  edit(data) {
    return request({
      url: '/role/edit',
      method: 'post',
      data
    })
  },
  // 删除角色
  delete(data) {
    return request({
      url: '/role/delete',
      method: 'post',
      data
    })
  },
  // 获取所有角色
  allList() {
    return request.get('/role/allList')
  }
}
