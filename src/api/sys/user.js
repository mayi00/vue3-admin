import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export default {
  // 获取用户列表
  list(params, data) {
    return request({
      url: `${sys}/user/list`,
      method: 'post',
      params,
      data
    })
  },
  // 添加用户
  add(data) {
    return request({
      url: `${sys}/user/add`,
      method: 'post',
      data
    })
  },
  // 编辑用户
  edit(data) {
    return request({
      url: `${sys}/user/edit`,
      method: 'post',
      data
    })
  },
  // 删除用户
  delete(data) {
    return request({
      url: `${sys}/user/delete`,
      method: 'post',
      data
    })
  },
  // 批量导入用户
  batchImport(data) {
    return request({
      url: `${sys}/user/batchImport`,
      method: 'post',
      data
    })
  },
  // 获取用户角色
  getUserRoles(id) {
    return request({
      url: `${sys}/user/getUserRoles/${id}`,
      method: 'get'
    })
  },
  // 保存用户角色
  saveRoles(data) {
    return request({
      url: `${sys}/user/saveRoles`,
      method: 'post',
      data
    })
  }
}
