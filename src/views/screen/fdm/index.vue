<script setup>
import FdmHeader from './fdmHeader.vue'
import FdmPanel from './fdmPanel.vue'
import DeviceOverview from './deviceOverview.vue'
import DeviceMonitor from './deviceMonitor.vue'
import PointDistribution from './pointDistribution.vue'
import MapComponent from './mapComponent.vue'
import UserStats from './userStats.vue'
import TimeStats from './timeStats.vue'
import SalesStats from './salesStats.vue'
import ChannelDistribution from './channelDistribution.vue'
import SalesProgress from './salesProgress.vue'
import HotRank from './hotRank.vue'

defineOptions({ name: 'FdmScreen' })

// 数据大屏自适应缩放
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
    window.addEventListener('resize', handleScreenAuto)
    handleScreenAuto()
  })
})

onBeforeUnmount(() => {
  document.querySelector('#app').style.minWidth = '1000px'
  window.removeEventListener('resize', handleScreenAuto)
})
</script>

<template>
  <div class="screen-container">
    <div class="screen-wrapper fdm-screen-wrapper">
      <FdmHeader />

      <div class="screen-body">
        <div class="w-[30%] flex flex-col gap-[20px]">
          <FdmPanel class="h-[110px]">
            <DeviceOverview />
          </FdmPanel>
          <FdmPanel class="h-[480px]">
            <DeviceMonitor />
          </FdmPanel>
          <FdmPanel class="h-[340px]">
            <PointDistribution />
          </FdmPanel>
        </div>

        <div class="w-[40%] pt-[60px] flex flex-col gap-[20px]">
          <div class="w-full flex-1">
            <MapComponent />
          </div>
          <FdmPanel class="h-[340px]">
            <UserStats />
          </FdmPanel>
        </div>

        <div class="w-[30%] flex flex-col gap-[20px]">
          <FdmPanel class="h-[148px]">
            <TimeStats />
          </FdmPanel>
          <FdmPanel class="h-[248px]">
            <SalesStats />
          </FdmPanel>
          <div class="flex gap-[20px]">
            <FdmPanel class="flex-1 h-[232px]">
              <ChannelDistribution />
            </FdmPanel>
            <FdmPanel class="flex-1 h-[232px]">
              <SalesProgress />
            </FdmPanel>
          </div>
          <FdmPanel class="h-[284px]">
            <HotRank />
          </FdmPanel>
        </div>
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
</style>
