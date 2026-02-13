import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export default {
  // 获取角色列表
  list(params, data) {
    return request({
      url: `${sys}/role/list`,
      method: 'post',
      params,
      data
    })
  },
  // 添加角色
  add(data) {
    return request({
      url: `${sys}/role/add`,
      method: 'post',
      data
    })
  },
  // 编辑角色
  edit(data) {
    return request({
      url: `${sys}/role/edit`,
      method: 'post',
      data
    })
  },
  // 更新角色状态
  updateStatus(data) {
    return request({
      url: `${sys}/role/updateStatus`,
      method: 'post',
      data
    })
  },
  // 删除角色
  delete(data) {
    return request({
      url: `${sys}/role/delete`,
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
      url: `${sys}/role/getRolePermissions`,
      method: 'post',
      data
    })
  },
  // 分配角色菜单权限
  assignPermissions(data) {
    return request({
      url: `${sys}/role/assignPermissions`,
      method: 'post',
      data
    })
  }
}
