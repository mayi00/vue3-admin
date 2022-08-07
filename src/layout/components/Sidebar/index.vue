<!--
 * @Description  : 
 * @Author       : hzf
 * @Date         : 2022-08-07
 * @LastEditors  : hzf
 * @LastEditTime : 2022-08-07
 * @FilePath     : \vue3-admin\src\layout\components\Sidebar\index.vue
-->
<script setup name="Sidebar">
import SidebarItem from './SidebarItem.vue'
import { routes } from '@/router'
</script>

<template>
  <el-menu :unique-opened="true">
    <transition-group name="Sidebar">
      <template v-for="(item, index) in routes">
        <SidebarItem v-if="!item.hidden" :route="item" :key="item.path || index" :basePath="item.path"/>
      </template>
    </transition-group>
  </el-menu>
</template>

<style lang="less" scoped>

</style>

