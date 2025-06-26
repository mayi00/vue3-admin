<script setup>
import { computed } from 'vue'

defineOptions({ name: 'TableB' })

const columns = ref([
  { label: 'ID', prop: 'id', disabled: true },
  { label: '内容', prop: 'content' },
  { label: '内容2', prop: 'content2' },
  { label: '内容3', prop: 'content3' },
  { label: '内容4内容4内容4内容4', prop: 'content4' },
])
const selectedProps = ref(columns.value.map(item => item.prop))

const selectedColumns = computed(() => {
  return columns.value.filter(item => selectedProps.value.includes(item.prop))
})

function handleSelected(selected) {
  selectedProps.value = selected
  console.log('Selected columns:', selected)
}
</script>

<template>
  <div class="g-container">
    <el-card style="min-height: 300px">
      <CustomColumns :columns="columns" :selected="selectedProps" cacheKey="tableB" @on-confirm="handleSelected" />
      <div style="height: 200px"></div>
      <p v-for="item in selectedColumns" :key="item.prop">{{ item.label }}</p>
    </el-card>
  </div>
</template>
