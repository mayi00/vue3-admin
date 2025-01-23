<script setup>
defineOptions({ name: 'Theme' })

const isLight = ref(true)

function handleToggleLight() {
  isLight.value = !isLight.value
}
</script>

<template>
  <div class="collapse" @click.stop="handleToggleLight">
    <el-icon :size="20">
      <Sunny v-if="isLight"/>
      <Moon v-else />
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
