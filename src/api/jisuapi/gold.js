import request from './request.js'
import { getProxyConfig } from '@/api/baseConfig.js'

const { jisuapi } = getProxyConfig()

export default {
  // 上海黄金交易所价格
  shgold(params) {
    return request({
      url: `${jisuapi}/gold/shgold`,
      method: 'get',
      params
    })
  },
  // 上海期货交易所价格
  shfutures(params) {
    return request({
      url: `${jisuapi}/gold/shfutures`,
      method: 'get',
      params
    })
  },
  // 香港黄金价格
  hkgold(params) {
    return request({
      url: `${jisuapi}/gold/hkgold`,
      method: 'get',
      params
    })
  },
  // 银行账户黄金价格
  bank(params) {
    return request({
      url: `${jisuapi}/gold/bank`,
      method: 'get',
      params
    })
  },
  // 伦敦金、银价格
  london(params) {
    return request({
      url: `${jisuapi}/gold/london`,
      method: 'get',
      params
    })
  },
  // 金店金价
  storegold(params) {
    return request({
      url: `${jisuapi}/gold/storegold`,
      method: 'get',
      params
    })
  }
}
