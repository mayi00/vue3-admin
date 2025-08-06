<script setup>
defineOptions({ name: 'Copyright' })

const copyrightYear = new Date().getFullYear()
</script>

<template>
  <span class="copyright">Copyright © 2022 - {{ copyrightYear }} All Rights Reserved.</span>
</template>

<style lang="less" scoped>
.copyright {
  color: #8c8c8c;
  font-size: 12px;
}
</style>
