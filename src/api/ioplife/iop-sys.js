import request from './request'

export default {
  // 登录
  login(data) {
    return request({
      url: '/proxy-ioplife/ioplife/pxy/iop-sys/sys/api/auth/login',
      method: 'post',
      data,
    })
  },
  // 获取用户信息
  userProfile() {
    return request({
      url: '/proxy-ioplife/ioplife/pxy/iop-sys/sys/api/user/userProfile',
      method: 'get',
      timeout: 30000,
    })
  },
  // 下载人员管理模板
  download() {
    return request({
      url: '/proxy-ioplife/ioplife/pxy/iop-sys/sys/api/user/download',
      method: 'get',
      timeout: 1000 * 120,
      responseType: 'blob',
    })
  },
}
