// 模拟数据
const mockData = [
  {
    id: 1,
    title: '系统升级通知',
    type: '1',
    content: '系统将于今晚23:00-次日凌晨2:00进行升级维护，期间系统将暂时无法使用，请提前做好相关工作安排。',
    status: '1',
    createTime: '2026-01-01 10:00:00',
    createBy: 'admin'
  },
  {
    id: 2,
    title: '新年放假安排',
    type: '2',
    content:
      '根据国家法定节假日安排，2026年春节放假时间为1月20日至1月27日，共8天。1月18日（星期六）、1月19日（星期日）正常上班。',
    status: '1',
    createTime: '2025-12-30 15:30:00',
    createBy: 'admin'
  },
  {
    id: 3,
    title: '安全意识培训',
    type: '1',
    content: '为提高员工安全意识，公司将于1月15日下午2:00在会议室举办安全意识培训，请全体员工准时参加。',
    status: '1',
    createTime: '2026-01-10 09:00:00',
    createBy: 'admin'
  },
  {
    id: 4,
    title: '年度工作总结',
    type: '2',
    content: '请各部门于1月25日前提交2025年度工作总结及2026年度工作计划，电子版发送至行政部邮箱。',
    status: '1',
    createTime: '2026-01-05 14:00:00',
    createBy: 'admin'
  },
  {
    id: 5,
    title: '网络维护通知',
    type: '1',
    content: '网络部门将于本周六上午8:00-10:00进行网络设备维护，期间可能会出现短暂的网络中断，请各位同事理解。',
    status: '1',
    createTime: '2026-01-08 16:00:00',
    createBy: 'admin'
  }
]

export function setupNoticeMock(mock, faker) {
  // 获取通知公告列表
  mock.onPost('/sys/notice/list').reply(config => {
    const { pageSize, currentPage } = JSON.parse(config.data).params || {}
    const { title, type } = JSON.parse(config.data).data || {}

    // 根据条件过滤
    let filteredData = [...mockData]
    if (title) {
      filteredData = filteredData.filter(item => item.title.includes(title))
    }

    if (type) {
      filteredData = filteredData.filter(item => item.type === type)
    }

    // 分页
    const total = filteredData.length
    const start = (currentPage - 1) * pageSize
    const end = start + parseInt(pageSize)
    const data = filteredData.slice(start, end)

    return [
      200,
      {
        code: 200,
        message: 'success',
        data: {
          list: data,
          total: total
        }
      }
    ]
  })

  // 获取通知公告详情
  mock.onGet(/\/sys\/notice\/get\/\d+/).reply(config => {
    const id = parseInt(config.url.split('/').pop())
    const notice = mockData.find(item => item.id === id)

    return [
      200,
      {
        code: 200,
        message: 'success',
        data: notice
      }
    ]
  })

  // 新增通知公告
  mock.onPost('/sys/notice/add').reply(() => {
    return [200, { code: 200, message: 'success' }]
  })

  // 编辑通知公告
  mock.onPost('/sys/notice/edit').reply(() => {
    return [200, { code: 200, message: 'success' }]
  })

  // 删除通知公告
  mock.onPost('/sys/notice/delete').reply(() => {
    return [200, { code: 200, message: 'success' }]
  })
}
