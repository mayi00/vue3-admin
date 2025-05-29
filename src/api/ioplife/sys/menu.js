import request from '../request'
import { getProxyConfig } from '../config'

const { sys } = getProxyConfig()

export default {
  /**
   * 获取项目列表
   * @param {*} params loginId
   * @returns
   */
  projectList(params) {
    return request({
      url: `${sys}/menu/projectList`,
      method: 'get',
      params,
    })
  },
}
