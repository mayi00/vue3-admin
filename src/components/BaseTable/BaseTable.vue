<script setup>
defineOptions({ name: 'BaseTable' })

const props = defineProps({
  // 【表格】表格loading
  loading: { type: Boolean, default: false },
  // 【表格】列配置，格式：{ prop: '字段名', label: '标题', width: '列宽' }
  columns: { type: Array, default: () => [] },

  // 【分页】
  defaultPageSize: { type: Number, default: 10 },
  defaultCurrentPage: { type: Number, default: 1 }
})
// 定义可触发的事件（供父组件监听）
const emit = defineEmits(['select', 'select-all', 'selection-change', 'update:currentPage', 'update:pageSize'])
// 暴露方法给父组件
defineExpose({ toggleAllSelection, getColumns })

const tableRef = ref(null)

// 【表格】 选中行处理函数
function select(select) {
  emit('select', select)
}
function selectAll(selects) {
  emit('select-all', selects)
}
function selectionChange(selections) {
  emit('selection-change', selections)
}
// 【表格】用于多选表格，切换全选和全不选
function toggleAllSelection(page) {
  tableRef.value.toggleAllSelection()
}
// 【表格】获取表列的 context
function getColumns() {
  return tableRef.value.columns
}

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
        :key="`${column.prop}-${i}`"
        :type="column.type"
        :index="column.index"
        :column-key="column.columnKey"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :align="column.align"
        :header-align="column.headerAlign"
      >
        <!-- 自定义表头插槽 -->
        <template v-if="column.headerSlot" #header="scope">
          <slot :name="column.headerSlot" :column="column" :scope="scope" :row="scope.row" :index="scope.$index">
            <div>{{ column.label }}</div>
          </slot>
        </template>
        <!-- 自定义列插槽 -->
        <template v-if="column.slot" #default="scope">
          <slot :name="column.slot" :column="column" :scope="scope" :row="scope.row" :index="scope.$index">
            <div>{{ scope.row[column.prop] }}</div>
          </slot>
        </template>
      </el-table-column>

      <!-- 插入至表格最后一行之后的内容 -->
      <template #append="scope">
        <slot name="append" :scope="scope"></slot>
      </template>
      <!-- 当数据为空时自定义的内容 -->
      <template #empty="scope">
        <slot name="empty" :scope="scope"></slot>
      </template>
    </el-table>

    <el-pagination
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      v-bind="$attrs"
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
