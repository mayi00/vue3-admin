<script setup>
import * as echarts from 'echarts'

defineOptions({ name: 'ECharts' })

const barRef = ref()
const lineRef = ref()

onMounted(() => {
  initBarChart()
  initLineChart()
})

function initBarChart() {
  const myChart = echarts.init(barRef.value)
  // 绘制图表
  myChart.setOption({
    title: {
      text: '柱状图',
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  })

  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

function initLineChart() {
  const myChart = echarts.init(lineRef.value)
  // 绘制图表
  myChart.setOption({
    title: {
      text: '折线图',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '销量',
        type: 'line',
        data: [150, 230, 224, 218, 135, 147, 260],
      },
    ],
  })

  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
</script>

<template>
  <div class="g-main">
    <el-card>
      <div ref="barRef" class="bar-box"></div>
      <div ref="lineRef" class="line-box"></div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.bar-box,
.line-box {
  width: 400px;
  height: 400px;
}
</style>
