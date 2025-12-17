<template>
  <div class="home">
    <h2>欢迎来到门户首页</h2>
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <span>功能介绍</span>
        </div>
      </template>
      <div class="card-content">
        <p>这是一个基于Vue3 + Element Plus构建的门户模板，包含以下特性：</p>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="card-item-header">
                  <el-icon><Document /></el-icon>
                  <span>响应式设计</span>
                </div>
              </template>
              <p>适配各种屏幕尺寸，提供良好的用户体验</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="card-item-header">
                  <el-icon><Setting /></el-icon>
                  <span>模块化结构</span>
                </div>
              </template>
              <p>清晰的代码结构，便于维护和扩展</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="card-item-header">
                  <el-icon><User /></el-icon>
                  <span>用户友好</span>
                </div>
              </template>
              <p>简洁直观的界面设计，易于操作</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Document, Setting, User } from '@element-plus/icons-vue'
</script>

<style lang="less">
.home {
  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .welcome-card {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-content {
    p {
      line-height: 1.8;
      color: #666;
    }
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
</style>
