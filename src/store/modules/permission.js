import { defineStore } from 'pinia'
import { deepClone, getRandomNumber, sortByFields, uniqueByField } from '@/utils/utils'
import { parseDynamicRoutes } from '@/tools/route'

const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

export const usePermissionStore = defineStore('permission', {
  persist: {
    key: 'permission',
    storage: window.localStorage,
  },
  state: () => ({
    // 项目列表
    projectList: [],
    // 当前激活的项目id
    projectId: '',
    // 所有动态路由源数据，
    allDynamicRoutes: [],
    // 当前侧边栏菜单
    sidebarRoutes: {},
  }),
  actions: {
    // 保存访问过的路由源数据
    saveRoutes(route) {
      this.sidebarRoutes = deepClone(route)
      const tempRoutes = [...this.allDynamicRoutes, route]
      const nonrepetitiveRoutes = uniqueByField(tempRoutes, 'id')
      this.allDynamicRoutes = sortByFields(nonrepetitiveRoutes, [{ field: 'sort', order: 'asc' }])
      localStorage.setItem('allDynamicRoutes', JSON.stringify(this.allDynamicRoutes))
    },
  },
})
