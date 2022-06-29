<template>
  <section class="sidebar">
    <el-menu active-text-color="#ffd04b" background-color="#304156" class="el-menu-vertical-demo" default-active="2"
      text-color="#fff" router>
      <template v-for="item in routes">
        <!-- 有二级菜单 -->
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
          <template #title>
            <!-- <el-icon></el-icon> -->
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :index="subItem.path">{{ subItem.meta.title }}</el-menu-item>
        </el-sub-menu>
        <!-- 只有一级菜单 -->
        <el-menu-item v-else :index="item.path" @click="handleRoute">
          <!-- <el-icon>
            <icon-menu />
          </el-icon> -->
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </section>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<script setup>
// 因为 HTML 标准已经定义了 menu 标签，需要使用别名来渲染图标
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/route'

const router = useRouter()
</script>

<style lang="less" scoped>
.sidebar {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #304156;
}
</style>
