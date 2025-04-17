import request from './request'
import { getProxyConfig } from './config'

const { jisuapi } = getProxyConfig()

export default {
  // 汇率转换
  convert(params) {
    return request({
      url: `${jisuapi}/exchange/convert`,
      method: 'get',
      params,
    })
  },
  // 单个货币
  single(params) {
    return request({
      url: `${jisuapi}/exchange/single`,
      method: 'get',
      params,
    })
  },
  // 所有货币
  currency(params) {
    return request({
      url: `${jisuapi}/exchange/currency`,
      method: 'get',
      params,
    })
  },
  // 十大银行的外汇牌价
  bank(params) {
    return request({
      url: `${jisuapi}/exchange/bank`,
      method: 'get',
      params,
    })
  },
}
