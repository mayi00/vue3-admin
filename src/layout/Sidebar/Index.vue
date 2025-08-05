<script setup>
import SidebarLogo from './SidebarLogo.vue'
import SidebarMenuItem from './SidebarMenuItem.vue'
import { useAppStore, usePermissionStore } from '@/store'

defineOptions({ name: 'Sidebar' })

const currentRoute = useRoute()
const { sidebarCollapsed } = storeToRefs(useAppStore())
const { sidebarRoutes } = storeToRefs(usePermissionStore())
const menuList = computed(() => sidebarRoutes.value.children || [])
</script>

<template>
  <div class="sidebar">
    <SidebarLogo />
    <el-menu :default-active="currentRoute.path" unique-opened :collapse="sidebarCollapsed">
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
  display: flex;
  flex-direction: column;
}

.el-menu {
  flex: 1;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #efefef;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}
</style>
