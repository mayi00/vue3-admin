import { menus } from '@/constant/sys/menus/index.js'
import { cloneDeep, orderBy } from 'lodash-es'

export function setupMenuMock(mock, faker) {
  // 获取菜单模块
  mock.onPost('/menu/module').reply(config => {
    console.log('【Mock】/menu/module', config)
    const modules = cloneDeep(menus)
    modules.forEach(item => {
      delete item.children
    })
    return [200, { code: 0, message: 'success', data: modules }]
  })
  // 根据模块获取菜单列表
  mock.onPost('/menu/getListByModule').reply(config => {
    console.log('【Mock】/menu/getListByModule', config)
    const moduleId = JSON.parse(config.data).moduleId
    const tempMenus = cloneDeep(menus)
    const menuList = tempMenus.find(item => item.id === moduleId)
    return [200, { code: 0, message: 'success', data: menuList }]
  })
  // 获取所有菜单列表
  mock.onPost('/menu/list').reply(config => {
    console.log('【Mock】/menu/list', config)
    const tempMenus = cloneDeep(menus)
    const menuList = orderBy(tempMenus, 'sort', 'asc')
    return [200, { code: 0, message: 'success', data: menuList }]
  })
  // 新增菜单
  mock.onPost('/menu/add').reply(config => {
    console.log('【Mock】/menu/add', config)
    return [200, { code: 0, message: '新增成功' }]
  })

  // 编辑菜单
  mock.onPost('/menu/update').reply(config => {
    console.log('【Mock】/menu/update', config)
    return [200, { code: 0, message: '编辑成功' }]
  })

  // 删除菜单
  mock.onPost('/menu/delete').reply(config => {
    console.log('【Mock】/menu/delete', config)
    return [200, { code: 0, message: '删除成功' }]
  })
}
