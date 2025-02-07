<script setup>
defineOptions({ name: 'ExtLinks' })

const route = useRoute()

console.log(route);

</script>

<template>
  <iframe
    :src="route.meta.link"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
</template>

<style lang="less" scoped></style>
