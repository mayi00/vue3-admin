<script setup>
defineOptions({ name: 'Example' })
</script>

<template>
  <div class="g-main example-container">
    <ElCard>
      <p v-for="i in 100" :key="i">Example{{ i }}</p>
    </ElCard>
  </div>
</template>

<style lang="less" scoped>
.example-container {
  padding: 16px;
}
</style>
