<!--
 * @Description  : 
 * @Author       : hzf
 * @Date         : 2022-08-07
 * @LastEditors  : hzf
 * @LastEditTime : 2022-08-09
 * @FilePath     : \vue3-admin\src\layout\components\Sidebar\index.vue
-->
<script setup name="Sidebar">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { routes } from '@/router'
</script>

<template>
  <div class="sidebar-container">
    <Logo></Logo>
    <el-menu class="sidebar-menu" :unique-opened="false" background-color="transparent" text-color="#fff" active-text-color="#fff000">
      <transition-group name="Sidebar">
        <template v-for="(item, index) in routes">
          <SidebarItem v-if="!item.hidden" :route="item" :key="item.path || index" :basePath="item.path"/>
        </template>
      </transition-group>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidebar-container {
  background-color: #2d3a4b;
  box-shadow: 10px 0 10px -10px rgba(0, 0, 0, 0.12);
}

.sidebar-menu {
  height: calc(100vh - 50px);
  border: none;
  overflow-y: auto;
  overscroll-behavior: contain;
  // firefox隐藏滚动条
  scrollbar-width: none;
  // chrome隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
}
</style>

