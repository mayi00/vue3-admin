<script setup>
import Collapse from './Collapse.vue'
import ProjectMenu from './ProjectMenu.vue'
import Fullscreen from './Fullscreen.vue'

defineOptions({ name: 'TopBar' })
</script>

<template>
  <div class="top-bar">
    <Collapse />
    <ProjectMenu />
    <Fullscreen />
  </div>
</template>

<style lang="less" scoped>
.top-bar {
  height: 50px;
  display: flex;
  border-bottom: 1px solid #eaeaea;
}
</style>
