import { organizations } from '@/constant/sys/organizations.js'
import { cloneDeep, orderBy } from 'lodash-es'

export function setupOrganizationMock(mock, faker) {
  // 获取机构列表
  mock.onPost('/organization/list').reply(config => {
    console.log('【Mock】/organization/list', config)
    const tempOrg = cloneDeep(organizations)
    const orgList = orderBy(tempOrg, 'sort', 'asc')
    return [200, { code: 0, message: 'success', data: orgList }]
  })

  // 新增机构
  mock.onPost('/organization/add').reply(config => {
    console.log('【Mock】/organization/add', config)
    // 新增逻辑
    return [200, { code: 0, message: '新增成功' }]
  })

  // 编辑机构
  mock.onPost('/organization/update').reply(config => {
    console.log('【Mock】/organization/update', config)
    // 处理编辑逻辑
    return [200, { code: 0, message: '编辑成功' }]
  })

  // 删除机构
  mock.onPost('/organization/delete').reply(config => {
    console.log('【Mock】/organization/delete', config)
    // 处理删除逻辑
    return [200, { code: 0, message: '删除成功' }]
  })

  // 获取子机构列表
  mock.onPost('/organization/getChildren').reply(config => {
    console.log('【Mock】/organization/getChildren', config)
    const { parentId } = JSON.parse(config.data) || {}
    const tempOrg = cloneDeep(organizations)

    // 递归查找父机构
    const findOrg = orgs => {
      for (const org of orgs) {
        if (org.id === parentId) {
          return org
        }
        if (org.children && org.children.length) {
          const result = findOrg(org.children)
          if (result) {
            return result
          }
        }
      }
      return null
    }

    const parentOrg = findOrg(tempOrg)
    const children = parentOrg ? parentOrg.children || [] : []
    // 对子机构进行排序
    const sortedChildren = orderBy(children, 'sort', 'asc')

    return [200, { code: 0, message: 'success', data: sortedChildren }]
  })
}
