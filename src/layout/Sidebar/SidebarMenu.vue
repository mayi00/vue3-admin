<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
import { routes } from '@/router'
import { useAppStore } from '@/store'

defineOptions({ name: 'SidebarMenu' })

const currentRoute = useRoute()

const { isCollapse, activeModule } = storeToRefs(useAppStore())
const menuList = ref([])

// watch(
//   () => activeModule.value,
//   () => {
//     menuList.value = routes.find(item => item.path === activeModule.value)?.children
//   },
//   { immediate: true }
// )

watchEffect(() => {
  menuList.value = routes.find(item => item.path === activeModule.value)?.children
})
</script>

<template>
  <div class="sidebar-menu">
    <el-menu class="menu" :default-active="currentRoute.path" unique-opened :collapse="isCollapse">
      <template v-for="item in menuList" :key="item.path">
        <SidebarMenuItem v-if="!item.meta.hidden" :item="item" :basePath="activeModule" />
      </template>
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
