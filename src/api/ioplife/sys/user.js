import request from '../request'
import { getProxyConfig } from '../config'

const { sys } = getProxyConfig()

export default {
  // 获取用户信息
  userProfile() {
    return request({
      url: `${sys}/user/userProfile`,
      method: 'get',
    })
  },
  /**
   * 获取用户信息
   * 实际上不存在此接口，只是为了测试
   * @returns
   */
  userProfile2() {
    return request({
      url: `${sys}/user/userProfile2`,
      method: 'get',
    })
  },
  // 获取用户列表
  queryPage(params, data) {
    return request({
      url: `${sys}/user/queryPage`,
      method: 'post',
      params,
      data,
    })
  },
  // 下载人员管理模板
  download() {
    return request({
      url: `${sys}/user/download`,
      method: 'get',
      timeout: 1000 * 120,
      responseType: 'blob',
    })
  },
}
