<script setup>
defineOptions({ name: 'DeviceMonitor' })

const props = defineProps({
  sourceData: { type: Object, default: () => ({}) }
})
const emit = defineEmits([])
defineExpose({})

// 生成故障设备监控的模拟数据
const generateFaultData = [
  { time: '202312011030', location: '北京市海淀区中关村科技园科技大厦A座', code: 'E1001' },
  { time: '202312011145', location: '上海市浦东新区张江高科技园区博云路2号', code: 'E1002' },
  { time: '202312011420', location: '广州市天河区珠江新城冼村路28号', code: 'E1003' },
  { time: '202312011650', location: '深圳市南山区科技园南区高新南一道', code: 'E1004' },
  { time: '202312011830', location: '杭州市西湖区文三路90号东部软件园', code: 'E1005' },
  { time: '202312012015', location: '成都市锦江区红星路三段1号', code: 'E1006' },
  { time: '202312012140', location: '武汉市武昌区中南路99号保利广场', code: 'E1007' },
  { time: '202312020825', location: '西安市雁塔区科技路33号高新国际', code: 'E1008' }
]
// 生成异常设备监控的模拟数据
const generateExceptionData = [
  { time: '202312010915', location: '北京市朝阳区建国路88号SOHO现代城', code: 'W2001' },
  { time: '202312011040', location: '上海市静安区南京西路1788号', code: 'W2002' },
  { time: '202312011325', location: '广州市海珠区琶洲大道8号', code: 'W2003' },
  { time: '202312011540', location: '深圳市福田区福华路3号', code: 'W2004' },
  { time: '202312011715', location: '杭州市余杭区文一西路969号', code: 'W2005' },
  { time: '202312011930', location: '重庆市渝北区龙山路70号', code: 'W2006' },
  { time: '202312012210', location: '天津市和平区南京路129号', code: 'W2007' },
  { time: '202312020745', location: '苏州市工业园区苏州大道东265号', code: 'W2008' }
]

const collection = computed(() => ({
  fault: [...generateFaultData, ...generateFaultData],
  exception: [...generateExceptionData]
}))

// 当前激活的标签
const activeTab = ref('fault')
// 自动切换定时器
const autoSwitchTimer = ref(null)
// 滚动定时器
const scrollTimer = ref(null)
// 是否暂停自动切换
const switchPaused = ref(false)
// 是否暂停滚动
const scrollPaused = ref(false)
// 表格体元素引用
const tableBodyRef = ref(null)
// 计算当前显示的数据
const currentData = computed(() => {
  return activeTab.value === 'fault' ? collection.value.fault : collection.value.exception
})

// 开始自动切换
const startAutoSwitch = () => {
  if (autoSwitchTimer.value) {
    clearInterval(autoSwitchTimer.value)
  }

  autoSwitchTimer.value = setInterval(() => {
    if (!switchPaused.value) {
      activeTab.value = activeTab.value === 'fault' ? 'exception' : 'fault'
      // 切换标签后重置滚动
      resetScroll()
    }
  }, 1000 * 60)
}

// 开始滚动
const startScroll = () => {
  if (scrollTimer.value) {
    clearInterval(scrollTimer.value)
  }
  scrollTimer.value = setInterval(() => {
    if (!scrollPaused.value) {
      scrollUp()
    }
  }, 1000 * 6)
}

