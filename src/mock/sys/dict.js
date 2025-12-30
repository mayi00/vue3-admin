import { DICT_TYPE } from '@/constant/sys/dict'
import { cloneDeep } from 'lodash-es'

export function setupDictMock(mock, faker) {
  // 获取所有字典
  mock.onGet('/dict/allList').reply(config => {
    console.log('【Mock】/dict/allList', config)
    return [200, { code: 0, message: 'success', data: DICT_TYPE }]
  })
  // 获取字典列表
  mock.onPost('/dict/list').reply(config => {
    console.log('【Mock】/dict/list', config)

    // 解析参数
    const currentPage = parseInt(config.params?.currentPage) || 1
    const pageSize = parseInt(config.params?.pageSize) || 10

    const total = DICT_TYPE.length
    const totalPages = Math.ceil(total / pageSize)
    const dictTypeList = cloneDeep(DICT_TYPE).map(item => ({
      ...item,
      id: faker.string.uuid(),
      status: faker.helpers.weightedArrayElement([
        { weight: 9, value: 'ENABLED' },
        { weight: 1, value: 'DISABLED' }
      ])
    }))

    // 分页处理
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const list = dictTypeList.slice(start, end)

    return [
      200,
      {
        code: 0,
        message: 'success',
        data: {
          currentPage,
          pageSize,
          totalPages,
          total,
          list
        }
      }
    ]
  })

  // 新增字典类型
  mock.onPost('/dict/add').reply(config => {
    console.log('【Mock】/dict/add', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 编辑字典类型
  mock.onPut('/dict/edit').reply(config => {
    console.log('【Mock】/dict/edit', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 删除字典类型
  mock.onDelete('/dict/delete').reply(config => {
    console.log('【Mock】/dict/delete', config)
    return [200, { code: 0, message: 'success' }]
  })
}
