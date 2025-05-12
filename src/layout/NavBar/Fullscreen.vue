<script setup>
import { Icon } from '@iconify/vue'
import { useFullscreen } from '@vueuse/core'

defineOptions({ name: 'Fullscreen' })

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="fullscreen" @click.stop="toggle">
    <Icon v-if="isFullscreen" icon="material-symbols-light:fullscreen-exit" class="iconify-icon" />
    <Icon v-else icon="material-symbols-light:fullscreen" class="iconify-icon" />
  </div>
</template>

<style lang="less" scoped>
.fullscreen {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  color: var(--gray-12);

  &:hover {
    background-color: var(--gray-4);
  }

  .iconify-icon {
    font-size: 20px;
  }
}
</style>
