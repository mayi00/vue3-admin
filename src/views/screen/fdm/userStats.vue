<script setup>
import * as echarts from 'echarts'

defineOptions({ name: 'UserStats' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 图表实例
let userStatsChart = null

// 初始化用户统计图表
const initUserStatsChart = () => {
  const dom = document.getElementById('userStatsChart')
  if (!dom) return

  userStatsChart = echarts.init(dom)
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: '10%',
      left: '10%',
      right: '5%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: ['上海', '北京', '合肥', '......', '杭州', '济南', '重庆'],
      axisLine: {
        lineStyle: {
          color: '#0c3a5e'
        }
      },
      axisLabel: {
        color: '#00d7e9',
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#0c3a5e',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#00d7e9'
      }
    },
    series: [
      {
        name: '用户总量',
        type: 'bar',
        data: [2400, 2200, 1800, 1400, 1000, 800, 600],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00d7e9' },
            { offset: 1, color: 'rgba(0, 215, 233, 0.2)' }
          ])
        },
        barWidth: '40%'
      },
      {
        name: '本月新增',
        type: 'bar',
        data: [200, 180, 150, 120, 90, 70, 50],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0c3a5e' },
            { offset: 1, color: 'rgba(12, 58, 94, 0.2)' }
          ])
        },
        barWidth: '40%'
      }
    ]
  }
  userStatsChart.setOption(option)
}

// 窗口resize事件处理
const handleResize = () => {
  userStatsChart?.resize()
}

onMounted(() => {
  nextTick(() => {
    initUserStatsChart()
    window.addEventListener('resize', handleResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  userStatsChart?.dispose()
})
</script>

<template>
  <div class="user-stats-panel">
    <div class="panel-title">全国用户总量统计</div>
    <div class="chart-content">
      <div id="userStatsChart" style="width: 100%; height: 200px"></div>
      <div class="user-stats-info">
        <div class="info-item">
          <span class="info-number">120,899</span>
          <span class="info-desc">用户总量</span>
        </div>
        <div class="info-item">
          <span class="info-number">248</span>
          <span class="info-desc" style="color: #ffd700">本月新增</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-stats-panel {
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

  .user-stats-info {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    .info-item {
      text-align: center;

      .info-number {
        display: block;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 5px;
      }

      .info-desc {
        font-size: 12px;
        color: #00d7e9;
      }
    }
  }
}
</style>