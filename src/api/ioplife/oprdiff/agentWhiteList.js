/**
 * 运营差异化管理
 *
 * 差异化的后台对访问IP进行限制，只有在白名单中的IP才能访问后台，
 * 其中包括了 localhost ，端口为 8080 的访问，
 */
import request from '../request'
import { getProxyConfig } from '../config'

const { oprdiff } = getProxyConfig()

export default {
  // 获取代理人白名单列表
  queryPage(params, data) {
    return request({
      url: `${oprdiff}/api/agentWhiteList/queryPage`,
      method: 'post',
      params,
      data,
    })
  },

  /**
   * 下载人员管理模板
   * 这个实际上是一个放在服务器的文件，并不是一个接口
   * @returns {Promise} 二进制流
   */
  agentWhiteListTemplate() {
    return request({
      url: `${oprdiff}/agentWhiteListTemplate.xlsx`,
      method: 'get',
      timeout: 1000 * 120,
      responseType: 'blob',
    })
  },
}
