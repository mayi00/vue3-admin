<script setup>
defineOptions({ name: 'HyTable' })

const props = defineProps({
  // 【表格】表格loading
  loading: { type: Boolean, default: false },
  // 【表格】列配置，格式：{ prop: '字段名', label: '标题', width: '列宽' }
  columns: { type: Array, default: () => [] },

  showPagination: { type: Boolean, default: true },
  // 【分页】
  defaultCurrentPage: { type: Number, default: 1 },
  defaultPageSize: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
  layout: { type: String, default: 'prev, pager, next, jumper, sizes, ->, total, slot' },
  pageSizes: { type: Object, default: () => [10, 20, 50, 100] }
})

// 定义可触发的事件（供父组件使用）
const emit = defineEmits(['select', 'select-all', 'selection-change', 'update:currentPage', 'update:pageSize'])
const tableRef = ref(null)

// 暴露方法给父组件
defineExpose({
  // 【表格】获取多选表格选中的行数据
  getSelectionRows: () => tableRef.value?.getSelectionRows(),
  // 【表格】用于多选表格，切换全选和全不选
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  // 【表格】获取表列的 context
  columns: () => tableRef.value?.columns
})

// 【表格】过滤 el-table-column 列属性
function filterColumnProps(column) {
  const { headerSlot, slot, ...rest } = column
  return rest
}
// 【表格】 选中行处理函数
function select(selection) {
  emit('select', selection)
}
function selectAll(selection) {
  emit('select-all', selection)
}
function selectionChange(newSelection) {
  emit('selection-change', newSelection)
}

// 【分页】相关逻辑
const currentPage = ref(props.defaultCurrentPage)
const pageSize = ref(props.defaultPageSize)

// 【分页】切换页码
function updateCurrentPage(page) {
  emit('update:currentPage', page)
}
// 【分页】分页大小变更
function updatePageSize() {
  emit('update:pageSize', pageSize.value)
}
</script>

<template>
  <div class="base-table">
    <el-table
      ref="tableRef"
      style="width: 100%"
      v-loading="loading"
      v-bind="$attrs"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-for="(column, i) in columns"
        :key="`${column.prop || column.type}-${i}`"
        v-bind="filterColumnProps(column)"
      >
        <!-- 自定义表头插槽 -->
        <template v-if="column.headerSlot" #header="scope">
          <slot :name="column.headerSlot" v-bind="{ column, scope, row: scope.row, index: scope.$index }"></slot>
        </template>
        <!-- 自定义列插槽 -->
        <template v-if="column.slot" #default="scope">
          <slot :name="column.slot" v-bind="{ column, scope, row: scope.row, index: scope.$index }" />
        </template>
      </el-table-column>

      <!-- 插入至表格最后一行之后的内容 -->
      <template #append="scope">
        <slot name="append" v-bind="{ scope }"></slot>
      </template>
      <!-- 当数据为空时自定义的内容 -->
      <template #empty="scope">
        <slot name="empty" v-bind="{ scope }"></slot>
      </template>
    </el-table>

    <el-pagination
      v-if="showPagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-bind="$attrs"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      style="margin-top: 10px"
      @update:current-page="updateCurrentPage"
      @update:page-size="updatePageSize"
    />
  </div>
</template>

<style lang="less" scoped>
.base-table {
  width: 100%;
}
</style>
