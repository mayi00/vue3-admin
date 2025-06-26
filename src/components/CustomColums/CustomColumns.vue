<template>
  <div class="custom-column-wrapper">
    <el-button ref="triggerBtnRef" @click.stop="toggleVisible">自定义列</el-button>

    <!-- <div v-show="visible" v-click-outside="toggleVisible" class="custom-column-panel"> -->
    <div v-show="visible" ref="panelRef" class="custom-column-panel">
      <el-checkbox-group v-model="selectedColumns">
        <el-checkbox
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :value="item.prop"
          :disabled="item.disabled"
        />
      </el-checkbox-group>
      <div class="btn-box">
        <el-button class="btn" type="primary" @click="handleConfirm">确认</el-button>
        <el-button class="btn" @click="handleCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useClickOutside } from '@/hooks/useClickOutside'

// 定义props
const props = defineProps({
  columns: { type: Array, required: true, default: () => [] },
  selected: { type: Array, default: () => [] },
  cacheKey: { type: String, default: '' },
})

// 定义事件
const emit = defineEmits(['on-confirm', 'on-cancel'])

// 响应式数据
const visible = ref(false)
const selectedColumns = ref([])
const panelRef = ref(null)

useClickOutside(panelRef, () => {
  if (visible.value) {
    visible.value = false
  }
})

// 从缓存或默认值恢复选中状态
function restoreFromCacheOrDefault() {
  if (props.cacheKey) {
    const cached = localStorage.getItem(props.cacheKey)
    if (cached) {
      selectedColumns.value = JSON.parse(cached)
    } else if (props.selected.length > 0) {
      selectedColumns.value = [...props.selected]
    } else {
      selectedColumns.value = props.columns.map(item => item.prop)
    }
  } else {
    selectedColumns.value = [...props.selected]
  }
  emit('on-confirm', [...selectedColumns.value])
}

// 保存到缓存
function saveToCache() {
  if (props.cacheKey) {
    localStorage.setItem(props.cacheKey, JSON.stringify(selectedColumns.value))
  }
}

// 切换面板可见性
function toggleVisible() {
  visible.value = !visible.value
}

// 处理确认操作
function handleConfirm() {
  emit('on-confirm', [...selectedColumns.value])
  saveToCache()
  visible.value = false
}

// 处理取消操作
function handleCancel() {
  selectedColumns.value = [...props.selected]
  visible.value = false
  emit('on-cancel')
}

// 生命周期钩子
onMounted(() => {
  restoreFromCacheOrDefault()
})

// 监听selected变化
watch(
  () => props.selected,
  newVal => {
    selectedColumns.value = [...newVal]
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="less">
.custom-column-wrapper {
  position: relative;
  display: inline-block;
}

.custom-column-panel {
  position: absolute;
  right: 0;
  top: 100%;
  left: 0;
  min-width: 160px;
  max-height: 300px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  z-index: 2000;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  font-size: 13px;

  .btn-box {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      width: 45%;
    }
  }

  .el-checkbox-group {
    width: 100%;
    .el-checkbox {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
