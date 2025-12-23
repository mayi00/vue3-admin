import { orderBy } from 'lodash-es'
import { useStore } from '@/store'
import api from '@/api'

export function initSystemInfo() {
  return Promise.all([getUserInfo(), initModule(), initDict()])
}
// 查询登录用户的详情
export function getUserInfo() {
  return new Promise(resolve => {
    const account = useStore().userStore.userInfo.account
    api.sys.auth.getUserInfo({ account }).then(res => { 
      useStore().userStore.saveUserInfo({ ...res.data })
      resolve(res)
    })
  })
}

// 初始化项目列表
export function initModule() {
  return new Promise(resolve => {
    api.sys.menu.module().then(res => {
      const moduleList = res.data.filter(item => ['MODULE', 'MODULE_EXT_LINK'].includes(item.menuType))
      const tempList = orderBy(moduleList, ['sort'], ['asc'])
      useStore().permissionStore.saveModuleList(tempList)
      resolve(res)
    })
  })
}
// 初始化字典数据
export function initDict() {
  return new Promise(resolve => {
    api.sys.dict.list().then(res => {
      localStorage.setItem('DICT_TYPE', JSON.stringify(res.data))
      resolve(res)
    })
  })
}
