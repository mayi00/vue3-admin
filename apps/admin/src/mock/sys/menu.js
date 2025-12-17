import { menus } from '@/constant/sys/menus/index.js'
import { cloneDeep, orderBy } from 'lodash-es'

export function setupMenuMock(mock, faker) {
  mock.onPost('/menu/module').reply(config => {
    console.log('【Mock】/menu/module', config)
    const modules = cloneDeep(menus)
    modules.forEach(item => {
      delete item.children
    })
    return [200, { code: 0, message: 'success', data: modules }]
  })
  mock.onPost('/menu/list').reply(config => {
    console.log('【Mock】/menu/list', config)
    const moduleId = JSON.parse(config.data).moduleId
    const tempMenus = cloneDeep(menus)
    const menuList = tempMenus.find(item => item.id === moduleId)
    return [200, { code: 0, message: 'success', data: menuList }]
  })
}
