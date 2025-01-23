<script setup>
defineOptions({ name: 'Fullscreen' })

import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="fullscreen" @click.stop="toggle">
    <el-icon :size="20">
      <FullScreen v-if="isFullscreen" />
      <FullScreen v-else />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.fullscreen {
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
