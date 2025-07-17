<script setup>
defineOptions({ name: 'BaseTable' })

const props = defineProps({
  data: { type: Array, default: () => [] },
  height: { type: String | Number },
  maxHeight: { type: String | Number },
  stripe: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
})
const emit = defineEmits([])
</script>

<template>
  <div class="base-table">
    <el-table :data="data" :height="height" :max-height="maxHeight" :border="border" style="width: 100%">
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
        <!-- 自定义表头 插槽 -->
        <template v-if="column.headerSlot" #header="scope">
          <slot :name="column.headerSlot" :column="column" :scope="scope" :row="scope.row" :index="scope.$index">
            <div>{{ column.label }}</div>
          </slot>
        </template>
        <!-- 自定义列 插槽 -->
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
  </div>
</template>

<style lang="less" scoped>
.base-table {
  width: 100%;
}
</style>
