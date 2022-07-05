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
</script>

<template>
  <el-container class="layout">
    <el-aside width="200px">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <el-header class="navbar-container">
        <Navbar></Navbar>
      </el-header>

      <el-main class="main">
        <!-- 二级路由 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;

  .navbar-container {
    padding: 0;
    height: 50px;
  }

  .main {
    background-color: #f3f5f7;
  }
}
</style>