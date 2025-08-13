<script setup>
// defineOptions({ name: '' })

const route = useRoute()

const url = computed(() => route.meta.link)
</script>

<template>
  <div class="g-container">
    <iframe :src="url" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
  </div>
</template>

<style lang="less" scoped></style>
