<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
import { routes } from '@/router'
import { useAppStore } from '@/store'

defineOptions({ name: 'SidebarMenu' })

const currentRoute = useRoute()

const { collapsed, activeModule } = storeToRefs(useAppStore())
const menuList = ref([])

watch(
  () => activeModule.value,
  () => {
    menuList.value = routes.find(item => item.path === activeModule.value)?.children
  },
  { immediate: true }
)
</script>

<template>
  <div class="sidebar-menu">
    <el-menu class="menu" :default-active="currentRoute.path" unique-opened :collapse="collapsed">
      <SidebarMenuItem v-for="item in menuList" :key="item.path" :item="item" :basePath="activeModule" />
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidebar-menu {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}

.menu {
  border-right: 0;
}
</style>
