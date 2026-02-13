<script setup>
import api from '@/api'

defineOptions({ name: 'DataOverview' })

const props = defineProps({
  sourceData: { type: Object, default: () => ({}) }
})

const collection = ref({
  deviceTotal: 2190,
  seasonNew: 190,
  operatingDevice: 3001,
  exceptionDevice: 108
})

const getOverviewData = () => {
  api.screen.fdm.getGroupInfo().then(res => {
    collection.value = res.data
  })
}
getOverviewData()
</script>

<template>
  <div class="overview-wrapper">
    <div class="overview-item">
      <div class="overview-value">{{ collection.deviceTotal }}</div>
      <div class="overview-label">
        <span class="dot" style="background: #0090ff"></span>
        设备总数
      </div>
    </div>
    <div class="overview-item">
      <div class="overview-value">{{ collection.seasonNew }}</div>
      <div class="overview-label">
        <span class="dot" style="background: #00e4a0"></span>
        季度新增
      </div>
    </div>
    <div class="overview-item">
      <div class="overview-value">{{ collection.operatingDevice }}</div>
      <div class="overview-label">
        <span class="dot" style="background: #00d7e9"></span>
        运营设备
      </div>
    </div>
    <div class="overview-item">
      <div class="overview-value">{{ collection.exceptionDevice }}</div>
      <div class="overview-label">
        <span class="dot" style="background: #e4393c"></span>
        异常设备
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.overview-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.overview-item {
  text-align: center;

  .overview-value {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 8px;
  }

  .overview-label {
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
