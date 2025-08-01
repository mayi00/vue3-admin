<script setup>
import { deepClone, getRandomNumber, sortByFields } from '@/utils/utils'
import router from '@/router'
import { usePermissionStore } from '@/store'

import { menus } from '@/constant/menus'

defineOptions({ name: 'TopBar' })

const { projectList, projectId } = storeToRefs(usePermissionStore())

initProject()
initDynamicRoutes()

// 初始化项目列表（模拟异步）
function initProject() {
  setTimeout(
    () => {
      const tempMenus = deepClone(menus)
      tempMenus.forEach(item => {
        delete item.children
      })
      const menuList = tempMenus.filter(item => item.type === 0 && item.visible === 1)
      projectList.value = sortByFields(menuList, [{ field: 'sort', order: 'asc' }])
    },
    getRandomNumber(50, 500)
  )
}

// 点击导航栏的项目，获取项目下的菜单
function handleClickMenuItem(item) {
  projectId.value = item.id
  getMenus(item.id).then(res => {
    usePermissionStore().saveRoutes(res)
    initDynamicRoutes()
  })
}
// 获取项目下的菜单（模拟异步请求）
function getMenus(projectId) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const tempMenus = deepClone(menus)
        const project = tempMenus.find(item => item.id === projectId)
        resolve(project)
      },
      getRandomNumber(50, 500)
    )
  })
}
function initDynamicRoutes() {
  const dynamicRoutes = usePermissionStore().getRoutes()
  dynamicRoutes.forEach(route => {
    router.addRoute(route)
  })
  console.log(router.getRoutes())
}
</script>

<template>
  <div class="top-bar">
    <el-menu mode="horizontal" :default-active="projectId">
      <template v-for="item in projectList" :key="item.id">
        <el-menu-item v-if="item.visible === 1" :index="item.id" @click="handleClickMenuItem(item)">
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.top-bar {
  height: 50px;
}
</style>
