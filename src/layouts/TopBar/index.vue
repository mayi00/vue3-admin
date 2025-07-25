<script setup>
import { usePermissionStore } from '@/store'

defineOptions({ name: 'TopBar' })

const { projectList, activeProject } = storeToRefs(usePermissionStore())

function handleClickMenuItem(item) {
  usePermissionStore().getMenus(item.id)
}
</script>

<template>
  <div class="top-bar">
    <el-menu mode="horizontal" :default-active="activeProject">
      <template v-for="item in projectList" :key="item.id">
        <el-menu-item v-if="item.visible === 1" :index="item.id" @click="handleClickMenuItem(item)">
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.top-bar {
  height: 50px;
}
</style>
