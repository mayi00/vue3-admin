import request from '@/http/request.js'

export default {
  // 获取机构列表
  list(data) {
    return request({
      url: '/organization/list',
      method: 'post',
      data
    })
  },
  // 获取子机构列表
  getChildren(data) {
    return request({
      url: '/organization/getChildren',
      method: 'post',
      data
    })
  },
  // 新增机构
  add(data) {
    return request({
      url: '/organization/add',
      method: 'post',
      data
    })
  },
  // 编辑机构
  update(data) {
    return request({
      url: '/organization/update',
      method: 'post',
      data
    })
  },
  // 删除机构
  delete(data) {
    return request({
      url: '/organization/delete',
      method: 'post',
      data
    })
  }
}
