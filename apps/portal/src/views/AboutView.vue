<template>
  <div class="about">
    <h2>关于我们</h2>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Vue3 Admin Portal</span>
        </div>
      </template>
      <div class="card-content">
        <el-descriptions title="项目信息" border>
          <el-descriptions-item label="技术栈">Vue3 + Element Plus + Vite</el-descriptions-item>
          <el-descriptions-item label="构建工具">pnpm</el-descriptions-item>
          <el-descriptions-item label="项目类型">Monorepo</el-descriptions-item>
          <el-descriptions-item label="状态">开发中</el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <h3>功能特性</h3>
        <el-timeline>
          <el-timeline-item timestamp="2023-01-01" placement="top">
            <el-card shadow="hover">
              <template #header>
                <div class="card-item-header">
                  <el-icon><Calendar /></el-icon>
                  <span>项目初始化</span>
                </div>
              </template>
              <p>创建基于Vue3的项目结构</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2023-02-01" placement="top">
            <el-card shadow="hover">
              <template #header>
                <div class="card-item-header">
                  <el-icon><Calendar /></el-icon>
                  <span>组件开发</span>
                </div>
              </template>
              <p>开发基础UI组件</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2023-03-01" placement="top">
            <el-card shadow="hover">
              <template #header>
                <div class="card-item-header">
                  <el-icon><Calendar /></el-icon>
                  <span>功能完善</span>
                </div>
              </template>
              <p>完善系统功能和交互</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Calendar } from '@element-plus/icons-vue'
</script>

<style lang="less">
.about {
  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-content {
    h3 {
      margin: 20px 0 10px 0;
      color: #333;
    }

    .card-item-header {
      display: flex;
      align-items: center;
      gap: 8px;

      .el-icon {
        color: #1890ff;
      }
    }
  }
}
</style>
