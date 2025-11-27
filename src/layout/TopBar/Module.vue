<script setup>
import { cloneDeep, orderBy } from 'lodash-es'
import { getRandomInt, getRandomFloat } from '@/utils/utils'
import { initDynamicRoutes } from '@/tools/route'
import { usePermissionStore } from '@/store'
import { menus } from '@/constant/menus/index.js'

defineOptions({ name: 'Module' })

const { moduleList, moduleId, allDynamicRoutes } = storeToRefs(usePermissionStore())

initModule()

// 初始化项目列表（模拟异步）
function initModule() {
  const delayed = getRandomInt(1, 200)
  setTimeout(() => {
    const tempMenus = cloneDeep(menus)
    tempMenus.forEach(item => {
      delete item.children
    })
    const menuList = tempMenus.filter(item => ['MODULE', 'MODULE_EXT_LINK'].includes(item.menuType))
    moduleList.value = orderBy(menuList, ['sort'], ['asc'])
  }, delayed)
}

/**
 * 点击导航栏的模块，获取模块下的菜单
 * @param moduleInfo  被点击的模块
 */
function handleClickMenuItem(moduleInfo) {
  if (moduleInfo.menuType === 'MODULE_EXT_LINK') {
    window.open(moduleInfo.path)
    return
  }
  if (moduleId.value === moduleInfo.id) return
  moduleId.value = moduleInfo.id
  const tempModule = allDynamicRoutes.value.find(item => item.id === moduleId.value)

  // 处理已缓存模块的情况
  if (tempModule) {
    usePermissionStore().saveSidebarRoutes(tempModule)
    initDynamicRoutes()
  } else {
    // 首次加载模块时获取菜单数据并初始化路由
    getMenus(moduleInfo.id).then(res => {
      usePermissionStore().saveRoutes(res)
      initDynamicRoutes()
    })
  }
}
// 获取模块下的菜单（模拟异步请求）
function getMenus(moduleId) {
  const delayed = getRandomFloat(1, 300, 2)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tempMenus = cloneDeep(menus)
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
        <el-menu-item v-if="item.visible === 1" :index="item.id" @click.stop>
          <span @click.stop="handleClickMenuItem(item)"> {{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
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
