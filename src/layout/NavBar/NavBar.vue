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
    <nav class="navbar__left g-no-select">
      <Collapse />
      <Module />
    </nav>
    <div class="navbar__right">
      <Theme />
      <Fullscreen />
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
  flex: 1;
  display: flex;
  align-items: center;
}

.navbar__right {
  flex-shrink: 0;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid var(--gray-5);
}
</style>
