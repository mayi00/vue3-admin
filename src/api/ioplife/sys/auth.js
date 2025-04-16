import request from '../request'
import { getProxyConfig } from '../config'

const { sys } = getProxyConfig()

export default {
  // 登录
  login(data) {
    return request({
      url: `${sys}/auth/login`,
      method: 'post',
      data,
    })
  },
}
