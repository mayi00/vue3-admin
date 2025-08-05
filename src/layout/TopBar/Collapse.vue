<script setup>
import { useAppStore } from '@/store'

defineOptions({ name: 'Collapse' })

const { sidebarCollapsed } = storeToRefs(useAppStore())
// 切换侧边栏显示/隐藏
function toggleCollapsed() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="collapse" @click.stop="toggleCollapsed">
    <el-icon :size="20">
      <Expand v-if="sidebarCollapsed" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.collapse {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  aspect-ratio: 1 / 1;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
