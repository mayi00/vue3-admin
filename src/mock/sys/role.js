import { roleList } from '@/constant/sys/role'

export function setupRoleMock(mock, faker) {
  // 获取角色列表
  mock.onPost('/role/list').reply(config => {
    console.log('【Mock】/role/list', config)

    // 解析参数
    const currentPage = parseInt(config.params?.currentPage) || 1
    const pageSize = parseInt(config.params?.pageSize) || 10
    const total = roleList.length

    // 解析查询条件
    let searchData = {}
    try {
      searchData = JSON.parse(config.data)
    } catch (e) {
      searchData = config.data || {}
    }

    // 过滤数据
    let filteredList = [...roleList]
    if (searchData.roleName) {
      filteredList = filteredList.filter(role => role.roleName.includes(searchData.roleName))
    }

    const filteredTotal = filteredList.length
    const filteredTotalPages = Math.ceil(filteredTotal / pageSize)

    // 分页处理
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedList = filteredList.slice(startIndex, endIndex).map(item => {
      return {
        ...item,
        id: faker.string.uuid(),
        status: faker.helpers.weightedArrayElement([
          { weight: 9, value: '1' },
          { weight: 1, value: '0' }
        ]),
        createTime: faker.date.past().toISOString()
      }
    })

    return [
      200,
      {
        code: 0,
        message: 'success',
        data: {
          currentPage,
          pageSize,
          totalPages: filteredTotalPages,
          total: filteredTotal,
          list: paginatedList
        }
      }
    ]
  })

  // 新增角色
  mock.onPost('/role/add').reply(config => {
    console.log('【Mock】/role/add', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 编辑角色
  mock.onPost('/role/edit').reply(config => {
    console.log('【Mock】/role/edit', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 删除角色
  mock.onPost('/role/delete').reply(config => {
    console.log('【Mock】/role/delete', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 获取所有角色列表
  mock.onGet('/role/allList').reply(config => {
    return [200, { code: 0, message: 'success', data: roleList }]
  })
}
