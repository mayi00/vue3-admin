<script setup>
defineOptions({ name: 'DeviceMonitor' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 生成故障设备监控的模拟数据
const generateFaultData = () => {
  return [
    { time: '202312011030', location: '北京市海淀区中关村科技园科技大厦A座', code: 'E1001' },
    { time: '202312011145', location: '上海市浦东新区张江高科技园区博云路2号', code: 'E1002' },
    { time: '202312011420', location: '广州市天河区珠江新城冼村路28号', code: 'E1003' },
    { time: '202312011650', location: '深圳市南山区科技园南区高新南一道', code: 'E1004' },
    { time: '202312011830', location: '杭州市西湖区文三路90号东部软件园', code: 'E1005' },
    { time: '202312012015', location: '成都市锦江区红星路三段1号', code: 'E1006' },
    { time: '202312012140', location: '武汉市武昌区中南路99号保利广场', code: 'E1007' },
    { time: '202312020825', location: '西安市雁塔区科技路33号高新国际', code: 'E1008' }
  ]
}

// 生成异常设备监控的模拟数据
const generateExceptionData = () => {
  return [
    { time: '202312010915', location: '北京市朝阳区建国路88号SOHO现代城', code: 'W2001' },
    { time: '202312011040', location: '上海市静安区南京西路1788号', code: 'W2002' },
    { time: '202312011325', location: '广州市海珠区琶洲大道8号', code: 'W2003' },
    { time: '202312011540', location: '深圳市福田区福华路3号', code: 'W2004' },
    { time: '202312011715', location: '杭州市余杭区文一西路969号', code: 'W2005' },
    { time: '202312011930', location: '重庆市渝北区龙山路70号', code: 'W2006' },
    { time: '202312012210', location: '天津市和平区南京路129号', code: 'W2007' },
    { time: '202312020745', location: '苏州市工业园区苏州大道东265号', code: 'W2008' }
  ]
}

// 模拟数据
const faultData = ref([...generateFaultData(), ...generateFaultData()])
const exceptionData = ref([...generateExceptionData(), ...generateExceptionData()])

// 当前激活的标签
const activeTab = ref('fault')

// 自动切换定时器
const autoSwitchTimer = ref(null)

// 是否暂停自动切换
const isPaused = ref(false)

// 计算当前显示的数据
const currentData = computed(() => {
  return activeTab.value === 'fault' ? faultData.value : exceptionData.value
})

// 切换标签
const switchTab = tab => {
  activeTab.value = tab
}

// 开始自动切换
const startAutoSwitch = () => {
  if (autoSwitchTimer.value) {
    clearInterval(autoSwitchTimer.value)
  }

  autoSwitchTimer.value = setInterval(() => {
    if (!isPaused.value) {
      activeTab.value = activeTab.value === 'fault' ? 'exception' : 'fault'
    }
  }, 1000 * 60)
}

// 暂停自动切换
const pauseAutoSwitch = () => {
  isPaused.value = true
}

// 恢复自动切换
const resumeAutoSwitch = () => {
  isPaused.value = false
}

// 组件挂载时开始自动切换
onMounted(() => {
  startAutoSwitch()
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (autoSwitchTimer.value) {
    clearInterval(autoSwitchTimer.value)
  }
})
</script>

<template>
  <div>
    <div class="monitor-header" @mouseenter="pauseAutoSwitch" @mouseleave="resumeAutoSwitch">
      <div class="header-title" :class="{ active: activeTab === 'fault' }" @click="switchTab('fault')">
        故障设备监控
      </div>
      <div class="header-title" :class="{ active: activeTab === 'exception' }" @click="switchTab('exception')">
        异常设备监控
      </div>
    </div>

    <div class="monitor-table">
      <div class="table-header">
        <div class="col-1">{{ activeTab === 'fault' ? '故障时间' : '异常时间' }}</div>
        <div class="col-2">设备地址</div>
        <div class="col-3">{{ activeTab === 'fault' ? '故障代码' : '异常代码' }}</div>
      </div>
      <div class="table-body">
        <div
          v-for="(item, index) in currentData"
          :key="index"
          class="table-row"
          @mouseenter="pauseAutoSwitch"
          @mouseleave="resumeAutoSwitch"
        >
          <div class="col-1">{{ item.time }}</div>
          <div class="col-2 g-single-ellipsis">{{ item.location }}</div>
          <div class="col-3">{{ item.code }}</div>
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
    height: 370px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
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
</style>
