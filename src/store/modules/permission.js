import { defineStore } from 'pinia'
import { menus } from '@/permission/menus'
import { getRandomNumber } from '@/utils/utils'

const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layouts/index.vue')

export const usePermissionStore = defineStore('permission', {
  persist: {
    key: 'permission',
    storage: window.localStorage,
  },
  state: () => ({
    projectList: [],
    // 当前激活的项目
    activeProject: '',
    routes: [],
  }),
  actions: {
    // 初始化项目列表（模拟异步）
    initProject() {
      setTimeout(
        () => {
          this.projectList = menus.filter(item => item.type === 0)
        },
        getRandomNumber(100, 1000)
      )
    },
    getMenus(projectId) {
      this.activeProject = projectId
      return new Promise(resolve => {
        setTimeout(
          () => {
            const project = this.projectList.find(item => item.id === projectId)
            const dynamicRoutes = this.parseDynamicRoutes([project])
            console.log(dynamicRoutes)
            resolve(dynamicRoutes)
          },
          getRandomNumber(100, 1000)
        )
      })
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
