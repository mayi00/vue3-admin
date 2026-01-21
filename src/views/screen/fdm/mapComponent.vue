<script setup>
defineOptions({ name: 'MapComponent' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})
</script>

<template>
  <div class="map-container">
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
  </div>
</template>

<style lang="less" scoped>
.map-container {
  position: relative;
  background: rgba(6, 30, 93, 0.3);
  border: 1px solid rgba(0, 215, 233, 0.3);
  border-radius: 4px;
  padding: 20px;
  height: 100%;

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
</style>