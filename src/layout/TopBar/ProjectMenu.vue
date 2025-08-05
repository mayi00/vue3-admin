<script setup>
import { deepClone, getRandomInt, getRandomFloat, sortByFields } from '@/utils/utils'
import { initDynamicRoutes } from '@/tools/route'
import { usePermissionStore } from '@/store'
import { menus } from '@/constant/menus/index.js'

defineOptions({ name: 'ProjectMenu' })

const { projectList, projectId } = storeToRefs(usePermissionStore())

initProject()

// 初始化项目列表（模拟异步）
function initProject() {
  const delayed = getRandomInt(1, 200)
  setTimeout(() => {
    const tempMenus = deepClone(menus)
    tempMenus.forEach(item => {
      delete item.children
    })
    const menuList = tempMenus.filter(item => item.type === 0)
    projectList.value = sortByFields(menuList, [{ field: 'sort', order: 'asc' }])
  }, delayed)
}

// 点击导航栏的项目，获取项目下的菜单
function handleClickMenuItem(item) {
  if (projectId.value === item.id) return
  projectId.value = item.id
  getMenus(item.id).then(res => {
    usePermissionStore().saveRoutes(res)
    initDynamicRoutes()
  })
}
// 获取项目下的菜单（模拟异步请求）
function getMenus(projectId) {
  const delayed = getRandomFloat(1, 300, 2)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tempMenus = deepClone(menus)
      const project = tempMenus.find(item => item.id === projectId)
      resolve(project)
    }, delayed)
  })
}
</script>

<template>
  <div class="project-menu">
    <el-menu mode="horizontal" :default-active="projectId">
      <template v-for="item in projectList" :key="item.id">
        <el-menu-item v-if="item.visible === 1" :index="item.id" @click="handleClickMenuItem(item)">
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.project-menu {
  flex: 1;
  min-width: 0;
  height: 100%;
}
// 覆盖el-menu的默认高度
.el-menu--horizontal {
  --el-menu-horizontal-height: 100%;
}
.el-menu--horizontal.el-menu {
  border-bottom: none;
}
</style>
