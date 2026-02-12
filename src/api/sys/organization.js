import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export default {
  // 获取机构列表
  list(data) {
    return request({
      url: `${sys}/organization/list`,
      method: 'post',
      data
    })
  },
  // 获取子机构列表
  getChildren(data) {
    return request({
      url: `${sys}/organization/getChildren`,
      method: 'post',
      data
    })
  },
  // 新增机构
  add(data) {
    return request({
      url: `${sys}/organization/add`,
      method: 'post',
      data
    })
  },
  // 编辑机构
  update(data) {
    return request({
      url: `${sys}/organization/update`,
      method: 'post',
      data
    })
  },
  // 删除机构
  delete(data) {
    return request({
      url: `${sys}/organization/delete`,
      method: 'post',
      data
    })
  }
}
