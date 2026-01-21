<script setup>
defineOptions({ name: 'ChannelDistribution' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 渠道分布数据
const channelData = ref([
  { name: '机场', value: 39, percent: '39%' },
  { name: '商场', value: 28, percent: '28%' },
  { name: '地铁', value: 20, percent: '20%' },
  { name: '火车站', value: 13, percent: '13%' }
])
</script>

<template>
  <div class="channel-panel">
    <div class="panel-title">渠道分布</div>
    <div class="channel-content">
      <div class="channel-list">
        <div v-for="(item, index) in channelData" :key="index" class="channel-item">
          <div class="channel-percent">{{ item.value }}</div>
          <div class="channel-unit">%</div>
          <div class="channel-name">
            <span class="channel-icon">📦</span>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.channel-panel {
  .panel-title {
    font-size: 16px;
    color: #00d7e9;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
  }

  .channel-content {
    position: relative;
    z-index: 1;
  }

  .channel-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .channel-item {
    text-align: center;

    .channel-percent {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      display: inline-block;
    }

    .channel-unit {
      font-size: 18px;
      color: #00d7e9;
      display: inline-block;
      margin-left: 5px;
    }

    .channel-name {
      font-size: 12px;
      color: #00d7e9;
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      .channel-icon {
        font-size: 14px;
      }
    }
  }
}
</style>