<script setup>
defineOptions({ name: 'IframeView' })

const url = ref('https//juejin.cn/')

</script>

<template>
  <div class="g-container">
    <iframe
      :src="url"
      frameborder="0"
      width="100%"
      height="100%"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="less" scoped></style>
