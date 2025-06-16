<script setup>
import { nationalFlags } from './nationalData'
defineOptions({ name: 'NationalFlag' })
</script>

<template>
  <div class="g-container">
    <el-card>
      <h3 class="page-title">国家国旗</h3>
      <ul class="flags-wrapper">
        <li v-for="item in nationalFlags" :key="item.code" class="flag-item">
          <em class="fi" :class="`fi-${item.code}`"></em>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.page-title {
  line-height: 48px;
}

.flags-wrapper {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

  .flag-item {
    height: 80px;
    padding: 8px;
    background-color: #efefef;
    border-radius: 8px;

    .fi {
      margin: 4px;
    }
  }
}
</style>
