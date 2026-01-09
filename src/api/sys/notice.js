import request from '@/http/request'

// 通知公告API
export default {
  // 获取通知公告列表
  list(params, data) {
    return request({
      url: '/sys/notice/list',
      method: 'post',
      params,
      data
    })
  },
  // 获取通知公告详情
  get(id) {
    return request({
      url: `/sys/notice/get/${id}`,
      method: 'get'
    })
  },
  // 新增通知公告
  add(data) {
    return request({
      url: '/sys/notice/add',
      method: 'post',
      data
    })
  },
  // 编辑通知公告
  edit(data) {
    return request({
      url: '/sys/notice/edit',
      method: 'post',
      data
    })
  },
  // 删除通知公告
  delete(data) {
    return request({
      url: '/sys/notice/delete',
      method: 'post',
      data
    })
  }
}
