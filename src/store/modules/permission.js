import { defineStore } from 'pinia'
import { deepClone, sortByFields, uniqueByField } from '@/utils/utils'

export const usePermissionStore = defineStore('permission', {
  persist: {
    key: 'permission',
    storage: window.localStorage
  },
  state: () => ({
    // 模块列表
    moduleList: [],
    // 当前激活的模块 id
    moduleId: '',
    // 所有动态路由源数据，
    allDynamicRoutes: [],
    // 当前侧边栏菜单
    sidebarRoutes: {}
  }),
  actions: {
    // 保存访问过的路由源数据
    saveRoutes(sourceRoute) {
      // this.saveSidebarRoutes(sourceRoute)
      // const filteredRoutes = this.allDynamicRoutes.filter(r => r.id !== sourceRoute.id)
      // const tempRoutes = [...filteredRoutes, sourceRoute]
      // this.allDynamicRoutes = sortByFields(tempRoutes, [{ field: 'sort', order: 'asc' }])
      // localStorage.setItem('allDynamicRoutes', JSON.stringify(this.allDynamicRoutes))

      this.saveSidebarRoutes(sourceRoute)
      const tempRoutes = [...this.allDynamicRoutes, sourceRoute]
      const nonrepetitiveRoutes = uniqueByField(tempRoutes, 'id')
      this.allDynamicRoutes = sortByFields(nonrepetitiveRoutes, [{ field: 'sort', order: 'asc' }])
      localStorage.setItem('allDynamicRoutes', JSON.stringify(this.allDynamicRoutes))
    },
    // 保存侧边栏路由源数据
    saveSidebarRoutes(sourceRoute) {
      this.sidebarRoutes = deepClone(sourceRoute)
    }
  }
})
