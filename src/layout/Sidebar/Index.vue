<script setup>
import SidebarLogo from './SidebarLogo.vue'
import SidebarMenu from './SidebarMenu.vue'

defineOptions({ name: 'Sidebar' })
</script>

<template>
  <div class="sidebar-container">
    <SidebarLogo />
    <SidebarMenu />
  </div>
</template>

<style lang="less" scoped>
.sidebar-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
