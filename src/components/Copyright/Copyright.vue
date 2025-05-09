<script setup>
defineOptions({ name: 'Copyright' })

// const copyrightYear = dayjs().format('YYYY')
const copyrightYear = new Date().getFullYear()
</script>

<template>
  <span class="copyright">Copyright © {{ copyrightYear }} MDT All Rights Reserved.</span>
</template>

<style lang="less" scoped>
.copyright {
  font-size: 12px;
  color: var(--gray-7);
}
</style>
