<script setup>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import FdmHeader from './fdmHeader.vue'
import FdmPanel from './fdmPanel.vue'

defineOptions({ name: 'FdmScreen' })

// 图表实例
let salesTrendChart = null
let channelDistChart = null
let userStatsChart = null
let rankChart = null

// 数据统计
const statsData = ref({
  deviceTotal: 2190,
  seasonNew: 190,
  operatingDevice: 3001,
  exceptionDevice: 108,
  orderCount: 987,
  salesAmount: 834
})

// 时间统计
const timeStats = ref({
  day365: '365天',
  day90: '90天',
  day30: '30天',
  hours24: '24小时'
})

// 设备监控数据
const deviceMonitorData = ref([
  { time: '20190701', location: '北京市昌平区科技园财信商务楼...', code: '100009' },
  { time: '20190710', location: '北京市昌平区科技园财信商务楼...', code: '100010' },
  { time: '20180701', location: '11北京市昌平四商务会展业等学校', code: '100001' },
  { time: '20190601', location: '北京市昌平区回龙园会展业等学校', code: '100002' },
  { time: '20190704', location: '北京市昌平区科技园财信商务楼...', code: '100003' },
  { time: '20180701', location: '北京市昌平区回龙会展业等学校', code: '100004' },
  { time: '20190701', location: '北京市昌平区科技园财信商务楼...', code: '100006' },
  { time: '20190701', location: '北京市昌平区回龙园会展业等学校', code: '100007' }
])

// 渠道分布数据
const channelData = ref([
  { name: '机场', value: 39, percent: '39%' },
  { name: '商场', value: 28, percent: '28%' },
  { name: '地铁', value: 20, percent: '20%' },
  { name: '火车站', value: 13, percent: '13%' }
])

// 一季度销售进度
const salesProgress = ref({
  current: 1321,
  increase: '150%',
  percent: 75
})

// 全国热榜数据
const nationalRankData = ref([
  { rank: 1, name: '可爱多', city: '北京', value: 25179, person: '小野人', personValue: 6724 },
  { rank: 2, name: '娃哈哈', city: '河北', value: 23252, person: '好多鱼', personValue: 2170 },
  { rank: 3, name: '喜之郎', city: '上海', value: 20760, person: '李司机', personValue: 6080 },
  { rank: 3, name: '蒙牛', city: '河南', value: 23202, person: '蜡笔哥', personValue: 8341 },
  { rank: 3, name: '雪之恋', city: '山东', value: 20760, person: '管之家', personValue: 7407 }
])

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
  salesTrendChart?.resize()
  channelDistChart?.resize()
  userStatsChart?.resize()
  rankChart?.resize()
  handleScreenAuto()
}

// 数据大屏自适应函数
const handleScreenAuto = () => {
  const designDraftWidth = 1920
  const designDraftHeight = 1080
  const isW =
    document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight
  // 根据屏幕的变化适配的比例
  const scale = isW
    ? document.documentElement.clientWidth / designDraftWidth
    : document.documentElement.clientHeight / designDraftHeight

  document.querySelector('.fdm-screen-wrapper').style.transform = `scale(${scale}) translate(-50%, -50%)`
}

onMounted(() => {
  document.querySelector('#app').style.minWidth = 'auto'
  nextTick(() => {
    initSalesTrendChart()
    initChannelDistChart()
    initUserStatsChart()
    initRankChart()
    window.addEventListener('resize', handleResize)
    handleScreenAuto()
  })
})

onBeforeUnmount(() => {
  document.querySelector('#app').style.minWidth = '1000px'
  window.removeEventListener('resize', handleResize)
  salesTrendChart?.dispose()
  channelDistChart?.dispose()
  userStatsChart?.dispose()
  rankChart?.dispose()
})
</script>

