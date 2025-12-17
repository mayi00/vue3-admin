<script setup>
defineOptions({ name: 'BaseCopyright' })

const copyrightYear = new Date().getFullYear()
</script>

<template>
  <span class="copyright">Copyright © {{ copyrightYear }} All Rights Reserved.</span>
</template>

<style lang="less" scoped>
.copyright {
  color: #8c8c8c;
  font-size: 12px;
}
</style>
