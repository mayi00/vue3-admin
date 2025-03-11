<script setup>
import { demographic } from './populationData'
import * as echarts from 'echarts'
import { debounce } from 'lodash'

defineOptions({ name: 'Gender' })
const areaChartRef = ref()
let myChart = null
const xData = ref([])
const yData = ref({
  male: [],
  female: [],
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
    male: [],
    female: [],
  }
  demographic.forEach(item => {
    yData.value.male.push(item.gender.male)
    yData.value.female.push(item.gender.female)
  })
}

function initChart() {
  myChart = echarts.init(areaChartRef.value)
  myChart.setOption({
    color: ['#80FFA5', '#00DDFF'],
    title: {
      text: '男女人口',
      subtext: '数据来源：国家统计局',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: value => `${(value / 10000).toFixed(2)}亿`,
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
      name: '万',
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
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: yData.value.male,
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
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: yData.value.female,
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
