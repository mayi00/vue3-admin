<script setup>
import { usePermissionStore } from '@/store'

defineOptions({ name: 'SideBar' })

const { sidebarRoutes } = storeToRefs(usePermissionStore())
</script>

<template>
  <div class="side-bar">
    <el-scrollbar class="side-bar-scrollbar">
      <el-menu></el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped></style>
