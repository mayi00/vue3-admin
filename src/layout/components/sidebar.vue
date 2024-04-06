<script setup>
// 因为 HTML 标准已经定义了 menu 标签，需要使用别名来渲染图标
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { routes } from '@/router'

defineOptions({
  name: 'Sidebar'
})

const router = useRouter()

// 选中菜单，跳转路由
function handleMenuSelect(menu) {
  router.push(menu.index)
}
</script>

<template>
  <section class="sidebar">
    <el-menu class="el-menu-vertical-demo" default-active="2" text-color="#fff">
      <template v-for="item in routes">
        <!-- 有二级菜单 -->
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
          <template #title>
            <!-- TODO 菜单icon 需要解决 -->
            <!-- <el-icon></el-icon> -->
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :index="subItem.path" @click="handleMenuSelect">{{
            subItem.meta.title
          }}</el-menu-item>
        </el-sub-menu>
        <!-- 只有一级菜单 -->
        <el-menu-item v-else :index="item.path" @click="handleMenuSelect">
          <!-- <el-icon>
            <icon-menu />
          </el-icon> -->
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </section>
</template>

<style lang="less" scoped>
.sidebar {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #304156;
  background-color: @primaryColor;
}

.el-menu {
  background-color: @primaryColor;
  border-right: none;

  .el-menu-item {
    background-color: @primaryColor;

    &:hover {
      opacity: 0.9;
    }

    &.is-active {
      color: @primaryColor;
      background-color: @bgColor;
      border-right: 1px solid @primaryColor;
    }
  }
}
</style>
