<script setup>
import * as echarts from 'echarts'

defineOptions({ name: 'PointDistribution' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 图表实例
let rankChart = null

// 初始化点位分布饼图
const initRankChart = () => {
  const dom = document.getElementById('rankChart')
  if (!dom) return

  rankChart = echarts.init(dom)
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['0%', '70%'],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          color: '#00d7e9',
          fontSize: 12
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#00d7e9'
          }
        },
        data: [
          { value: 400, name: '湖北', itemStyle: { color: '#00d7e9' } },
          { value: 380, name: '北京', itemStyle: { color: '#0090ff' } },
          { value: 280, name: '山东', itemStyle: { color: '#00e4a0' } },
          { value: 200, name: '河北', itemStyle: { color: '#7b68ee' } },
          { value: 180, name: '四川', itemStyle: { color: '#ffa500' } },
          { value: 150, name: '浙江', itemStyle: { color: '#ff6b9d' } },
          { value: 100, name: '江苏', itemStyle: { color: '#c9dd22' } }
        ]
      }
    ]
  }
  rankChart.setOption(option)
}

// 窗口resize事件处理
const handleResize = () => {
  rankChart?.resize()
}

onMounted(() => {
  nextTick(() => {
    initRankChart()
    window.addEventListener('resize', handleResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  rankChart?.dispose()
})
</script>

<template>
  <div class="chart-panel">
    <div class="panel-title">点位分布统计</div>
    <div class="chart-content">
      <div id="rankChart" style="width: 100%; height: 200px"></div>
      <div class="chart-stats">
        <div class="stat-row">
          <span class="stat-number">320,11</span>
          <span class="stat-desc">本月总数</span>
        </div>
        <div class="stat-row">
          <span class="stat-number">418</span>
          <span class="stat-desc" style="color: #ffd700">本月新增</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chart-panel {
  .panel-title {
    font-size: 16px;
    color: #00d7e9;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
  }

  .chart-content {
    position: relative;
    z-index: 1;
  }

  .chart-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    .stat-row {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 5px;
      }

      .stat-desc {
        font-size: 12px;
        color: #00d7e9;
      }
    }
  }
}
</style>