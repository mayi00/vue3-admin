import request from '@/http/request'

export default {
  allList() {
    return request.get('/role/allList')
  }
}
