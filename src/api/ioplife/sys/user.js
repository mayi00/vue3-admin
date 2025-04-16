import request from '../request'
import { getProxy } from '../config'

const { sys } = getProxy()

export default {
  // 获取用户信息
  userProfile() {
    return request({
      url: `${sys}/user/userProfile`,
      method: 'get',
      timeout: 30000,
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
