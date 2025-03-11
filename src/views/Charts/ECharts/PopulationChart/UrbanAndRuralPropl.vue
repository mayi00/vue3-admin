<script setup>
import { demographic } from './populationData'
import * as echarts from 'echarts'
import { debounce } from 'lodash'

defineOptions({ name: 'UrbanAndRuralPropl' })
const areaChartRef = ref()
let myChart = null
const xData = ref([])
const yData = ref({
  urbanPropl: [],
  ruralPropl: [],
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
    urbanPropl: [],
    ruralPropl: [],
  }
  demographic.forEach(item => {
    yData.value.urbanPropl.push(item.urbanAndRural.urbanPropl)
    yData.value.ruralPropl.push(item.urbanAndRural.ruralPropl)
  })
}

function initChart() {
  myChart = echarts.init(areaChartRef.value)
  myChart.setOption({
    color: ['#37A2FF', '#FF0087'],
    title: {
      text: '城乡人口比例',
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
      data: ['城镇', '农村'],
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
        name: '城镇',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)',
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: yData.value.urbanPropl,
      },
      {
        name: '农村',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)',
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: yData.value.ruralPropl,
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
