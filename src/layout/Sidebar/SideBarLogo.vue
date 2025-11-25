<script setup>
import { useAppStore } from '@/store'
import imgLogo from '@/assets/svg/vue.svg'

defineOptions({ name: 'SidebarLogo' })

const { sidebarCollapsed } = storeToRefs(useAppStore())
const logo = ref(imgLogo)
</script>

<template>
  <transition name="el-fade-in-linear" mode="out-in">
    <router-link to="/" class="sidebar-logo">
      <img :src="logo" alt="Logo" class="logo" />
      <h1 v-if="!sidebarCollapsed" class="title">Vue</h1>
    </router-link>
  </transition>
</template>

<style lang="less" scoped>
.sidebar-logo {
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #efefef;
}

.logo {
  width: 24px;
  height: 24px;
}

.title {
  margin-left: 8px;
  color: #000;
  font-size: 18px;
  transition: all 0.3s ease;
}
</style>
