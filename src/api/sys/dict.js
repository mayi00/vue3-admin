import request from '@/http/request.js'

export default {
  // 获取字典列表
  list(params, data) {
    return request({
      url: '/dict/list',
      method: 'post',
      params,
      data
    })
  },
  // 新增字典
  add(data) {
    return request({
      url: '/dict/add',
      method: 'post',
      data
    })
  },
  // 编辑字典
  edit(data) {
    return request({
      url: '/dict/edit',
      method: 'put',
      data
    })
  },
  // 删除字典
  delete(data) {
    return request({
      url: '/dict/delete',
      method: 'delete',
      data
    })
  },
  // 获取所有字典
  allList() {
    return request.get('/dict/allList')
  }
}
