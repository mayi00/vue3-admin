<script setup>
import { routes } from '@/router'
import { useAppStore } from '@/store'

defineOptions({ name: 'Module' })

const { activeModule } = storeToRefs(useAppStore())

// 点击菜单
function handleClickMenuItem(item) {
  activeModule.value = item.path
}
</script>

<template>
  <el-menu mode="horizontal" class="module-menu" :default-active="activeModule">
    <template v-for="item in routes" :key="item.path">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="handleClickMenuItem(item)">
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="less" scoped>
// 覆盖el-menu的默认高度
.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}

.module-menu {
  width: 100%;
  border-bottom: 0;
}
</style>
