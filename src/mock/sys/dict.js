import { DICT_TYPE } from '@/constant/sys/dict'
import { cloneDeep } from 'lodash-es'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export function setupDictMock(mock, faker) {
  // 获取所有字典
  mock.onGet(`${sys}/dict/allList`).reply(config => {
    console.log('【Mock】/dict/allList', config)
    return [200, { code: 0, message: 'success', data: DICT_TYPE }]
  })
  // 获取字典列表
  mock.onPost(`${sys}/dict/list`).reply(config => {
    console.log('【Mock】/dict/list', config)

    // 解析参数
    const currentPage = parseInt(config.params?.currentPage) || 1
    const pageSize = parseInt(config.params?.pageSize) || 10

    const total = DICT_TYPE.length
    const totalPages = Math.ceil(total / pageSize)
    const dictTypeList = cloneDeep(DICT_TYPE).map(item => {
      delete item.children
      return {
        ...item,
        id: faker.string.uuid(),
        status: faker.helpers.weightedArrayElement([
          { weight: 9, value: 'ENABLED' },
          { weight: 1, value: 'DISABLED' }
        ])
      }
    })

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

  // 获取字典数据列表
  mock.onGet(`${sys}/dict/data/list`).reply(config => {
    console.log('【Mock】/dict/data/list', config)
    // 解析参数
    const currentPage = parseInt(config.params?.currentPage) || 1
    const pageSize = parseInt(config.params?.pageSize) || 10
    const dictType = config.params?.dictType || ''
    const filterList = DICT_TYPE.find(item => item.dictValue === dictType)?.children || []
    const list = filterList.map(item => ({
      ...item,
      id: faker.string.uuid(),
      status: faker.helpers.weightedArrayElement([
        { weight: 9, value: 'ENABLED' },
        { weight: 1, value: 'DISABLED' }
      ])
    }))

    return [
      200,
      {
        code: 0,
        message: 'success',
        data: {
          currentPage,
          pageSize,
          totalPages: Math.ceil(filterList.length / pageSize),
          total: filterList.length,
          list
        }
      }
    ]
  })

  // 新增字典类型
  mock.onPost(`${sys}/dict/add`).reply(config => {
    console.log('【Mock】/dict/add', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 编辑字典类型
  mock.onPut(`${sys}/dict/edit`).reply(config => {
    console.log('【Mock】/dict/edit', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 删除字典类型
  mock.onDelete(`${sys}/dict/delete`).reply(config => {
    console.log('【Mock】/dict/delete', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 新增字典数据
  mock.onPost(`${sys}/dict/data/add`).reply(config => {
    console.log('【Mock】/dict/data/add', config)
    const data = JSON.parse(config.data)
    console.log('新增字典数据:', data)
    return [200, { code: 0, message: 'success' }]
  })

  // 编辑字典数据
  mock.onPut(`${sys}/dict/data/edit`).reply(config => {
    console.log('【Mock】/dict/data/edit', config)
    const data = JSON.parse(config.data)
    console.log('编辑字典数据:', data)
    return [200, { code: 0, message: 'success' }]
  })

  // 删除字典数据
  mock.onDelete(`${sys}/dict/data/delete`).reply(config => {
    console.log('【Mock】/dict/data/delete', config)
    const data = JSON.parse(config.data)
    console.log('删除字典数据:', data)
    return [200, { code: 0, message: 'success' }]
  })
}
