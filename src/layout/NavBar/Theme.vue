<script setup>
defineOptions({ name: 'Theme' })

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value

  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div class="collapse" @click.stop="toggleTheme">
    <el-icon :size="20">
      <Moon v-if="isDark" />
      <Sunny v-else />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.collapse {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--gray-4);
  }
}
</style>
