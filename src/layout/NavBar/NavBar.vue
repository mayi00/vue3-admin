<script setup>
import UserAvatar from './UserAvatar.vue'

defineOptions({ name: 'NavBar' })
</script>

<template>
  <div class="navbar">
    <nav class="navbar__left">NavBar</nav>
    <UserAvatar />
  </div>
</template>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  background-color: var(--white);
}

.navbar__left {
  flex: 1;
  padding: 0 16px;
  display: flex;
  align-items: center;
}
</style>
