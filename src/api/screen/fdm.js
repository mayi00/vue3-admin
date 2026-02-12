import request from '@/http/request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { screen } = getProxyConfig()

export default {
  // 获取概览数据
  overview() {
    return request.get(`${screen}/fdm/overview`)
  }
}
