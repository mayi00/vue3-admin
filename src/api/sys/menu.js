import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export default {
  // 获取菜单模块
  module(data) {
    return request({
      url: `${sys}/menu/module`,
      method: 'post',
      data
    })
  },
  // 根据模块获取菜单列表
  getListByModule(data) {
    return request({
      url: `${sys}/menu/getListByModule`,
      method: 'post',
      data
    })
  },
  // 获取所有菜单列表
  list(data) {
    return request({
      url: `${sys}/menu/list`,
      method: 'post',
      data
    })
  },
  // 新增菜单
  add(data) {
    return request({
      url: `${sys}/menu/add`,
      method: 'post',
      data
    })
  },
  // 编辑菜单
  update(data) {
    return request({
      url: `${sys}/menu/update`,
      method: 'post',
      data
    })
  },
  // 删除菜单
  delete(data) {
    return request({
      url: `${sys}/menu/delete`,
      method: 'post',
      data
    })
  }
}
