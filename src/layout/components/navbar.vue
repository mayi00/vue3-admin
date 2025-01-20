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
        <ElIcon :size="20">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </ElIcon>
      </div>
      <!-- 面包屑导航 -->
      <ElBreadcrumb separator="/">
        <ElBreadcrumb-item :to="{ path: '/' }">首页</ElBreadcrumb-item>
        <ElBreadcrumb-item>表格</ElBreadcrumb-item>
        <ElBreadcrumb-item>tableA</ElBreadcrumb-item>
      </ElBreadcrumb>
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
