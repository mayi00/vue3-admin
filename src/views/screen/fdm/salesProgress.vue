<script setup>
import * as echarts from 'echarts'

defineOptions({ name: 'SalesProgress' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 图表实例
let channelDistChart = null

// 一季度销售进度
const salesProgress = ref({
  current: 1321,
  increase: '150%',
  percent: 75
})

// 初始化渠道分布图表
const initChannelDistChart = () => {
  const dom = document.getElementById('channelDistChart')
  if (!dom) return

  channelDistChart = echarts.init(dom)
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 39, name: '机场', itemStyle: { color: '#00d7e9' } },
          { value: 28, name: '商场', itemStyle: { color: '#0090ff' } },
          { value: 20, name: '地铁', itemStyle: { color: '#00e4a0' } },
          { value: 13, name: '火车站', itemStyle: { color: '#7b68ee' } }
        ]
      }
    ]
  }
  channelDistChart.setOption(option)
}

// 窗口resize事件处理
const handleResize = () => {
  channelDistChart?.resize()
}

onMounted(() => {
  nextTick(() => {
    initChannelDistChart()
    window.addEventListener('resize', handleResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  channelDistChart?.dispose()
})
</script>

<template>
  <div class="progress-panel">
    <div class="panel-title">一季度销售进度</div>
    <div class="progress-content">
      <div class="progress-circle">
        <div id="channelDistChart" style="width: 180px; height: 180px"></div>
        <div class="progress-text">
          <div class="progress-percent">{{ salesProgress.percent }}<span class="percent-symbol">%</span></div>
        </div>
      </div>
      <div class="progress-info">
        <div class="info-row">
          <span class="info-value">{{ salesProgress.current.toLocaleString() }}</span>
          <span class="info-unit">销售额(万)</span>
        </div>
        <div class="info-row">
          <span class="info-value" style="color: #e4393c">{{ salesProgress.increase }}</span>
          <span class="info-unit">同比增长</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.progress-panel {
  .panel-title {
    font-size: 16px;
    color: #00d7e9;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
  }

  .progress-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .progress-circle {
    position: relative;
    width: 180px;
    height: 180px;

    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .progress-percent {
        font-size: 36px;
        font-weight: bold;
        color: #00d7e9;

        .percent-symbol {
          font-size: 20px;
        }
      }
    }
  }

  .progress-info {
    flex: 1;

    .info-row {
      margin-bottom: 15px;

      .info-value {
        display: block;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 5px;
      }

      .info-unit {
        font-size: 12px;
        color: #00d7e9;
      }
    }
  }
}
</style>