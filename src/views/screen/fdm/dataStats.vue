<script setup>
defineOptions({ name: 'DataStats' })

const props = defineProps({})
const emit = defineEmits([])
// 暴露方法给父组件
defineExpose({})

const statsData = ref({
  deviceTotal: 2190,
  seasonNew: 190,
  operatingDevice: 3001,
  exceptionDevice: 108
})
</script>

<template>
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-value">{{ statsData.deviceTotal.toLocaleString() }}</div>
      <div class="stat-label">
        <span class="dot" style="background: #0090ff"></span>
        设备总数
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ statsData.seasonNew }}</div>
      <div class="stat-label">
        <span class="dot" style="background: #00e4a0"></span>
        季度新增
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ statsData.operatingDevice.toLocaleString() }}</div>
      <div class="stat-label">
        <span class="dot" style="background: #00d7e9"></span>
        运营设备
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ statsData.exceptionDevice }}</div>
      <div class="stat-label">
        <span class="dot" style="background: #e4393c"></span>
        异常设备
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;

  .stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 12px;
    color: #00d7e9;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
  }
}
</style>
