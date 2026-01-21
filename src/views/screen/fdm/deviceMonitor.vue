<script setup>
defineOptions({ name: 'DeviceMonitor' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

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

// 当前激活的标签
const activeTab = ref('fault')
</script>

<template>
  <div class="monitor-panel">
    <div class="panel-header">
      <div class="panel-title" :class="{ active: activeTab === 'fault' }" @click="activeTab = 'fault'">故障设备监控</div>
      <div class="panel-title" :class="{ active: activeTab === 'exception' }" @click="activeTab = 'exception'">异常设备监控</div>
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
  </div>
</template>

<style lang="less" scoped>
.monitor-panel {
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
</style>