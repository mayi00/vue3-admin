<script setup>
import Collapse from './Collapse.vue'
import Module from './Module.vue'
import Theme from './Theme.vue'
import Fullscreen from './Fullscreen.vue'
import UserAvatar from './UserAvatar.vue'

defineOptions({ name: 'NavBar' })
</script>

<template>
  <div class="navbar">
    <nav class="navbar__left g-unselectable">
      <Collapse />
      <Module />
    </nav>
    <div class="navbar__right">
      <Theme />
      <Fullscreen />
      <Language />
      <UserAvatar />
    </div>
  </div>
</template>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: var(--white);
}

.navbar__left {
  display: flex;
  flex: 1;
  align-items: center;
}

.navbar__right {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: center;
  min-width: 100px;
}
</style>
