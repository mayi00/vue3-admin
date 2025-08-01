import { defineStore } from 'pinia'
import { deepClone, getRandomNumber, sortByFields, uniqueByField } from '@/utils/utils'

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
    sidebarRoutes: [],
  }),
  actions: {
    // 保存访问过的路由源数据
    saveRoutes(route) {
      this.sidebarRoutes = deepClone(route)
      const tempRoutes = [...this.allDynamicRoutes, route]
      const nonrepetitiveRoutes = uniqueByField(tempRoutes, 'id')
      this.allDynamicRoutes = sortByFields(nonrepetitiveRoutes, [{ field: 'sort', order: 'asc' }])
    },
    // 
    getRoutes() {
      const dynamicRoutes = this.parseDynamicRoutes(this.allDynamicRoutes)
      return dynamicRoutes
    },
    // 递归解析动态路由
    // 将路由组件路径转换为实际的组件对象
    parseDynamicRoutes(rawRoutes) {
      const parsedRoutes = []

      rawRoutes.forEach(route => {
        const normalizedRoute = { ...route }

        // 处理组件路径
        normalizedRoute.component =
          normalizedRoute.component === 'Layout' ? Layout : modules[`../../views/${normalizedRoute.component}.vue`]

        // 递归解析子路由
        if (normalizedRoute.children && normalizedRoute.children.length > 0) {
          normalizedRoute.children = this.parseDynamicRoutes(route.children)
        }

        parsedRoutes.push(normalizedRoute)
      })

      return parsedRoutes
    },
  },
})
