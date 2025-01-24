<script setup>
import { routes } from '@/router'

defineOptions({ name: 'SidebarMenu' })

console.log(routes);

</script>

<template>
  <div class="sidebar-menu">SidebarMenu</div>
</template>

<style lang="less" scoped>
.sidebar-menu {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
}
</style>
