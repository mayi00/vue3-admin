<script setup>
import { demographic } from './nationalData'
import * as echarts from 'echarts'

defineOptions({ name: 'PopulationChart' })
const populationChartRef = ref()
const xData = ref([])
const yData = ref([])

onMounted(() => {
  initLineChart()
})

function getChartData() {
  xData.value = []
  yData.value = []
  demographic.forEach(item => {
    xData.value.push(item.year)
    yData.value.push(item.total)
  })
}

function initLineChart() {
  getChartData()
  const myChart = echarts.init(populationChartRef.value)
  // 绘制图表
  myChart.setOption({
    title: {
      text: '人口数',
      subtext: '单位：万人',
      left: 'center',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: xData.value,
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '人口',
        type: 'line',
        data: yData.value,
        smooth: true,
      },
    ],
  })

  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
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
