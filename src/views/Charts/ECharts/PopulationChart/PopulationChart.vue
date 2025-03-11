<script setup>
import PopulationTotal from './PopulationTotal.vue'
import UrbanAndRural from './UrbanAndRural.vue'
import UrbanAndRuralPropl from './UrbanAndRuralPropl.vue'
import Gender from './Gender.vue'
import GenderPropl from './GenderPropl.vue'
import * as echarts from 'echarts'

defineOptions({ name: 'PopulationChart' })

onMounted(() => {})
</script>

<template>
  <div class="g-container">
    <el-card class="chart-card"><PopulationTotal /></el-card>
    <el-card class="chart-card"><UrbanAndRural /></el-card>
    <el-card class="chart-card"><UrbanAndRuralPropl /></el-card>
    <el-card class="chart-card"><Gender /></el-card>
    <el-card class="chart-card"><GenderPropl /></el-card>
  </div>
</template>

<style lang="less" scoped>
.chart-card {
  margin-bottom: 20px;
}
</style>
