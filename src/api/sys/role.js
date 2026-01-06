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
  // 更新角色状态
  updateStatus(data) {
    return request({
      url: '/role/updateStatus',
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
  },
  // 获取角色菜单权限
  getRolePermissions(data) {
    return request({
      url: '/role/getRolePermissions',
      method: 'post',
      data
    })
  },
  // 分配角色菜单权限
  assignPermissions(data) {
    return request({
      url: '/role/assignPermissions',
      method: 'post',
      data
    })
  }
}
