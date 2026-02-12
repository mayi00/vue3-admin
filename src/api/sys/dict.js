import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export default {
  // 获取字典列表
  list(params, data) {
    return request({
      url: `${sys}/dict/list`,
      method: 'post',
      params,
      data
    })
  },
  // 新增字典
  add(data) {
    return request({
      url: `${sys}/dict/add`,
      method: 'post',
      data
    })
  },
  // 编辑字典
  edit(data) {
    return request({
      url: `${sys}/dict/edit`,
      method: 'put',
      data
    })
  },
  // 删除字典
  delete(data) {
    return request({
      url: `${sys}/dict/delete`,
      method: 'delete',
      data
    })
  },
  // 获取所有字典
  allList() {
    return request.get(`${sys}/dict/allList`)
  },
  // 获取字典数据列表
  dataList(params) {
    return request({
      url: `${sys}/dict/data/list`,
      method: 'get',
      params
    })
  },
  // 新增字典数据
  addDictData(data) {
    return request({
      url: `${sys}/dict/data/add`,
      method: 'post',
      data
    })
  },
  // 编辑字典数据
  editDictData(data) {
    return request({
      url: `${sys}/dict/data/edit`,
      method: 'put',
      data
    })
  },
  // 删除字典数据
  deleteDictData(data) {
    return request({
      url: `${sys}/dict/data/delete`, 
      method: 'delete',
      data
    })
  }
}
