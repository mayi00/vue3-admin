<script setup>
defineOptions({ name: 'Collapse' })

const isCollapse = ref(false)
// 切换侧边栏显示/隐藏
function handleToggleSideBar() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="collapse" @click.stop="handleToggleSideBar">
    <el-icon :size="20">
      <Expand v-if="isCollapse" />
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
