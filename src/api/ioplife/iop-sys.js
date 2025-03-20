import request from '@/utils/request'

export default {
  // 登录
  queryByLoginId(data) {
    return request({
      url: '/proxy-ioplife/ioplife/pxy/iop-sys/sys/api/auth/login',
      method: 'post',
      data,
    })
  },
}
