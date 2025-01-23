<script setup>
defineOptions({ name: 'Home' })
</script>

<template>
  <div class="g-main home-container">
    <ElCard>
      <p v-for="i in 100" :key="i">Home{{ i }}</p>
    </ElCard>
  </div>
</template>

<style lang="less" scoped>
.home-container {
  padding: 16px;
}
</style>
