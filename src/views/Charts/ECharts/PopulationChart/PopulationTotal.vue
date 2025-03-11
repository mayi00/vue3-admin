<script setup>
import { demographic } from './populationData'
import * as echarts from 'echarts'
import { debounce } from 'lodash'

defineOptions({ name: 'PopulationTotal' })
const populationChartRef = ref()
const xData = ref([])
const yData = ref([])
let myChart = null

onMounted(() => {
  getChartData()
  initChart()
})
onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

function getChartData() {
  xData.value = demographic.map(item => item.year)
  yData.value = demographic.map(item => item.total)
}

function initChart() {
  myChart = echarts.init(populationChartRef.value)
  myChart.setOption({
    title: {
      text: '总人口趋势',
      subtext: '数据来源：国家统计局',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: value => `${(value / 10000).toFixed(2)}亿`,
    },
    xAxis: {
      type: 'category',
      data: xData.value,
    },
    yAxis: {
      name: '万',
      type: 'value',
    },
    series: [
      {
        name: '人口',
        type: 'line',
        data: yData.value,
        smooth: true,
      },
    ],
  })

  window.addEventListener('resize', handleResize)
}

const handleResize = debounce(() => {
  if (myChart) {
    myChart.resize()
  }
}, 300)
</script>

<template>
  <div ref="populationChartRef" class="population-chart"></div>
</template>

<style lang="less" scoped>
.population-chart {
  width: 100%;
  height: 500px;
}
</style>
