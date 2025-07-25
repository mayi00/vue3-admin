import { defineStore } from 'pinia'
import { menus } from '@/permission/permission'
import { getRandomNumber } from '@/utils/utils'

export const usePermissionStore = defineStore('permission', {
  persist: {
    key: 'permission',
    storage: window.localStorage,
  },
  state: () => ({
    projectList: [],
    // 当前激活的项目
    activeProject: '',
    routes: []
  }),
  actions: {
    // 初始化项目列表（模拟异步）
    initProject() {
      const delayed = getRandomNumber(100, 1000)
      setTimeout(() => {
        this.projectList = menus.filter(item => item.type === 0)
      }, delayed)
    },
    getMenus(projectId) {
      this.activeProject = projectId
      const delayed = getRandomNumber(100, 1000)
      setTimeout(() => {
        const menus = this.projectList.find(item => item.id === projectId).children
        console.log(menus)
      }, delayed)
    },
  },
})
