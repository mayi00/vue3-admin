<script setup>
defineOptions({ name: 'ElementPlus' })

const url = ref('https://element-plus.org')
</script>

<template>
  <div class="iframe-view">
    <iframe :src="url" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
  </div>
</template>

<style lang="less" scoped>
.iframe-view {
  width: 100%;
  height: 100%;
}
</style>
