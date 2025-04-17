import request from './request'
import { getProxyConfig } from './config'

const { jisuapi } = getProxyConfig()

export default {
  // 获取全部省份
  province(params) {
    return request({
      url: `${jisuapi}/area/province`,
      method: 'get',
      params,
    })
  },
  // 根据省份获取市
  city(params) {
    return request({
      url: `${jisuapi}/area/city`,
      method: 'get',
      params,
    })
  },
  // 根据市获取区县
  town(params) {
    return request({
      url: `${jisuapi}/area/town`,
      method: 'get',
      params,
    })
  },
}
