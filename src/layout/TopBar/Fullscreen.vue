<script setup>
import { useFullscreen } from '@vueuse/core'

defineOptions({ name: 'Fullscreen' })

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="fullscreen" @click.stop="toggle">
    <el-icon :size="20"><FullScreen /></el-icon>
  </div>
</template>

<style lang="less" scoped>
.fullscreen {
  flex-shrink: 0;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
