import request from '@/utils/request'

export default {
  // 名人名言查询
  query(params) {
    return request({
      url: '/proxy-jisuapi/yiju/query',
      method: 'get',
      params,
    })
  },
  // 名言类型
  class(params) {
    return request({
      url: '/proxy-jisuapi/yiju/class',
      method: 'get',
      params,
    })
  },
  // 名言作者
  author(params) {
    return request({
      url: '/proxy-jisuapi/yiju/author',
      method: 'get',
      params,
    })
  },
}
