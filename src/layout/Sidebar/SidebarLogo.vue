<script setup>
import imgLogo from '@/assets/icons/vue.svg'
import { useAppStore } from '@/store'

defineOptions({ name: 'SidebarLogo' })

const { collapsed } = storeToRefs(useAppStore())

const logo = ref(imgLogo)
</script>

<template>
  <RouterLink to="/" class="sidebar-logo">
    <img :src="logo" alt="" class="logo" />
    <h2 v-if="!collapsed" class="title">Vue3-admin</h2>
  </RouterLink>
</template>

<style lang="less" scoped>
.sidebar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  text-align: center;
  cursor: pointer;
  background-color: var(--white);

  .logo {
    width: 30px;
    height: 30px;
  }

  .title {
    margin-left: 12px;
    font-size: 18px;
    color: var(--black);
  }
}
</style>
