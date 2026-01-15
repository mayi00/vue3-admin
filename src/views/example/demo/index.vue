<script setup>
import { useElementHeight } from '@/hooks/useElement.js'

defineOptions({ name: 'Demo' })

const { elementHeight: cardHeight } = useElementHeight({ offset: 67 })

const visible = ref(false)

function handleImageConfirm(img) {
  console.log(img)
  visible.value = false
}
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" :style="{ height: cardHeight + 'px' }">
      <div class="w-[800px]">
        <el-button type="primary" @click="visible = true">上传图片</el-button>
        <HyImageCropper v-model:visible="visible" @confirm="handleImageConfirm" />
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
