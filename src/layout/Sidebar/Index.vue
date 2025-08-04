<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
import { useAppStore, usePermissionStore } from '@/store'

defineOptions({ name: 'SideBar' })

const currentRoute = useRoute()
const { sidebarCollapsed } = storeToRefs(useAppStore())
const { sidebarRoutes } = storeToRefs(usePermissionStore())
const menuList = computed(() => sidebarRoutes.value.children || [])
</script>

<template>
  <div class="sidebar">
    <el-menu
      :default-active="currentRoute.path"
      unique-opened
      :collapse="sidebarCollapsed"
      style="height: 100%; overflow: auto"
    >
      <template v-for="(item, i) in menuList" :key="item.path">
        <SidebarMenuItem v-if="item.visible" :item="item" />
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  width: 100%;
  height: 100%;
}
</style>
