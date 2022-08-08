<!--
 * @Description  : 
 * @Author       : hzf
 * @Date         : 2022-08-07
 * @LastEditors  : hzf
 * @LastEditTime : 2022-08-08
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
    <el-menu :unique-opened="true" background-color="#222b45" text-color="#fff" active-text-color="#fff000">
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
  height: 100%;
  background-color: #222b45;
}
</style>

