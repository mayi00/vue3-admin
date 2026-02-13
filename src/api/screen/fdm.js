import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { screen } = getProxyConfig()

export default {
  // 获取概览数据
  getGroupInfo() {
    return request({
      url: `${screen}/fdm/getGroupInfo`,
      method: 'get'
    })
  }
}
