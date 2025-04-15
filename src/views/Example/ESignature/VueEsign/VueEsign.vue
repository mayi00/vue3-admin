<script setup>
import vueEsign from 'vue-esign'
import { downloadImageByBase64 } from '@/utils/download.js

defineOptions({ name: 'VueEsign' })

const esignRef = ref()
const lineColor = ref('#000000')
const bgColor = ref('')

function handleGenerate() {
  esignRef.value
    .generate()
    .then(res => {
      downloadImageByBase64(res, '您的签名')
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}
function handleReset() {
  esignRef.value.reset()
}
</script>

<template>
  <div class="g-container">
    <el-card>
      <div class="esign-btn">
        <el-button type="primary" @click="handleGenerate">保存签名</el-button>
        <el-button @click="handleReset">清空</el-button>
      </div>
      <div class="esign-container">
        <vue-esign
          ref="esignRef"
          :width="600"
          :height="300"
          :isCrop="false"
          :lineWidth="6"
          :lineColor="lineColor"
          v-model:bgColor="bgColor"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.esign-btn {
  margin-bottom: 10px;
}
.esign-container {
  display: inline-block;
  border: 1px solid var(--gray-9);
}
</style>
