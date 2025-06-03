<script setup>
import imgLogo from '@/assets/icons/vue.svg'
import { useAppStore } from '@/store'

defineOptions({ name: 'SidebarLogo' })

const { sidebarIsCollapse } = storeToRefs(useAppStore())

const logo = ref(imgLogo)
</script>

<template>
  <Transition name="el-fade-in-linear" mode="out-in">
    <RouterLink to="/" class="sidebar-logo">
      <img :src="logo" alt="" class="logo" />
      <h2 v-if="!sidebarIsCollapse" class="title">Vue3-admin</h2>
    </RouterLink>
  </Transition>
</template>

<style lang="less" scoped>
.sidebar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: var(--white);
  text-align: center;
  cursor: pointer;

  .logo {
    width: 24px;
    height: 24px;
  }

  .title {
    margin-left: 12px;
    color: var(--black);
    font-size: 18px;
    transition: all 0.3s ease;
  }
}
</style>
