<!--
 * @Description : layout 布局容器
 * @Author      : huazf
 * @Date        : 2022-06-25
 * @LastEditors : huazf
 * @LastEditTime: 2022-07-05
 * @FilePath    : \vue3-vite-pc\src\layout\index.vue
-->

<script setup name="Layout">
import Sidebar from './components/sidebar.vue'
import Navbar from './components/navbar.vue'
import AppMain from './components/appMain.vue'
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="navbar-container">
        <Navbar></Navbar>
      </el-header>
      <!-- 主体容器 -->
      <el-main>
        <AppMain></AppMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout-container {
  position: relative;
  width: 100%;
  height: 100%;
  .navbar-container {
    padding: 0;
  }
}
</style>