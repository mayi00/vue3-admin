import request from '@/utils/request'
import { getProxyConfig } from './config'

const { jisuapi } = getProxyConfig()

export default {
  // 名人名言查询
  query(params) {
    return request({
      url: `${jisuapi}/yiju/query`,
      method: 'get',
      params,
    })
  },
  // 名言类型
  class(params) {
    return request({
      url: `${jisuapi}/yiju/class`,
      method: 'get',
      params,
    })
  },
  // 名言作者
  author(params) {
    return request({
      url: `${jisuapi}/yiju/author`,
      method: 'get',
      params,
    })
  },
}
