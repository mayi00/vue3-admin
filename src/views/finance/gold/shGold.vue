<script setup>
import dayjs from 'dayjs'
import api from '@/api'

defineOptions({ name: 'ShGold' })

const props = defineProps({})
const emit = defineEmits([])

const hyTableRef = ref(null)
const table = ref({
  loading: false,
  data: [],
  columns: [
    { prop: 'type', label: '代号', minWidth: 100 },
    { prop: 'typename', label: '名称', minWidth: 120 },
    { prop: 'price', label: '最新价(￥)', minWidth: 120, align: 'right', slot: 'price' },
    { prop: 'changepercent', label: '涨跌幅', minWidth: 100, align: 'right', slot: 'changepercent' },
    { prop: 'maxprice', label: '最高价(￥)', minWidth: 120, align: 'right', slot: 'maxprice' },
    { prop: 'minprice', label: '最低价(￥)', minWidth: 120, align: 'right', slot: 'minprice' },
    { prop: 'openingprice', label: '开盘价(￥)', minWidth: 120, align: 'right' },
    { prop: 'lastclosingprice', label: '昨收盘价(￥)', minWidth: 120, align: 'right' },
    { prop: 'tradeamount', label: '总成交量', minWidth: 100, align: 'right' },
    { prop: 'updatetime', label: '更新时间', minWidth: 180 }
  ]
})
const updatetime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

function getList() {
  table.value.loading = true
  api.jisuapi.gold
    .shgold()
    .then(res => {
      table.value.data = res
    })
    .finally(() => {
      table.value.loading = false
    })
}
function handleRefresh() {
  getList()
  updatetime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}
// 暴露方法给父组件
defineExpose({})
</script>

<template>
  <div class="">
    <div class="mb-[10px] flex items-center justify-between">
      <div>
        <span>上海黄金交易所价格</span>
        <el-button type="primary" class="ml-[10px]" @click="handleRefresh">刷新</el-button>
      </div>
      <span>更新时间：{{ updatetime }}</span>
    </div>
    <HyTable
      ref="hyTableRef"
      height="358"
      :loading="table.loading"
      :data="table.data"
      :columns="table.columns"
      :showPagination="false"
    >
      <template #price="{ row }">
        <span :class="`text-[${row.changepercent > 0 ? '#de3438' : '#107c10'}] font-bold`">{{ row.price }}</span>
      </template>
      <template #changepercent="{ row }">
        <span :class="`${row.changepercent > 0 ? 'text-[#de3438]' : 'text-[#107c10]'} font-bold`">
          {{ row.changepercent }}%
        </span>
      </template>
      <template #maxprice="{ row }">
        <span class="text-[#de3438]">{{ row.maxprice }}</span>
      </template>
      <template #minprice="{ row }">
        <span class="text-[#107c10]">{{ row.minprice }}</span>
      </template>
    </HyTable>
  </div>
</template>

<style lang="less" scoped></style>
