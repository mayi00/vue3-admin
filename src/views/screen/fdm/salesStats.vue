<script setup>
import * as echarts from 'echarts'

defineOptions({ name: 'SalesStats' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 图表实例
let salesTrendChart = null

// 当前激活的标签
const activeTab = ref('week')

// 初始化销售趋势图表
const initSalesTrendChart = () => {
  const dom = document.getElementById('salesTrendChart')
  if (!dom) return

  salesTrendChart = echarts.init(dom)
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      data: ['积销售额', '实际销售额'],
      textStyle: {
        color: '#00d7e9'
      },
      top: '5%'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '3月', '5月', '7月', '9月', '11月'],
      axisLine: {
        lineStyle: {
          color: '#0c3a5e'
        }
      },
      axisLabel: {
        color: '#00d7e9'
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
        name: '积销售额',
        type: 'line',
        smooth: true,
        data: [70, 80, 65, 75, 60, 50],
        itemStyle: {
          color: '#00d7e9'
        },
        lineStyle: {
          width: 3
        }
      },
      {
        name: '实际销售额',
        type: 'line',
        smooth: true,
        data: [85, 90, 75, 80, 70, 40],
        itemStyle: {
          color: '#e4393c'
        },
        lineStyle: {
          width: 3
        }
      }
    ]
  }
  salesTrendChart.setOption(option)
}

// 窗口resize事件处理
const handleResize = () => {
  salesTrendChart?.resize()
}

onMounted(() => {
  nextTick(() => {
    initSalesTrendChart()
    window.addEventListener('resize', handleResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  salesTrendChart?.dispose()
})
</script>

<template>
  <div class="sales-panel">
    <div class="panel-title">
      销售额统计
      <div class="tab-group">
        <span class="tab" :class="{ active: activeTab === 'year' }" @click="activeTab = 'year'">年</span>
        <span class="tab" :class="{ active: activeTab === 'season' }" @click="activeTab = 'season'">季</span>
        <span class="tab" :class="{ active: activeTab === 'month' }" @click="activeTab = 'month'">月</span>
        <span class="tab" :class="{ active: activeTab === 'week' }" @click="activeTab = 'week'">周</span>
      </div>
    </div>
    <div class="chart-content">
      <div id="salesTrendChart" style="width: 100%; height: 200px"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sales-panel {
  .panel-title {
    font-size: 16px;
    color: #00d7e9;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tab-group {
    display: flex;
    gap: 10px;

    .tab {
      padding: 2px 8px;
      font-size: 12px;
      color: #00d7e9;
      border: 1px solid rgba(0, 215, 233, 0.3);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.3s;

      &.active {
        background: rgba(0, 215, 233, 0.3);
        color: #fff;
      }

      &:hover {
        border-color: #00d7e9;
      }
    }
  }

  .chart-content {
    position: relative;
    z-index: 1;
  }
}
</style>