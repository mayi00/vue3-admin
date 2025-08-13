<script setup>
import { deepClone, getRandomInt, getRandomFloat, sortByFields } from '@/utils/utils'
import { initDynamicRoutes } from '@/tools/route'
import { usePermissionStore } from '@/store'
import { menus } from '@/constant/menus/index.js'

defineOptions({ name: 'Module' })

const { moduleList, moduleId } = storeToRefs(usePermissionStore())

initModule()

// 初始化项目列表（模拟异步）
function initModule() {
  const delayed = getRandomInt(1, 200)
  setTimeout(() => {
    const tempMenus = deepClone(menus)
    tempMenus.forEach(item => {
      delete item.children
    })
    const menuList = tempMenus.filter(item => item.menuType === 'MODULE')
    moduleList.value = sortByFields(menuList, [{ field: 'sort', order: 'asc' }])
  }, delayed)
}

// 点击导航栏的模块，获取模块下的菜单
function handleClickMenuItem(item) {
  if (moduleId.value === item.id) return
  moduleId.value = item.id
  getMenus(item.id).then(res => {
    usePermissionStore().saveRoutes(res)
    initDynamicRoutes()
  })
}
// 获取模块下的菜单（模拟异步请求）
function getMenus(moduleId) {
  const delayed = getRandomFloat(1, 300, 2)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tempMenus = deepClone(menus)
      const module = tempMenus.find(item => item.id === moduleId)
      resolve(module)
    }, delayed)
  })
}
</script>

<template>
  <div class="module-menu">
    <el-menu mode="horizontal" :default-active="moduleId" :ellipsis="true">
      <template v-for="item in moduleList" :key="item.id">
        <el-menu-item v-if="item.visible === 1" :index="item.id" @click="handleClickMenuItem(item)">
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.module-menu {
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
