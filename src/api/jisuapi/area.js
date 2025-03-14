import request from '@/utils/request'

export default {
  // 获取全部省份
  province(params) {
    return request({
      url: '/proxy-jisuapi/area/province',
      method: 'get',
      params,
    })
  },
  // 根据省份获取市
  city(params) {
    return request({
      url: '/proxy-jisuapi/area/city',
      method: 'get',
      params,
    })
  },
  // 根据市获取区县
  town(params) {
    return request({
      url: '/proxy-jisuapi/area/town',
      method: 'get',
      params,
    })
  },
}
