import request from '../request'
import { getProxy } from '../config'

const { sys } = getProxy()

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
