<script setup>
import Collapse from './Collapse.vue'
import Module from './Module.vue'
import Fullscreen from './Fullscreen.vue'
import UserAvatar from './UserAvatar.vue'

defineOptions({ name: 'TopBar' })
</script>

<template>
  <div class="top-bar">
    <Collapse />
    <Module />
    <Fullscreen />
    <UserAvatar />
  </div>
</template>

<style lang="less" scoped>
.top-bar {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
}
</style>
