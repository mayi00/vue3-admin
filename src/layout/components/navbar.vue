<script setup>
defineOptions({
  name: 'Navbar'
})

const isCollapse = ref(false)
// 切换侧边栏显示/隐藏
function handleToggleSideBar() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <nav class="navbar">
    <div class="left-box">
      <!-- 切换侧边栏显示/隐藏图标 -->
      <div class="sidebar-collapse" @click.stop="handleToggleSideBar">
        <el-icon :size="20">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>表格</el-breadcrumb-item>
        <el-breadcrumb-item>tableA</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-box">右</div>
  </nav>
</template>

<style lang="less" scoped>
.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 100%;
  line-height: 50px;
}

.left-box {
  display: flex;
  align-items: center;

  .sidebar-collapse {
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
