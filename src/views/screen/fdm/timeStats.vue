<script setup>
defineOptions({ name: 'TimeStats' })

const props = defineProps({})
const emit = defineEmits([])
defineExpose({})

// 时间统计
const timeStats = ref({
  day365: '365天',
  day90: '90天',
  day30: '30天',
  hours24: '24小时'
})

// 数据统计
const statsData = ref({
  orderCount: 987,
  salesAmount: 834
})
</script>

<template>
  <div class="time-panel">
    <div class="time-stats">
      <div class="time-item">
        <div class="time-value" style="color: #00d7e9">{{ timeStats.day365 }}</div>
      </div>
      <div class="time-item">
        <div class="time-value" style="color: #0090ff">{{ timeStats.day90 }}</div>
      </div>
      <div class="time-item">
        <div class="time-value" style="color: #00e4a0">{{ timeStats.day30 }}</div>
      </div>
      <div class="time-item">
        <div class="time-value">{{ timeStats.hours24 }}</div>
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
  </div>
</template>

<style lang="less" scoped>
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
</style>