<template>
  <div class="screen-container">
    <div class="screen-wrapper fdm-screen-wrapper">
      <FdmHeader />

      <div class="screen-body">
        <div class="w-[30%] flex flex-col gap-[20px]">
          <FdmPanel>数据统计</FdmPanel>
          <FdmPanel>设备监控</FdmPanel>
          <FdmPanel>点位分布</FdmPanel>
        </div>
        <div class="w-[40%] pt-[60px] flex flex-col gap-[20px]">
          <div class="w-full h-[40%]">地图</div>
          <FdmPanel class="flex-1">全国用户总量</FdmPanel>
        </div>
        <div class="w-[30%] flex flex-col gap-[20px]">
          <FdmPanel>时间统计</FdmPanel>
          <FdmPanel>销售额统计</FdmPanel>
          <div class="flex gap-[20px]">
            <FdmPanel class="flex-1">渠道分布</FdmPanel>
            <FdmPanel class="flex-1">季度销售进度</FdmPanel>
          </div>
          <FdmPanel>热榜</FdmPanel>
        </div>
        <!-- 左侧区域 -->
        <!-- <div class="screen-left"> -->

        <!-- 数据统计卡片 -->
        <!-- <div class="panel stats-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ statsData.deviceTotal.toLocaleString() }}</div>
                <div class="stat-label">
                  <span class="dot" style="background: #0090ff"></span>
                  设备总数
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ statsData.seasonNew }}</div>
                <div class="stat-label">
                  <span class="dot" style="background: #00e4a0"></span>
                  季度新增
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ statsData.operatingDevice.toLocaleString() }}</div>
                <div class="stat-label">
                  <span class="dot" style="background: #00d7e9"></span>
                  运营设备
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ statsData.exceptionDevice }}</div>
                <div class="stat-label">
                  <span class="dot" style="background: #e4393c"></span>
                  异常设备
                </div>
              </div>
            </div>
          </div> -->

        <!-- 设备监控 -->
        <!-- <div class="panel monitor-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
            <div class="panel-header">
              <div class="panel-title active">故障设备监控</div>
              <div class="panel-title">异常设备监控</div>
            </div>
            <div class="monitor-table">
              <div class="table-header">
                <div class="col-1">故障时间</div>
                <div class="col-2">设备地址</div>
                <div class="col-3">异常代码</div>
              </div>
              <div class="table-body">
                <div v-for="(item, index) in deviceMonitorData" :key="index" class="table-row">
                  <div class="col-1">{{ item.time }}</div>
                  <div class="col-2">{{ item.location }}</div>
                  <div class="col-3">{{ item.code }}</div>
                </div>
              </div>
            </div>
          </div> -->

        <!-- 点位分布统计 -->
        <!-- <div class="panel chart-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
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
          </div> -->
        <!-- </div> -->

        <!-- 中间区域 -->
        <!-- <div class="screen-center"> -->
        <!-- 地图区域 -->
        <!-- <div class="map-container">
            <div class="map-title">设备数据统计</div>
            <div class="china-map">
              <div class="map-placeholder">
                <div class="map-point" style="top: 20%; left: 30%">
                  <div class="point-ripple"></div>
                  <div class="point-dot"></div>
                  <div class="point-label">哈尔滨</div>
                </div>
                <div class="map-point" style="top: 35%; left: 45%">
                  <div class="point-ripple"></div>
                  <div class="point-dot large"></div>
                  <div class="point-label">北京</div>
                </div>
                <div class="map-point" style="top: 40%; left: 25%">
                  <div class="point-ripple"></div>
                  <div class="point-dot"></div>
                  <div class="point-label">新疆乌鲁木齐基地</div>
                </div>
                <div class="map-point" style="top: 55%; left: 40%">
                  <div class="point-ripple"></div>
                  <div class="point-dot"></div>
                  <div class="point-label">兰州</div>
                </div>
                <div class="map-point" style="top: 50%; left: 78%">
                  <div class="point-ripple"></div>
                  <div class="point-dot large orange"></div>
                  <div class="point-label">上海</div>
                </div>
                <div class="map-point" style="top: 65%; left: 50%">
                  <div class="point-ripple"></div>
                  <div class="point-dot medium"></div>
                  <div class="point-label">深圳</div>
                </div>
                <div class="map-point" style="top: 70%; left: 45%">
                  <div class="point-ripple"></div>
                  <div class="point-dot medium orange"></div>
                  <div class="point-label">福州</div>
                </div>
              </div>
            </div>
          </div> -->

        <!-- 全国用户总量统计 -->
        <!-- <div class="panel user-stats-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
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
          </div> -->
        <!-- </div> -->

        <!-- 右侧区域 -->
        <!-- <div class="screen-right"> -->
        <!-- 时间统计 -->
        <!-- <div class="panel time-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
            <div class="time-stats">
              <div class="time-item">
                <div class="time-value" style="color: #00d7e9">365天</div>
              </div>
              <div class="time-item">
                <div class="time-value" style="color: #0090ff">90天</div>
              </div>
              <div class="time-item">
                <div class="time-value" style="color: #00e4a0">30天</div>
              </div>
              <div class="time-item">
                <div class="time-value">24小时</div>
              </div>
            </div>
            <div class="order-stats">
              <div class="order-item">
                <div class="order-value">{{ statsData.orderCount }}</div>
                <div class="order-label">
                  <span class="dot" style="background: #e4393c"></span>
                  订单量
                </div>
              </div>
              <div class="order-item">
                <div class="order-value">{{ statsData.salesAmount }}</div>
                <div class="order-label">
                  <span class="dot" style="background: #ffd700"></span>
                  销售额(万元)
                </div>
              </div>
            </div>
          </div> -->

        <!-- 销售额统计 -->
        <!-- <div class="panel sales-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
            <div class="panel-title">
              销售额统计
              <div class="tab-group">
                <span class="tab">年</span>
                <span class="tab">季</span>
                <span class="tab">月</span>
                <span class="tab active">周</span>
              </div>
            </div>
            <div class="chart-content">
              <div id="salesTrendChart" style="width: 100%; height: 200px"></div>
            </div>
          </div> -->

        <!-- 渠道分布 -->
        <!-- <div class="panel channel-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
            <div class="panel-title">渠道分布</div>
            <div class="channel-content">
              <div class="channel-list">
                <div v-for="(item, index) in channelData" :key="index" class="channel-item">
                  <div class="channel-percent">{{ item.value }}</div>
                  <div class="channel-unit">%</div>
                  <div class="channel-name">
                    <span class="channel-icon">📦</span>
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        <!-- 一季度销售进度 -->
        <!-- <div class="panel progress-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
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
          </div> -->

        <!-- 全国热榜 -->
        <!-- <div class="panel rank-panel">
            <div class="panel-border">
              <img src="../../../assets/images/screen/fdm/border.png" alt="" class="border-img" />
            </div>
            <div class="panel-title">
              全国热榜
              <div class="tab-group">
                <span class="tab active">各省热销</span>
              </div>
              <span class="time-label">// 近30日 //</span>
            </div>
            <div class="rank-content">
              <div v-for="(item, index) in nationalRankData" :key="index" class="rank-item">
                <div class="rank-number">
                  <span v-if="item.rank === 1" class="medal gold">🥇</span>
                  <span v-else-if="item.rank === 2" class="medal silver">🥈</span>
                  <span v-else class="medal bronze">🥉</span>
                </div>
                <div class="rank-info">
                  <div class="rank-row">
                    <span class="rank-name">{{ item.name }}</span>
                    <span class="rank-city">{{ item.city }}</span>
                    <span class="rank-value">{{ item.value.toLocaleString() }}</span>
                    <span class="rank-arrow">▲</span>
                  </div>
                  <div class="rank-row sub">
                    <span class="rank-person">{{ item.person }}</span>
                    <span class="rank-person-value">{{ item.personValue.toLocaleString() }}</span>
                    <span class="rank-arrow">▲</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.screen-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0a1e3c 0%, #030d1f 100%);
}