// 向上滚动（平滑效果）
const scrollUp = () => {
  const tableBody = tableBodyRef.value
  if (tableBody) {
    // 计算每条数据的高度
    const rowHeight = 36
    const targetScrollTop = tableBody.scrollTop + rowHeight

    // 平滑滚动
    const duration = 500 // 滚动动画持续时间（毫秒）
    const startTime = performance.now()
    const startScrollTop = tableBody.scrollTop

    const animateScroll = currentTime => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      // 使用缓动函数使滚动更平滑
      const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

      tableBody.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * easeProgress

      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll)
      } else {
        // 滚动结束后检查是否需要重置滚动位置
        if (tableBody.scrollTop >= tableBody.scrollHeight - tableBody.clientHeight) {
          // 平滑滚动到顶部
          const resetDuration = 300
          const resetStartTime = performance.now()
          const resetStartScrollTop = tableBody.scrollTop

          const resetAnimateScroll = currentTime => {
            const resetElapsedTime = currentTime - resetStartTime
            const resetProgress = Math.min(resetElapsedTime / resetDuration, 1)
            const resetEaseProgress =
              resetProgress < 0.5
                ? 4 * resetProgress * resetProgress * resetProgress
                : 1 - Math.pow(-2 * resetProgress + 2, 3) / 2

            tableBody.scrollTop = resetStartScrollTop - resetStartScrollTop * resetEaseProgress

            if (resetElapsedTime < resetDuration) {
              requestAnimationFrame(resetAnimateScroll)
            }
          }

          requestAnimationFrame(resetAnimateScroll)
        }
      }
    }

    requestAnimationFrame(animateScroll)
  }
}

// 重置滚动
const resetScroll = () => {
  const tableBody = tableBodyRef.value
  if (tableBody) {
    tableBody.scrollTop = 0
  }
}

// 切换标签
const handleSwitchTab = tab => {
  activeTab.value = tab
  startAutoSwitch()
  // 切换标签后重置滚动
  resetScroll()
}

// 暂停自动切换和滚动
const pauseAutoSwitch = () => {
  switchPaused.value = true
  scrollPaused.value = true
}
// 恢复自动切换和滚动
const resumeAutoSwitch = () => {
  switchPaused.value = false
  scrollPaused.value = false
}

// 组件挂载时开始自动切换和滚动
onMounted(() => {
  startAutoSwitch()
  startScroll()
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (autoSwitchTimer.value) {
    clearInterval(autoSwitchTimer.value)
  }
  if (scrollTimer.value) {
    clearInterval(scrollTimer.value)
  }
})
</script>

<template>
  <div>
    <div class="monitor-header" @mouseenter="pauseAutoSwitch" @mouseleave="resumeAutoSwitch">
      <div class="header-title" :class="{ active: activeTab === 'fault' }" @click="handleSwitchTab('fault')">
        故障设备监控
      </div>
      <div class="header-title" :class="{ active: activeTab === 'exception' }" @click="handleSwitchTab('exception')">
        异常设备监控
      </div>
    </div>

    <div class="monitor-table">
      <div class="table-header">
        <div>{{ activeTab === 'fault' ? '故障时间' : '异常时间' }}</div>
        <div>设备地址</div>
        <div>{{ activeTab === 'fault' ? '故障代码' : '异常代码' }}</div>
      </div>
      <div class="table-body g-hidden-scrollbar" ref="tableBodyRef">
        <div
          v-for="(item, index) in currentData"
          :key="index"
          class="table-row"
          @mouseenter="pauseAutoSwitch"
          @mouseleave="resumeAutoSwitch"
        >
          <div>{{ item.time }}</div>
          <div class="g-single-ellipsis">{{ item.location }}</div>
          <div>{{ item.code }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.monitor-header {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;

  .header-title {
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s;
    color: #00d7e9;

    &.active {
      opacity: 1;
      color: #fff;
    }
  }
}

.monitor-table {
  position: relative;
  z-index: 1;

  .table-header,
  .table-row {
    display: grid;
    grid-template-columns: 100px 1fr 80px;
    gap: 10px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
  }

  .table-header {
    color: #00d7e9;
    border-bottom: 1px solid rgba(0, 215, 233, 0.3);
  }

  .table-body {
    height: 360px;
    overflow-y: auto;
  }

  .table-row {
    color: #fff;
    border-bottom: 1px solid rgba(0, 215, 233, 0.1);
  }
}
</style>
