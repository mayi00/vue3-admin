<script setup>
import { useAppStore } from '@/store'

defineOptions({ name: 'Collapse' })

const { sidebarIsCollapse } = storeToRefs(useAppStore())
// 切换侧边栏显示/隐藏
function toggleCollapsed() {
  sidebarIsCollapse.value = !sidebarIsCollapse.value
}
</script>

<template>
  <div class="collapse" @click.stop="toggleCollapsed">
    <el-icon :size="20">
      <Expand v-if="sidebarIsCollapse" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.collapse {
  display: flex;
  align-items: center;
  margin: 0 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--gray-4);
  }
}
</style>