.screen-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: 0 0;
  border: 1px solid #000;
  color: #fff;
}

// 主体布局
.screen-body {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 88px 20px 20px;
  width: 100%;
  height: 100%;
  gap: 20px;
}

.screen-left,
.screen-right {
  flex: 0 0 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.screen-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 面板通用样式
// .panel {
//   position: relative;
//   background: rgba(6, 30, 93, 0.5);
//   border: 1px solid rgba(0, 215, 233, 0.3);
//   border-radius: 4px;
//   padding: 15px;
//   backdrop-filter: blur(10px);

//   .panel-border {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     pointer-events: none;
//     overflow: hidden;
//     border-radius: 4px;

//     .border-img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//       opacity: 0.3;
//     }
//   }

//   .panel-title {
//     font-size: 16px;
//     color: #00d7e9;
//     margin-bottom: 15px;
//     position: relative;
//     z-index: 1;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;

//     &.active {
//       color: #fff;
//     }
//   }

//   .tab-group {
//     display: flex;
//     gap: 10px;

//     .tab {
//       padding: 2px 8px;
//       font-size: 12px;
//       color: #00d7e9;
//       border: 1px solid rgba(0, 215, 233, 0.3);
//       border-radius: 2px;
//       cursor: pointer;
//       transition: all 0.3s;

//       &.active {
//         background: rgba(0, 215, 233, 0.3);
//         color: #fff;
//       }

//       &:hover {
//         border-color: #00d7e9;
//       }
//     }
//   }
// }

// 数据统计卡片
.stats-panel {
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    position: relative;
    z-index: 1;
  }

  .stat-item {
    text-align: center;

    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 12px;
      color: #00d7e9;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
      }
    }
  }
}

