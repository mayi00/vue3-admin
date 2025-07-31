import { defineStore } from 'pinia'
import { getRandomNumber, sortByFields } from '@/utils/utils'

const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

export const usePermissionStore = defineStore('permission', {
  persist: {
    key: 'permission',
    storage: window.localStorage,
  },
  state: () => ({
    projectList: [],
    // 当前激活的项目
    activeProject: '',
    // 当前侧边栏菜单
    currentMenus: [],
    routes: [],
  }),
  actions: {
    saveRoutes(route) {
      const routes = [...this.routes, route]
      
    },
    getRoutes(project) {
      const dynamicRoutes = this.parseDynamicRoutes([project])
      this.currentMenus = [...dynamicRoutes]
      this.routes = [...this.routes, ...dynamicRoutes]

      console.log(this.routes, 'this.routes');

      return this.routes
    },
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
