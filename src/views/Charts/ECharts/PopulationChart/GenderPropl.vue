<script setup>
import { demographic } from './populationData'
import * as echarts from 'echarts'
import { debounce } from 'lodash'

defineOptions({ name: 'GenderPropl' })
const areaChartRef = ref()
let myChart = null
const xData = ref([])
const yData = ref({
  malePropl: [],
  femalePropl: [],
})

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
  yData.value = {
    malePropl: [],
    femalePropl: [],
  }
  demographic.forEach(item => {
    yData.value.malePropl.push(item.gender.malePropl)
    yData.value.femalePropl.push(item.gender.femalePropl)
  })
}

function initChart() {
  myChart = echarts.init(areaChartRef.value)
  myChart.setOption({
    title: {
      text: '男女人口分布比例',
      subtext: '数据来源：国家统计局',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: value => `${value}%`,
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['男', '女'],
      right: '20px',
      orient: 'vertical',
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xData.value,
      },
    ],
    yAxis: {
      name: '%',
      type: 'value',
    },
    series: [
      {
        name: '男',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: 'series',
        },
        data: yData.value.malePropl,
      },
      {
        name: '女',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: 'series',
        },
        data: yData.value.femalePropl,
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
  <div ref="areaChartRef" class="area-chart"></div>
</template>

<style lang="less" scoped>
.area-chart {
  width: 100%;
  height: 500px;
}
</style>