// 设备监控
.monitor-panel {
  flex: 1;

  .panel-header {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;

    .panel-title {
      margin-bottom: 0;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.3s;

      &.active {
        opacity: 1;
      }
    }
  }

  .monitor-table {
    position: relative;
    z-index: 1;

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 80px 1fr 80px;
      gap: 10px;
      font-size: 12px;
      padding: 8px 0;
    }

    .table-header {
      color: #00d7e9;
      border-bottom: 1px solid rgba(0, 215, 233, 0.3);
    }

    .table-body {
      max-height: 280px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 215, 233, 0.3);
        border-radius: 2px;
      }
    }

    .table-row {
      color: #fff;
      border-bottom: 1px solid rgba(0, 215, 233, 0.1);

      .col-2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

// 图表面板
.chart-panel {
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

// 地图容器
.map-container {
  flex: 1;
  position: relative;
  background: rgba(6, 30, 93, 0.3);
  border: 1px solid rgba(0, 215, 233, 0.3);
  border-radius: 4px;
  padding: 20px;

  .map-title {
    position: absolute;
    top: 20px;
    left: 50px;
    font-size: 16px;
    color: #00d7e9;
    z-index: 2;

    &::before {
      content: '⊙';
      margin-right: 8px;
      color: #00d7e9;
    }
  }

  .china-map {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .map-placeholder {
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800"><path d="M500,100 L700,200 L800,400 L700,600 L500,700 L300,600 L200,400 L300,200 Z" fill="rgba(0,215,233,0.05)" stroke="rgba(0,215,233,0.2)" stroke-width="2"/></svg>')
      center/contain no-repeat;
    position: relative;
  }

  .map-point {
    position: absolute;
    transform: translate(-50%, -50%);

    .point-ripple {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0, 215, 233, 0.3);
      animation: ripple 2s infinite;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .point-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #00d7e9;
      box-shadow: 0 0 10px #00d7e9;
      position: relative;
      z-index: 1;
      margin: 0 auto;

      &.large {
        width: 20px;
        height: 20px;
      }

      &.medium {
        width: 16px;
        height: 16px;
      }

      &.orange {
        background: #ffa500;
        box-shadow: 0 0 10px #ffa500;
      }
    }

    .point-label {
      margin-top: 5px;
      font-size: 12px;
      color: #00d7e9;
      white-space: nowrap;
      text-align: center;
    }
  }
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

// 用户统计面板
.user-stats-panel {
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

// 时间面板
.time-panel {
  .time-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;

    .time-item {
      text-align: center;

      .time-value {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

  .order-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    position: relative;
    z-index: 1;

    .order-item {
      text-align: center;

      .order-value {
        font-size: 32px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 8px;
      }

      .order-label {
        font-size: 12px;
        color: #00d7e9;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
      }
    }
  }
}

// 销售面板
.sales-panel {
  flex: 1;

  .chart-content {
    position: relative;
    z-index: 1;
  }
}

// 渠道面板
.channel-panel {
  .channel-content {
    position: relative;
    z-index: 1;
  }

  .channel-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .channel-item {
    text-align: center;

    .channel-percent {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      display: inline-block;
    }

    .channel-unit {
      font-size: 18px;
      color: #00d7e9;
      display: inline-block;
      margin-left: 5px;
    }

    .channel-name {
      font-size: 12px;
      color: #00d7e9;
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      .channel-icon {
        font-size: 14px;
      }
    }
  }
}

// 进度面板
.progress-panel {
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

// 排行榜面板
.rank-panel {
  flex: 1;

  .time-label {
    font-size: 12px;
    color: #00d7e9;
    margin-left: auto;
  }

  .rank-content {
    position: relative;
    z-index: 1;
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 215, 233, 0.3);
      border-radius: 2px;
    }
  }

  .rank-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 215, 233, 0.1);

    .rank-number {
      width: 30px;
      text-align: center;

      .medal {
        font-size: 20px;
      }
    }

    .rank-info {
      flex: 1;
    }

    .rank-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      margin-bottom: 5px;

      &.sub {
        margin-bottom: 0;
        font-size: 11px;
        color: #00d7e9;
      }

      .rank-name {
        color: #00d7e9;
        font-weight: bold;
      }

      .rank-city {
        color: #fff;
      }

      .rank-value {
        color: #fff;
        margin-left: auto;
      }

      .rank-arrow {
        color: #e4393c;
      }

      .rank-person {
        color: #00d7e9;
      }

      .rank-person-value {
        color: #fff;
        margin-left: auto;
      }
    }
  }
}
</style>
