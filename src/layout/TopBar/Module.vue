<script setup>
import { initDynamicRoutes } from '@/tools/route'
import { usePermissionStore } from '@/store'
import api from '@/api'

defineOptions({ name: 'Module' })

const { moduleList, moduleId, allDynamicRoutes } = storeToRefs(usePermissionStore())

/**
 * 点击导航栏的模块，获取模块下的菜单
 * @param moduleInfo  被点击的模块
 */
function handleClickMenuItem(moduleInfo) {
  if (moduleInfo.menuType === 'EXT_LINK') {
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
    api.sys.menu.getListByModule({ moduleId: moduleInfo.id }).then(res => {
      usePermissionStore().saveRoutes(res.data)
      initDynamicRoutes()
    })
  }
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
